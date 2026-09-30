import React, { useState, useMemo } from 'react';
import {
  Layers,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  User,
  Zap,
  Bookmark,
  Bug,
  CheckSquare,
  Play,
  Check,
  Tag,
  GripVertical
} from 'lucide-react';
import CreateIssueModal from '../../components/modal/CreateIssueModal';
import IssueDetailsModal from '../../components/issue/IssueDetailsModal';

// Sample issues matching Section 11 Specification
const initialScrumIssues = [
  {
    key: 'FLW-10',
    title: 'Login page',
    description: 'Implement login page interface with OAuth support and validation.',
    issueType: 'Story',
    status: 'TO DO',
    priority: 'High',
    points: 3,
    assignee: 'John Doe',
    reporter: 'Malefiya',
    epic: 'Authentication',
    labels: ['frontend', 'react', 'urgent'],
    dueDate: '2026-10-04',
  },
  {
    key: 'FLW-11',
    title: 'Register',
    description: 'Build user registration flow with email and username uniqueness checks.',
    issueType: 'Story',
    status: 'TO DO',
    priority: 'High',
    points: 5,
    assignee: 'Sara',
    reporter: 'Malefiya',
    epic: 'Authentication',
    labels: ['frontend', 'react'],
    dueDate: '2026-10-05',
  },
  {
    key: 'FLW-7',
    title: 'API work',
    description: 'Develop REST API endpoints, JWT token signing, and auth middleware.',
    issueType: 'Task',
    status: 'IN PROGRESS',
    priority: 'Highest',
    points: 8,
    assignee: 'Alex Johnson',
    reporter: 'Malefiya',
    epic: 'Authentication',
    labels: ['backend', 'node', 'express'],
    dueDate: '2026-10-02',
  },
  {
    key: 'FLW-8',
    title: 'Database',
    description: 'Configure MongoDB collections, indexing, and connection pooling.',
    issueType: 'Task',
    status: 'IN PROGRESS',
    priority: 'Medium',
    points: 5,
    assignee: 'Alex Johnson',
    reporter: 'Malefiya',
    epic: 'Project Management',
    labels: ['backend', 'database'],
    dueDate: '2026-10-03',
  },
  {
    key: 'FLW-4',
    title: 'Dashboard',
    description: 'Create Jira-style responsive dashboard with project stats and tasks.',
    issueType: 'Story',
    status: 'IN REVIEW',
    priority: 'Highest',
    points: 5,
    assignee: 'John Doe',
    reporter: 'Malefiya',
    epic: 'Project Management',
    labels: ['frontend', 'react'],
    dueDate: '2026-10-01',
  },
  {
    key: 'FLW-1',
    title: 'Setup',
    description: 'Repository initialization, Vite setup, Tailwind CSS, and scripts.',
    issueType: 'Task',
    status: 'DONE',
    priority: 'Medium',
    points: 2,
    assignee: 'Malefiya',
    reporter: 'Malefiya',
    epic: 'Authentication',
    labels: ['frontend', 'backend'],
    dueDate: '2026-09-28',
  },
  {
    key: 'FLW-2',
    title: 'Navbar',
    description: 'Top navigation bar with search shortcut, quick create, and user menu.',
    issueType: 'Task',
    status: 'DONE',
    priority: 'Medium',
    points: 3,
    assignee: 'Sara',
    reporter: 'Malefiya',
    epic: 'Project Management',
    labels: ['frontend', 'ui'],
    dueDate: '2026-09-29',
  },
];

const COLUMNS = [
  { id: 'TO DO', label: 'TO DO', color: 'border-t-gray-400' },
  { id: 'IN PROGRESS', label: 'IN PROGRESS', color: 'border-t-blue-500' },
  { id: 'IN REVIEW', label: 'IN REVIEW', color: 'border-t-amber-500' },
  { id: 'DONE', label: 'DONE', color: 'border-t-emerald-500' },
];

