import React, { useState, useMemo } from 'react';
import {
  Layers,
  Plus,
  Play,
  CheckCircle2,
  Calendar,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckSquare,
  Bug,
  Zap,
  Bookmark,
  Edit2,
  Target,
  ArrowDownUp,
  X,
  Filter
} from 'lucide-react';
import CreateIssueModal from '../../components/modal/CreateIssueModal';
import IssueDetailsModal from '../../components/issue/IssueDetailsModal';

// Epics per Section 15
const initialEpics = [
  {
    id: 'epic-1',
    name: 'Authentication',
    key: 'EPIC-1',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    stories: [
      { key: 'FLW-10', title: 'Login', status: 'DONE' },
      { key: 'FLW-11', title: 'Register', status: 'DONE' },
      { key: 'FLW-12', title: 'Forgot Password', status: 'DONE' },
      { key: 'FLW-13', title: 'Logout', status: 'TO DO' },
    ],
    progress: 75, // 3 of 4 done = 75%
  },
  {
    id: 'epic-2',
    name: 'Project Management',
    key: 'EPIC-2',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    stories: [
      { key: 'FLW-20', title: 'Create Project', status: 'DONE' },
      { key: 'FLW-21', title: 'Project Members', status: 'IN PROGRESS' },
      { key: 'FLW-22', title: 'Project Settings', status: 'TO DO' },
    ],
    progress: 33, // 1 of 3 done = 33%
  },
];

// Initial Sprints per Section 13 & 14
const initialSprints = [
  {
    id: 'sprint-1',
    name: 'Sprint 1',
    goal: 'Build authentication system',
    startDate: '2026-10-01',
    endDate: '2026-10-14',
    status: 'Active', // Planned, Active, Completed
    issues: [
      {
        key: 'FLW-10',
        title: 'Login',
        issueType: 'Story',
        status: 'DONE',
        points: 3,
        epic: 'Authentication',
        assignee: 'John Doe',
      },
      {
        key: 'FLW-11',
        title: 'Register',
        issueType: 'Story',
        status: 'DONE',
        points: 5,
        epic: 'Authentication',
        assignee: 'Sara',
      },
      {
        key: 'FLW-12',
        title: 'Forgot Password',
        issueType: 'Story',
        status: 'IN PROGRESS',
        points: 5,
        epic: 'Authentication',
        assignee: 'John Doe',
      },
    ],
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2',
    goal: 'Project management workspace configuration and member roles',
    startDate: '2026-10-15',
    endDate: '2026-10-28',
    status: 'Planned',
    issues: [
      {
        key: 'FLW-13',
        title: 'Logout & token invalidation',
        issueType: 'Story',
        status: 'TO DO',
        points: 2,
        epic: 'Authentication',
        assignee: 'Malefiya',
      },
      {
        key: 'FLW-20',
        title: 'Create Project',
        issueType: 'Story',
        status: 'TO DO',
        points: 5,
        epic: 'Project Management',
        assignee: 'Alex Johnson',
      },
    ],
  },
];

// Product Backlog issues per Section 12
const initialBacklog = [
  {
    key: 'FLW-21',
    title: 'Project Members',
    issueType: 'Story',
    status: 'BACKLOG',
    points: 5,
    epic: 'Project Management',
    assignee: 'Sara',
  },
  {
    key: 'FLW-22',
    title: 'Project Settings',
    issueType: 'Story',
    status: 'BACKLOG',
    points: 3,
    epic: 'Project Management',
    assignee: 'Malefiya',
  },
  {
    key: 'FLW-23',
    title: 'User role permission matrix tests',
    issueType: 'Task',
    status: 'BACKLOG',
    points: 3,
    epic: 'Authentication',
    assignee: 'Alex Johnson',
  },
  {
    key: 'FLW-24',
    title: 'OAuth Google login integration',
    issueType: 'Story',
    status: 'BACKLOG',
    points: 8,
    epic: 'Authentication',
    assignee: 'John Doe',
  },
];

