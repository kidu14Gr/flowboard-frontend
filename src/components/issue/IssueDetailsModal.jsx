import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Clock,
  User,
  Tag,
  AlertCircle,
  Paperclip,
  Send,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronDown,
  Trash2,
  Edit2,
  FileText,
  FileCode,
  FileImage,
  Plus,
  Check
} from 'lucide-react';

const defaultComments = [
  {
    id: 'c1',
    user: 'John',
    avatar: 'J',
    text: 'I finished the API.',
    time: '2 hours ago',
    isOwn: false,
  },
  {
    id: 'c2',
    user: 'Malefiya',
    avatar: 'M',
    text: 'Please test the endpoint.',
    time: '1 hour ago',
    isOwn: true,
  },
  {
    id: 'c3',
    user: 'Sara',
    avatar: 'S',
    text: 'The login validation needs fixing.',
    time: '30 minutes ago',
    isOwn: false,
  },
];

const defaultAttachments = [
  {
    id: 'att-1',
    name: 'login-error.png',
    type: 'image',
    size: '245 KB',
    date: 'Sep 29, 2026',
  },
  {
    id: 'att-2',
    name: 'API-documentation.pdf',
    type: 'pdf',
    size: '1.2 MB',
    date: 'Sep 28, 2026',
  },
];

const AVAILABLE_LABELS = [
  'frontend',
  'backend',
  'react',
  'node',
  'express',
  'database',
  'security',
  'bug',
  'urgent',
];