const FILTER_LABELS = [
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

const ScrumBoard = () => {
  const [issues, setIssues] = useState(initialScrumIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [assigneeFilter, setAssigneeFilter] = useState('ALL');
  const [selectedLabel, setSelectedLabel] = useState('ALL');
  const [onlyMyIssues, setOnlyMyIssues] = useState(false);

  // Drag and Drop States
  const [draggedIssue, setDraggedIssue] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  // Modals
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSprintComplete, setIsSprintComplete] = useState(false);

  // Drag & Drop Handlers
  const handleDragStart = (e, issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.setData('text/plain', issue.key);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = (colId) => {
    if (dragOverCol === colId) {
      setDragOverCol(null);
    }
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!draggedIssue) return;

    if (draggedIssue.status !== targetStatus) {
      setIssues((prev) =>
        prev.map((i) =>
          i.key === draggedIssue.key ? { ...i, status: targetStatus } : i
        )
      );
    }
    setDraggedIssue(null);
  };

  // Filter issues based on active search, type, assignee, and labels (Section 18)
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          issue.title.toLowerCase().includes(q) ||
          issue.key.toLowerCase().includes(q) ||
          (issue.description && issue.description.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Type Filter
      if (typeFilter !== 'ALL' && issue.issueType !== typeFilter) {
        return false;
      }

      // Assignee Filter
      if (assigneeFilter !== 'ALL' && issue.assignee !== assigneeFilter) {
        return false;
      }

      // Label Filter (Section 18)
      if (selectedLabel !== 'ALL') {
        if (!issue.labels || !issue.labels.includes(selectedLabel)) {
          return false;
        }
      }

      // Only My Issues
      if (onlyMyIssues && issue.assignee !== 'Malefiya') {
        return false;
      }

      return true;
    });
  }, [issues, searchQuery, typeFilter, assigneeFilter, selectedLabel, onlyMyIssues]);

  // Handle status update
  const handleUpdateStatus = (issueKey, newStatus) => {
    setIssues((prev) =>
      prev.map((item) => (item.key === issueKey ? { ...item, status: newStatus } : item))
    );
    if (selectedIssue && selectedIssue.key === issueKey) {
      setSelectedIssue((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleUpdatePriority = (issueKey, newPriority) => {
    setIssues((prev) =>
      prev.map((item) => (item.key === issueKey ? { ...item, priority: newPriority } : item))
    );
    if (selectedIssue && selectedIssue.key === issueKey) {
      setSelectedIssue((prev) => ({ ...prev, priority: newPriority }));
    }
  };

  const handleCreateIssue = (newIssueData) => {
    const nextKey = `FLW-${issues.length + 15}`;
    const newIssue = {
      key: nextKey,
      title: newIssueData.title,
      description: newIssueData.description || '',
      issueType: newIssueData.issueType || 'Task',
      status: newIssueData.status || 'TO DO',
      priority: newIssueData.priority || 'Medium',
      points: Number(newIssueData.storyPoints) || 3,
      assignee: newIssueData.assignee || 'Malefiya',
      reporter: 'Malefiya',
      epic: newIssueData.epic || '',
      labels: newIssueData.labels || [],
      dueDate: newIssueData.dueDate || null,
    };
    setIssues([newIssue, ...issues]);
  };

  const handleDeleteIssue = (issueKey) => {
    setIssues((prev) => prev.filter((i) => i.key !== issueKey));
    setSelectedIssue(null);
  };

  const totalPoints = useMemo(() => issues.reduce((acc, curr) => acc + (curr.points || 0), 0), [issues]);
  const completedPoints = useMemo(
    () =>
      issues
        .filter((i) => ['DONE', 'RESOLVED', 'CLOSED'].includes(i.status))
        .reduce((acc, curr) => acc + (curr.points || 0), 0),
    [issues]
  );

  const renderTypeIcon = (type) => {
    switch (type) {
      case 'Epic':
        return <span title="Epic" className="text-purple-600 font-bold text-xs">⚡</span>;
      case 'Story':
        return <span title="Story" className="text-emerald-600 font-bold text-xs">📖</span>;
      case 'Bug':
        return <span title="Bug" className="text-red-600 font-bold text-xs">🐞</span>;
      case 'Subtask':
        return <span title="Subtask" className="text-cyan-600 font-bold text-xs">📌</span>;
      default:
        return <span title="Task" className="text-blue-600 font-bold text-xs">☑️</span>;
    }
  };

  const renderPriorityTag = (priority) => {
    switch (priority) {
      case 'Highest':
        return <span className="text-[10px] font-bold text-red-600">🔴 Highest</span>;
      case 'High':
        return <span className="text-[10px] font-bold text-orange-600">🟠 High</span>;
      case 'Medium':
        return <span className="text-[10px] font-bold text-amber-600">🟡 Med</span>;
      case 'Low':
        return <span className="text-[10px] font-bold text-emerald-600">🟢 Low</span>;
      case 'Lowest':
        return <span className="text-[10px] font-bold text-blue-600">🔵 Lowest</span>;
      default:
        return <span className="text-[10px] font-bold text-gray-500">Medium</span>;
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Sprint Header Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-xs">
              FLW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  Sprint 1 • FlowBoard Scrum Board
                </h1>
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Goal: Build authentication system and core project boards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500 font-medium hidden sm:block text-right">
              <div>Oct 1, 2026 – Oct 14, 2026</div>
              <div className="text-blue-600 font-semibold">14 days duration</div>
            </div>

            <button
              onClick={() => setIsSprintComplete(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>Complete Sprint</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={16} />
              <span>Create Issue</span>
            </button>
          </div>
        </div>

        {/* Story Points Burndown Tally */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              Story Points: <strong className="text-gray-900">{completedPoints}</strong> / {totalPoints} pts
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">
              Total Board Issues: <strong className="text-gray-900">{filteredIssues.length}</strong>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-blue-600 font-semibold flex items-center gap-1">
              <GripVertical size={14} /> Drag cards between columns to change status
            </span>
          </div>

          <div className="w-full sm:w-64 bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${totalPoints > 0 ? (completedPoints / totalPoints) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Bar with Labels (Section 18) */}
      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex items-center min-w-[220px]">
            <Search size={14} className="absolute left-2.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search board (FLW-10, Login, etc.)..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Dropdowns */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyMyIssues(!onlyMyIssues)}
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
                onlyMyIssues
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Only my issues
            </button>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-1.5 border border-gray-300 rounded-lg bg-white text-gray-800 text-xs font-medium focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Story">📖 Stories</option>
              <option value="Task">☑️ Tasks</option>
              <option value="Bug">🐞 Bugs</option>
              <option value="Epic">⚡ Epics</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="p-1.5 border border-gray-300 rounded-lg bg-white text-gray-800 text-xs font-medium focus:outline-none"
            >
              <option value="ALL">All Assignees</option>
              <option value="Malefiya">Malefiya</option>
              <option value="John Doe">John Doe</option>
              <option value="Sara">Sara</option>
              <option value="Alex Johnson">Alex Johnson</option>
            </select>
          </div>
        </div>

        {/* Labels Chip Filter Bar (Section 18) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
          <span className="text-[11px] font-semibold text-gray-400 mr-1 flex items-center gap-1">
            <Tag size={12} /> Labels:
          </span>
          <button
            onClick={() => setSelectedLabel('ALL')}
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
              selectedLabel === 'ALL'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {FILTER_LABELS.map((lbl) => (
            <button
              key={lbl}
              onClick={() => setSelectedLabel(selectedLabel === lbl ? 'ALL' : lbl)}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                selectedLabel === lbl
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              #{lbl}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Scrum Board Columns with HTML5 Drag & Drop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start pb-6">
        {COLUMNS.map((col) => {
          const colIssues = filteredIssues.filter((i) => i.status === col.id);
          const colPoints = colIssues.reduce((acc, curr) => acc + (curr.points || 0), 0);
          const isOver = dragOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => handleDragLeave(col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`border border-gray-200 rounded-xl p-3.5 flex flex-col gap-3 min-h-[580px] transition-all border-t-4 ${
                col.color
              } ${
                isOver
                  ? 'bg-blue-50/80 ring-2 ring-blue-500 shadow-md scale-[1.01]'
                  : 'bg-gray-100/90'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-800 tracking-wider">
                    {col.label}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {colIssues.length}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-gray-400">
                  {colPoints} pts
                </span>
              </div>

              {/* Cards List with draggable cards */}
              <div className="space-y-3 flex-1">
                {colIssues.map((issue) => (
                  <div
                    key={issue.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, issue)}
                    onClick={() => setSelectedIssue(issue)}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-grab active:cursor-grabbing space-y-3 group"
                  >
                    {/* Top Row: Type, Key, Priority */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <GripVertical size={12} className="text-gray-300 group-hover:text-gray-500" />
                        {renderTypeIcon(issue.issueType)}
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {issue.key}
                        </span>
                      </div>
                      <div>{renderPriorityTag(issue.priority)}</div>
                    </div>

                    {/* Epic Tag */}
                    {issue.epic && (
                      <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded truncate max-w-full">
                        ⚡ {issue.epic}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
                      {issue.title}
                    </h3>

                    {/* Labels preview (Section 18) */}
                    {issue.labels && issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {issue.labels.slice(0, 2).map((lbl) => (
                          <span
                            key={lbl}
                            className="bg-gray-100 text-gray-600 text-[9px] font-medium px-1.5 py-0.2 rounded"
                          >
                            #{lbl}
                          </span>
                        ))}
                        {issue.labels.length > 2 && (
                          <span className="text-[9px] text-gray-400">+{issue.labels.length - 2}</span>
                        )}
                      </div>
                    )}

                    {/* Card Footer: Points, Assignee Avatar */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
                      <span className="font-mono font-bold text-[11px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                        {issue.points || 0} pts
                      </span>

                      <div
                        className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0"
                        title={issue.assignee}
                      >
                        {issue.assignee
                          ? issue.assignee
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                          : 'U'}
                      </div>
                    </div>
                  </div>
                ))}

                {colIssues.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
                    Drop issues here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
        onUpdateStatus={handleUpdateStatus}
        onUpdatePriority={handleUpdatePriority}
        onDeleteIssue={handleDeleteIssue}
      />

      {/* Sprint Complete Confirmation Banner */}
      {isSprintComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Complete Sprint 1?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              This sprint contains <strong>{completedPoints}</strong> completed story points.
              Any incomplete issues will automatically be returned to the Backlog for Sprint 2 planning.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsSprintComplete(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSprintComplete(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Confirm Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrumBoard;