const Backlog = () => {
  const [epics, setEpics] = useState(initialEpics);
  const [sprints, setSprints] = useState(initialSprints);
  const [backlog, setBacklog] = useState(initialBacklog);

  const [selectedEpicFilter, setSelectedEpicFilter] = useState('ALL');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sprint Creation Modal
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [newSprintName, setNewSprintName] = useState(`Sprint ${sprints.length + 1}`);
  const [newSprintGoal, setNewSprintGoal] = useState('');
  const [newSprintStart, setNewSprintStart] = useState('');
  const [newSprintEnd, setNewSprintEnd] = useState('');

  // Move issue: BACKLOG -> SPRINT 1 -> SPRINT 2 per Section 14
  const moveIssueToSprint = (issue, targetSprintId) => {
    // Remove from backlog if it came from backlog
    setBacklog((prev) => prev.filter((i) => i.key !== issue.key));

    // Remove from any existing sprint
    setSprints((prev) =>
      prev.map((s) => ({
        ...s,
        issues: s.issues.filter((i) => i.key !== issue.key),
      }))
    );

    // Add to target sprint
    setSprints((prev) =>
      prev.map((s) =>
        s.id === targetSprintId
          ? { ...s, issues: [...s.issues, { ...issue, status: 'TO DO' }] }
          : s
      )
    );
  };

  const moveIssueToBacklog = (issue) => {
    // Remove from all sprints
    setSprints((prev) =>
      prev.map((s) => ({
        ...s,
        issues: s.issues.filter((i) => i.key !== issue.key),
      }))
    );

    // Add to backlog
    setBacklog((prev) => [...prev, { ...issue, status: 'BACKLOG' }]);
  };

  // Start Sprint
  const handleStartSprint = (sprintId) => {
    setSprints((prev) =>
      prev.map((s) =>
        s.id === sprintId ? { ...s, status: 'Active' } : s
      )
    );
  };

  // Complete Sprint
  const handleCompleteSprint = (sprintId) => {
    const sprintToComplete = sprints.find((s) => s.id === sprintId);
    if (!sprintToComplete) return;

    // Incomplete issues move to backlog
    const incompleteIssues = sprintToComplete.issues.filter(
      (i) => i.status !== 'DONE' && i.status !== 'RESOLVED'
    );

    setBacklog((prev) => [
      ...prev,
      ...incompleteIssues.map((i) => ({ ...i, status: 'BACKLOG' })),
    ]);

    setSprints((prev) =>
      prev.map((s) =>
        s.id === sprintId
          ? {
              ...s,
              status: 'Completed',
              issues: s.issues.filter(
                (i) => i.status === 'DONE' || i.status === 'RESOLVED'
              ),
            }
          : s
      )
    );
  };

  // Inline Story Points edit
  const handleUpdatePoints = (issueKey, newPoints) => {
    const pts = Number(newPoints) || 0;
    setBacklog((prev) =>
      prev.map((i) => (i.key === issueKey ? { ...i, points: pts } : i))
    );
    setSprints((prev) =>
      prev.map((s) => ({
        ...s,
        issues: s.issues.map((i) => (i.key === issueKey ? { ...i, points: pts } : i)),
      }))
    );
  };

  // Create new sprint per Section 13
  const handleCreateSprint = (e) => {
    e.preventDefault();
    if (!newSprintName.trim()) return;

    const newSprint = {
      id: `sprint-${Date.now()}`,
      name: newSprintName.trim(),
      goal: newSprintGoal.trim() || 'Sprint goal',
      startDate: newSprintStart || '2026-10-15',
      endDate: newSprintEnd || '2026-10-28',
      status: 'Planned',
      issues: [],
    };

    setSprints([...sprints, newSprint]);
    setIsSprintModalOpen(false);
    setNewSprintGoal('');
  };

  const handleCreateIssue = (newIssueData) => {
    const nextKey = `FLW-${Math.floor(Math.random() * 800) + 30}`;
    const newIssue = {
      key: nextKey,
      title: newIssueData.title,
      description: newIssueData.description || '',
      issueType: newIssueData.issueType || 'Story',
      status: 'BACKLOG',
      points: Number(newIssueData.storyPoints) || 3,
      epic: newIssueData.epic || 'Authentication',
      assignee: newIssueData.assignee || 'Unassigned',
    };
    setBacklog([...backlog, newIssue]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Backlog & Sprint Planning</h1>
          <p className="text-xs text-gray-500 mt-1">
            Group issues by Epic, organize sprints, estimate story points, and plan deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSprintModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Sprint</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Epic Management (Section 15) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Zap size={16} className="text-purple-600" />
              <span>Epic Management</span>
            </h2>
            <button
              onClick={() => setSelectedEpicFilter('ALL')}
              className={`text-[11px] font-semibold cursor-pointer ${
                selectedEpicFilter === 'ALL' ? 'text-purple-600' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              All
            </button>
          </div>

          <div className="space-y-3">
            {epics.map((epic) => (
              <div
                key={epic.id}
                onClick={() =>
                  setSelectedEpicFilter(selectedEpicFilter === epic.name ? 'ALL' : epic.name)
                }
                className={`p-3.5 bg-white border rounded-xl shadow-xs cursor-pointer transition-all space-y-2.5 ${
                  selectedEpicFilter === epic.name
                    ? 'border-purple-400 ring-2 ring-purple-100 bg-purple-50/20'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900 flex items-center gap-1">
                    <span className="text-purple-600">⚡</span> {epic.name}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                    {epic.progress}%
                  </span>
                </div>

                {/* Section 15 Epic Visual Progress Bar: ████████████░░░░ 75% */}
                <div className="space-y-1">
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${epic.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>
                      {epic.stories.filter((s) => s.status === 'DONE').length} of {epic.stories.length} stories done
                    </span>
                    <span className="font-mono">{epic.progress}%</span>
                  </div>
                </div>

                {/* Stories Under this Epic (Section 15 list) */}
                <div className="space-y-1 pt-1 border-t border-gray-100 text-[11px]">
                  {epic.stories.map((st) => (
                    <div key={st.key} className="flex items-center justify-between text-gray-600">
                      <span className="truncate">
                        <strong className="text-gray-900 font-mono">{st.key}</strong> {st.title}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1 rounded uppercase ${
                          st.status === 'DONE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {st.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3 Columns: Sprints & Product Backlog (Sections 12, 13, 14) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active & Planned Sprints */}
          {sprints.map((sprint) => {
            const sprintPoints = sprint.issues.reduce((acc, curr) => acc + (curr.points || 0), 0);
            const isCompleted = sprint.status === 'Completed';

            return (
              <div
                key={sprint.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs space-y-0"
              >
                {/* Sprint Header (Section 13) */}
                <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm text-gray-900">{sprint.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        sprint.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : sprint.status === 'Planned'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sprint.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {sprint.startDate} – {sprint.endDate} • {sprint.issues.length} issues ({sprintPoints} pts)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {sprint.status === 'Planned' && (
                      <button
                        onClick={() => handleStartSprint(sprint.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <Play size={12} />
                        <span>Start Sprint</span>
                      </button>
                    )}

                    {sprint.status === 'Active' && (
                      <button
                        onClick={() => handleCompleteSprint(sprint.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>Complete Sprint</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sprint Goal banner */}
                <div className="px-4 py-2 bg-blue-50/40 border-b border-gray-100 flex items-center justify-between text-xs text-blue-900">
                  <div className="flex items-center gap-1.5">
                    <Target size={14} className="text-blue-600" />
                    <span><strong>Goal:</strong> {sprint.goal}</span>
                  </div>
                </div>

                {/* Sprint Issues List */}
                <div className="divide-y divide-gray-100">
                  {sprint.issues.map((issue) => (
                    <div
                      key={issue.key}
                      onClick={() => setSelectedIssue(issue)}
                      className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono font-bold text-blue-700">{issue.key}</span>
                        <span className="font-semibold text-gray-900 truncate">{issue.title}</span>
                        {issue.epic && (
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 shrink-0">
                            ⚡ {issue.epic}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Inline story points input per Section 14 */}
                        <input
                          type="number"
                          min={0}
                          max={40}
                          value={issue.points || 0}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleUpdatePoints(issue.key, e.target.value)}
                          className="w-12 px-1.5 py-0.5 border border-gray-300 rounded font-mono font-bold text-center text-gray-700 bg-gray-50 text-xs"
                          title="Set story points"
                        />

                        <span
                          className={`font-bold text-[10px] px-2 py-0.5 rounded uppercase ${
                            issue.status === 'DONE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {issue.status}
                        </span>

                        {/* Move between sprints or to Backlog (Section 14) */}
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => moveIssueToBacklog(issue)}
                            className="text-[11px] text-gray-400 hover:text-red-600 font-medium cursor-pointer"
                            title="Move back to backlog"
                          >
                            To Backlog
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {sprint.issues.length === 0 && (
                    <div className="p-6 text-center text-xs text-gray-400">
                      Sprint is empty. Plan by moving issues from the Product Backlog below.
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Product Backlog (Section 12) Grouped by Epic */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs space-y-0">
            <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-gray-900">Product Backlog</span>
                <span className="text-xs text-gray-400">
                  ({backlog.length} unassigned issues • {backlog.reduce((a, b) => a + (b.points || 0), 0)} pts)
                </span>
              </div>

              <div className="text-xs text-gray-400">
                Move issues: Backlog → Sprint 1 → Sprint 2
              </div>
            </div>

            {/* Backlog Items */}
            <div className="divide-y divide-gray-100">
              {backlog.map((issue) => (
                <div
                  key={issue.key}
                  onClick={() => setSelectedIssue(issue)}
                  className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer gap-4 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-400">□</span>
                    <span className="font-mono font-bold text-blue-700">{issue.key}</span>
                    <span className="font-semibold text-gray-900 truncate">{issue.title}</span>
                    {issue.epic && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 shrink-0">
                        ⚡ {issue.epic}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={issue.points || 0}
                      onChange={(e) => handleUpdatePoints(issue.key, e.target.value)}
                      className="w-12 px-1.5 py-0.5 border border-gray-300 rounded font-mono font-bold text-center text-gray-700 bg-gray-50 text-xs"
                      title="Set story points"
                    />

                    {/* Move to Sprints actions */}
                    {sprints.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => moveIssueToSprint(issue, s.id)}
                        className="px-2 py-1 bg-gray-100 hover:bg-blue-600 hover:text-white rounded text-[11px] font-semibold text-gray-700 transition-colors cursor-pointer"
                        title={`Move to ${s.name}`}
                      >
                        → {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {backlog.length === 0 && (
                <div className="p-8 text-center text-xs text-gray-400">
                  All backlog issues are assigned to sprints!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Sprint Modal (Section 13) */}
      {isSprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">Create Sprint</h3>
              <button
                onClick={() => setIsSprintModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSprint} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Sprint Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                  value={newSprintName}
                  onChange={(e) => setNewSprintName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                    value={newSprintStart}
                    onChange={(e) => setNewSprintStart(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                    value={newSprintEnd}
                    onChange={(e) => setNewSprintEnd(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Sprint Goal</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Build authentication system and login flow..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  value={newSprintGoal}
                  onChange={(e) => setNewSprintGoal(e.target.value)}
                />
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSprintModalOpen(false)}
                  className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Create Sprint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateIssue}
      />

      <IssueDetailsModal
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
};

export default Backlog;
