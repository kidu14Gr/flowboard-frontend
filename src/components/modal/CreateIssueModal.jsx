import React, { useState } from 'react';
import {
  X,
  CheckSquare,
  Bookmark,
  Bug,
  Zap,
  GitCommit,
  AlertCircle,
  User,
  Calendar,
  Tag,
  Hash,
  Layers
} from 'lucide-react';

const CreateIssueModal = ({ isOpen, onClose, onCreate, projects, epics, defaultProjectId }) => {
  const [projectId, setProjectId] = useState(defaultProjectId || '1');
  const [issueType, setIssueType] = useState('Task');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('TO DO');
  const [assignee, setAssignee] = useState('John Doe');
  const [storyPoints, setStoryPoints] = useState(3);
  const [labels, setLabels] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [epicLink, setEpicLink] = useState('');
  const [parentIssueKey, setParentIssueKey] = useState('');

  if (!isOpen) return null;

  // Change default status when issue type changes
  const handleTypeChange = (type) => {
    setIssueType(type);
    if (type === 'Bug') {
      setStatus('OPEN');
    } else {
      setStatus('TO DO');
    }

    // Auto-template for Story
    if (type === 'Story' && !description) {
      setDescription('As a user,\nI want to ,\nso that I can .');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      projectId,
      issueType,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignee,
      storyPoints: Number(storyPoints) || 0,
      labels: labels ? labels.split(',').map((l) => l.trim()).filter(Boolean) : [],
      dueDate: dueDate || null,
      epic: epicLink || null,
      parentIssue: parentIssueKey || null,
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setLabels('');
    setDueDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Create Issue</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Project & Issue Type Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Project *</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="1">FlowBoard (FLW)</option>
                <option value="2">Mobile App (MOB)</option>
                <option value="3">Core Backend (SRV)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Issue Type *</label>
              <select
                value={issueType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Task">☑️ Task (e.g. Create login page)</option>
                <option value="Story">📖 User Story (As a user, I want...)</option>
                <option value="Bug">🐞 Bug (e.g. Login button does not work)</option>
                <option value="Epic">⚡ Epic (e.g. Authentication System)</option>
                <option value="Subtask">📌 Subtask (e.g. Create login form)</option>
              </select>
            </div>
          </div>

          {/* Subtask Parent Reference (If Subtask) */}
          {issueType === 'Subtask' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
              <label className="font-semibold text-amber-900">Parent Issue Key *</label>
              <input
                type="text"
                required
                placeholder="e.g. FLW-1 or FLW-12"
                className="w-full px-3 py-1.5 border border-amber-300 rounded-md text-sm font-mono uppercase bg-white focus:outline-none focus:border-amber-600"
                value={parentIssueKey}
                onChange={(e) => setParentIssueKey(e.target.value.toUpperCase())}
              />
            </div>
          )}

          {/* Epic Link Reference (If not Epic) */}
          {issueType !== 'Epic' && (
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Epic Link</label>
              <select
                value={epicLink}
                onChange={(e) => setEpicLink(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="">None / No Epic</option>
                <option value="Authentication System">⚡ Authentication System</option>
                <option value="Agile Board Redesign">⚡ Agile Board Redesign</option>
                <option value="Billing Integration">⚡ Billing Integration</option>
              </select>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Summary / Title *</label>
            <input
              type="text"
              required
              placeholder={
                issueType === 'Story'
                  ? 'e.g. User Authentication & Session Persistence'
                  : issueType === 'Bug'
                  ? 'e.g. Login button does not trigger submit event'
                  : issueType === 'Epic'
                  ? 'e.g. Authentication System'
                  : 'e.g. Create login form component'
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              rows={4}
              placeholder="Provide context, acceptance criteria, or error logs..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-sans"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority & Status Workflows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Priority per Spec: Highest, High, Medium, Low, Lowest */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Highest">🔴 Highest</option>
                <option value="High">🟠 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
                <option value="Lowest">🔵 Lowest</option>
              </select>
            </div>

            {/* Status Workflow */}
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Initial Status *</label>
              {issueType === 'Bug' ? (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 bg-amber-50 border border-amber-300 rounded-lg text-sm font-semibold text-amber-900 focus:outline-none focus:border-amber-600"
                >
                  <option value="OPEN">OPEN (Bug Workflow)</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="IN TESTING">IN TESTING</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              ) : (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 bg-blue-50 border border-blue-300 rounded-lg text-sm font-semibold text-blue-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="BACKLOG">BACKLOG (Planning)</option>
                  <option value="TO DO">TO DO (Active Sprint)</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="IN REVIEW">IN REVIEW</option>
                  <option value="DONE">DONE</option>
                </select>
              )}
            </div>
          </div>

          {/* Assignee & Story Points & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Malefiya">Malefiya (Project Lead)</option>
                <option value="John Doe">John Doe (Developer)</option>
                <option value="Sarah Smith">Sarah Smith (Developer)</option>
                <option value="Alex Johnson">Alex Johnson (Developer)</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Story Points</label>
              <input
                type="number"
                min={0}
                max={40}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                value={storyPoints}
                onChange={(e) => setStoryPoints(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Due Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Labels (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. auth, frontend, high-priority, ui"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssueModal;