const IssueDetailsModal = ({
  issue,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onAddComment,
  onDeleteIssue,
}) => {
  const [comments, setComments] = useState(defaultComments);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [attachments, setAttachments] = useState(defaultAttachments);
  const [activeTab, setActiveTab] = useState('comments'); // 'comments' | 'attachments' | 'history' | 'subtasks'

  const [issueLabels, setIssueLabels] = useState(issue?.labels || ['frontend', 'react', 'urgent']);
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);

  if (!isOpen || !issue) return null;

  const isBug = issue.issueType === 'Bug' || issue.type === 'Bug';

  // Comment Handlers
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      user: 'Malefiya',
      avatar: 'M',
      text: commentText.trim(),
      time: 'Just now',
      isOwn: true,
    };
    setComments([...comments, newComment]);
    if (onAddComment) onAddComment(issue.key, commentText.trim());
    setCommentText('');
  };

  const handleStartEdit = (c) => {
    setEditingCommentId(c.id);
    setEditingText(c.text);
  };

  const handleSaveEdit = (commentId) => {
    if (!editingText.trim()) return;
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, text: editingText.trim() } : c))
    );
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  // Attachment Handlers
  const handleAddSampleAttachment = (type) => {
    const filename =
      type === 'image'
        ? `screenshot-${Date.now().toString().slice(-4)}.png`
        : type === 'log'
        ? `server-debug-${Date.now().toString().slice(-4)}.log`
        : `spec-doc-${Date.now().toString().slice(-4)}.pdf`;

    const newAtt = {
      id: `att-${Date.now()}`,
      name: filename,
      type,
      size: `${Math.floor(Math.random() * 800) + 100} KB`,
      date: 'Just now',
    };
    setAttachments([newAtt, ...attachments]);
  };

  const handleDeleteAttachment = (attId) => {
    setAttachments((prev) => prev.filter((a) => a.id !== attId));
  };

  // Label Handlers
  const toggleLabel = (lbl) => {
    if (issueLabels.includes(lbl)) {
      setIssueLabels(issueLabels.filter((l) => l !== lbl));
    } else {
      setIssueLabels([...issueLabels, lbl]);
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Epic':
        return <span className="font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-xs">⚡ Epic</span>;
      case 'Story':
        return <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">📖 Story</span>;
      case 'Bug':
        return <span className="font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs">🐞 Bug</span>;
      case 'Subtask':
        return <span className="font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded text-xs">📌 Subtask</span>;
      default:
        return <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-xs">☑️ Task</span>;
    }
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case 'Highest':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'High':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Lowest':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/50">
      <div className="bg-white w-full max-w-3xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-extrabold text-blue-700 bg-blue-100/70 border border-blue-200 px-2.5 py-1 rounded">
              {issue.key}
            </span>
            {getTypeBadge(issue.issueType || issue.type)}
            {issue.epic && (
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                ⚡ {issue.epic.title || issue.epic}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onDeleteIssue && (
              <button
                onClick={() => onDeleteIssue(issue.key)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Issue"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Title & Status Bar */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {issue.title || issue.summary}
            </h2>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Status Switcher per Workflow Specification */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Status:</span>
                {isBug ? (
                  <select
                    value={issue.status}
                    onChange={(e) => onUpdateStatus && onUpdateStatus(issue.key, e.target.value)}
                    className="px-3 py-1 bg-amber-50 border border-amber-300 rounded-lg font-bold text-xs text-amber-900 focus:outline-none"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="IN TESTING">IN TESTING</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                ) : (
                  <select
                    value={issue.status}
                    onChange={(e) => onUpdateStatus && onUpdateStatus(issue.key, e.target.value)}
                    className="px-3 py-1 bg-blue-50 border border-blue-300 rounded-lg font-bold text-xs text-blue-900 focus:outline-none"
                  >
                    <option value="BACKLOG">BACKLOG</option>
                    <option value="TO DO">TO DO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="IN REVIEW">IN REVIEW</option>
                    <option value="DONE">DONE</option>
                  </select>
                )}
              </div>

              {/* Priority Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Priority:</span>
                <select
                  value={issue.priority || 'Medium'}
                  onChange={(e) => onUpdatePriority && onUpdatePriority(issue.key, e.target.value)}
                  className={`px-2.5 py-1 border rounded-lg font-bold text-xs focus:outline-none ${getPriorityColor(
                    issue.priority || 'Medium'
                  )}`}
                >
                  <option value="Highest">🔴 Highest</option>
                  <option value="High">🟠 High</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="Lowest">🔵 Lowest</option>
                </select>
              </div>

              {/* Story Points */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg font-semibold">
                <span>Story Points:</span>
                <span className="text-gray-900 font-extrabold">{issue.points || issue.storyPoints || 0}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Description
            </h3>
            <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-line">
              {issue.description || 'No detailed description provided for this issue.'}
            </div>
          </div>

          {/* Issue Meta Details Grid (Sections 20, 25, 26) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-gray-50/50 border border-gray-200 rounded-xl text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Assignee</span>
              <span className="font-bold text-gray-900 mt-1 block truncate">
                {typeof issue.assignee === 'object' ? issue.assignee?.name : issue.assignee || 'Malefiya'}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Reporter</span>
              <span className="font-bold text-gray-900 mt-1 block truncate">
                {typeof issue.reporter === 'object' ? issue.reporter?.name : issue.reporter || 'Malefiya'}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Component</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded text-[11px] mt-1 inline-block">
                {issue.component || (issue.key === 'FLW-20' ? 'Backend' : 'Frontend')}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Fix Version</span>
              <span className="font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded text-[11px] mt-1 inline-block">
                {issue.fixVersion || 'Version 1.0'}
              </span>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Due Date</span>
              <span className="font-bold text-gray-900 mt-1 block">
                {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : 'Oct 14, 2026'}
              </span>
            </div>

            {/* Labels Manager (Section 18) */}
            <div className="relative">
              <span className="text-gray-400 block font-medium">Labels</span>
              <div className="flex flex-wrap items-center gap-1 mt-1">
                {issueLabels.map((lbl) => (
                  <span
                    key={lbl}
                    className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1"
                  >
                    #{lbl}
                    <button
                      onClick={() => toggleLabel(lbl)}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setIsLabelDropdownOpen(!isLabelDropdownOpen)}
                  className="p-0.5 text-gray-400 hover:text-blue-600 rounded cursor-pointer"
                  title="Add Label"
                >
                  <Plus size={12} />
                </button>
              </div>

              {isLabelDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-30 space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Select Labels:</div>
                  {AVAILABLE_LABELS.map((lbl) => (
                    <button
                      key={lbl}
                      onClick={() => toggleLabel(lbl)}
                      className={`w-full text-left px-2 py-1 rounded text-xs flex items-center justify-between cursor-pointer ${
                        issueLabels.includes(lbl)
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{lbl}</span>
                      {issueLabels.includes(lbl) && <Check size={12} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 16 & 17 Tabs: Comments, Attachments, Activity, Subtasks */}
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <div className="flex items-center gap-6 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab('comments')}
                className={`text-xs font-bold cursor-pointer pb-2 -mb-2.5 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'comments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <MessageSquare size={14} />
                <span>Comments ({comments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('attachments')}
                className={`text-xs font-bold cursor-pointer pb-2 -mb-2.5 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'attachments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Paperclip size={14} />
                <span>Attachments ({attachments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('subtasks')}
                className={`text-xs font-bold cursor-pointer pb-2 -mb-2.5 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'subtasks'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>Subtasks</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`text-xs font-bold cursor-pointer pb-2 -mb-2.5 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Clock size={14} />
                <span>History</span>
              </button>
            </div>

            {/* Comments Tab (Section 16) */}
            {activeTab === 'comments' && (
              <div className="space-y-4">
                {/* Add Comment Input */}
                <form onSubmit={handleAddComment} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Add a comment... (Markdown supported)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600 font-sans"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send size={12} />
                      <span>Save Comment</span>
                    </button>
                  </div>
                </form>

                {/* Comment List with Edit and Delete per Spec */}
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-[10px]">
                            {c.avatar}
                          </div>
                          <span className="font-bold text-gray-900">{c.user}</span>
                          <span className="text-[10px] text-gray-400">{c.time}</span>
                        </div>

                        {/* Action buttons: Edit, Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleStartEdit(c)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded cursor-pointer"
                            title="Edit comment"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                            title="Delete comment"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {editingCommentId === c.id ? (
                        <div className="space-y-2 pt-1">
                          <textarea
                            rows={2}
                            className="w-full p-2 border border-blue-300 rounded-md text-xs text-gray-900 bg-white focus:outline-none"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 rounded text-[11px] cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(c.id)}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-semibold cursor-pointer shadow-2xs"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800 leading-relaxed pl-8 whitespace-pre-line">
                          {c.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments Tab (Section 17) */}
            {activeTab === 'attachments' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 font-medium">
                    Upload screenshots, PDFs, logs or documents:
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddSampleAttachment('image')}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded font-semibold text-[11px] cursor-pointer"
                    >
                      + Add Screenshot
                    </button>
                    <button
                      onClick={() => handleAddSampleAttachment('pdf')}
                      className="px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded font-semibold text-[11px] cursor-pointer"
                    >
                      + Add PDF
                    </button>
                    <button
                      onClick={() => handleAddSampleAttachment('log')}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-semibold text-[11px] cursor-pointer"
                    >
                      + Add Log
                    </button>
                  </div>
                </div>

                {/* Attachments List per Section 17 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="p-3 bg-white border border-gray-200 rounded-xl shadow-xs flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                          {att.type === 'image' ? (
                            <FileImage size={16} className="text-blue-600" />
                          ) : att.type === 'pdf' ? (
                            <FileText size={16} className="text-red-600" />
                          ) : (
                            <FileCode size={16} className="text-amber-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            📎 {att.name}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {att.size} • {att.date}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteAttachment(att.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                        title="Delete attachment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subtasks Tab */}
            {activeTab === 'subtasks' && (
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between text-xs bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600">{issue.key}.1</span>
                    <span className="font-semibold text-gray-800">Implement UI form input validation</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    DONE
                  </span>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600">{issue.key}.2</span>
                    <span className="font-semibold text-gray-800">Wire authentication service handlers</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    IN PROGRESS
                  </span>
                </div>
              </div>
            )}

            {/* Section 22 Activity History */}
            {activeTab === 'history' && (
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <span><strong>Malefiya</strong> created issue</span>
                  <span className="text-[10px] text-gray-400">Sep 28, 10:00 AM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  <span><strong>John</strong> assigned issue</span>
                  <span className="text-[10px] text-gray-400">Sep 28, 11:15 AM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span><strong>Sara</strong> changed priority</span>
                  <span className="text-[10px] text-gray-400">Sep 29, 09:30 AM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span><strong>Malefiya</strong> changed status</span>
                  <span className="text-[10px] text-gray-400">Sep 29, 02:45 PM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span><strong>John</strong> added comment</span>
                  <span className="text-[10px] text-gray-400">Today, 08:20 AM</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsModal;
