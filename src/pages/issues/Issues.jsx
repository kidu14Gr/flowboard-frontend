import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  AlertCircle,
  Tag,
  User,
  Layers,
  ArrowUpDown,
  Zap,
  Bookmark,
  Bug,
  RotateCcw,
  Boxes
} from 'lucide-react';
import CreateIssueModal from '../../components/modal/CreateIssueModal';
import IssueDetailsModal from '../../components/issue/IssueDetailsModal';

const initialIssuesData = [
  {
    key: 'FLW-25',
    title: 'Login authentication failure on Safari',
    issueType: 'Bug',
    type: 'Bug',
    status: 'OPEN',
    priority: 'Highest',
    points: 5,
    assignee: 'Malefiya',
    reporter: 'John Doe',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Authentication',
    labels: ['frontend', 'bug', 'urgent'],
    dueDate: '2026-10-02',
    description: 'Investigate token race condition on Safari iOS and webkit storage.',
  },
  {
    key: 'FLW-20',
    title: 'Create Project API endpoints and validation',
    issueType: 'Story',
    type: 'Story',
    status: 'IN PROGRESS',
    priority: 'High',
    points: 8,
    assignee: 'Malefiya',
    reporter: 'Sara',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Backend', // Section 25
    labels: ['backend', 'database'],
    dueDate: '2026-10-04',
    description: 'Build POST /api/projects with auto-generated sequential keys (e.g. FLW-1).',
  },
  {
    key: 'FLW-10',
    title: 'Login page layout and form validation',
    issueType: 'Story',
    type: 'Story',
    status: 'TO DO',
    priority: 'High',
    points: 3,
    assignee: 'John Doe',
    reporter: 'Malefiya',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Frontend',
    labels: ['frontend', 'react'],
    dueDate: '2026-10-03',
    description: 'Build form inputs for email/username, password, and remember me.',
  },
  {
    key: 'FLW-11',
    title: 'Registration flow with email verification',
    issueType: 'Story',
    type: 'Story',
    status: 'TO DO',
    priority: 'Medium',
    points: 5,
    assignee: 'Sara',
    reporter: 'Malefiya',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Authentication',
    labels: ['frontend', 'react'],
    dueDate: '2026-10-05',
    description: 'Handle register payload and duplicate username rejection.',
  },
  {
    key: 'FLW-7',
    title: 'REST API authentication and RBAC guards',
    issueType: 'Task',
    type: 'Task',
    status: 'IN PROGRESS',
    priority: 'Highest',
    points: 8,
    assignee: 'Alex Johnson',
    reporter: 'Malefiya',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'API',
    labels: ['backend', 'security'],
    dueDate: '2026-10-01',
    description: 'Implement JWT protection and authorize middleware.',
  },
  {
    key: 'FLW-4',
    title: 'Agile dashboard with project metrics and workload',
    issueType: 'Story',
    type: 'Story',
    status: 'IN REVIEW',
    priority: 'High',
    points: 5,
    assignee: 'John Doe',
    reporter: 'Malefiya',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Frontend',
    labels: ['frontend', 'react'],
    dueDate: '2026-10-02',
    description: 'Display My Projects, Open Issues, Assigned to Me, and Completed.',
  },
  {
    key: 'FLW-1',
    title: 'Repository initialization and Tailwind CSS',
    issueType: 'Task',
    type: 'Task',
    status: 'DONE',
    priority: 'Medium',
    points: 2,
    assignee: 'Malefiya',
    reporter: 'Malefiya',
    project: 'FlowBoard',
    sprint: 'Sprint 1',
    component: 'Frontend',
    labels: ['frontend'],
    dueDate: '2026-09-28',
    description: 'Set up Vite, React, and Tailwind CSS v4.',
  },
];

const Issues = () => {
  const [issues, setIssues] = useState(initialIssuesData);
  const [search, setSearch] = useState('');

  // Section 20 Filter States:
  // Project, Assignee, Status, Priority, Type, Sprint, Label
  const [filterProject, setFilterProject] = useState('ALL');
  const [filterAssignee, setFilterAssignee] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterSprint, setFilterSprint] = useState('ALL');
  const [filterLabel, setFilterLabel] = useState('ALL');

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Reset all filters
  const resetFilters = () => {
    setFilterProject('ALL');
    setFilterAssignee('ALL');
    setFilterStatus('ALL');
    setFilterPriority('ALL');
    setFilterType('ALL');
    setFilterSprint('ALL');
    setFilterLabel('ALL');
    setSearch('');
  };

  // Filtered dataset matching Section 20 specifications
  const filteredIssues = useMemo(() => {
    return issues.filter((i) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          i.title.toLowerCase().includes(q) ||
          i.key.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (filterProject !== 'ALL' && i.project !== filterProject) return false;
      if (filterAssignee !== 'ALL' && i.assignee !== filterAssignee) return false;
      if (filterStatus !== 'ALL' && i.status !== filterStatus) return false;
      if (filterPriority !== 'ALL' && i.priority !== filterPriority) return false;
      if (filterType !== 'ALL' && i.issueType !== filterType) return false;
      if (filterSprint !== 'ALL' && i.sprint !== filterSprint) return false;
      if (filterLabel !== 'ALL' && (!i.labels || !i.labels.includes(filterLabel))) return false;
      return true;
    });
  }, [
    issues,
    search,
    filterProject,
    filterAssignee,
    filterStatus,
    filterPriority,
    filterType,
    filterSprint,
    filterLabel,
  ]);

  const handleCreateIssue = (newIssueData) => {
    const nextKey = `FLW-${issues.length + 26}`;
    const newIssue = {
      key: nextKey,
      title: newIssueData.title,
      summary: newIssueData.title,
      description: newIssueData.description || '',
      issueType: newIssueData.issueType || 'Task',
      type: newIssueData.issueType || 'Task',
      status: newIssueData.status || 'TO DO',
      priority: newIssueData.priority || 'Medium',
      points: Number(newIssueData.storyPoints) || 3,
      assignee: newIssueData.assignee || 'Malefiya',
      reporter: 'Malefiya',
      project: 'FlowBoard',
      sprint: 'Sprint 1',
      component: 'Frontend',
      labels: newIssueData.labels || [],
      dueDate: newIssueData.dueDate || null,
    };
    setIssues([newIssue, ...issues]);
  };

  const handleUpdateStatus = (issueKey, newStatus) => {
    setIssues((prev) =>
      prev.map((item) => (item.key === issueKey ? { ...item, status: newStatus } : item))
    );
    if (selectedIssue && selectedIssue.key === issueKey) {
      setSelectedIssue((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const renderTypeBadge = (type) => {
    switch (type) {
      case 'Epic':
        return <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">⚡ Epic</span>;
      case 'Story':
        return <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">📖 Story</span>;
      case 'Bug':
        return <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded text-[11px]">🐞 Bug</span>;
      case 'Subtask':
        return <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded text-[11px]">📌 Subtask</span>;
      default:
        return <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">☑️ Task</span>;
    }
  };

  const renderPriorityBadge = (p) => {
    switch (p) {
      case 'Highest':
        return <span className="font-bold text-red-600">🔴 Highest</span>;
      case 'High':
        return <span className="font-bold text-orange-600">🟠 High</span>;
      case 'Medium':
        return <span className="font-bold text-amber-600">🟡 Medium</span>;
      case 'Low':
        return <span className="font-bold text-emerald-600">🟢 Low</span>;
      case 'Lowest':
        return <span className="font-bold text-blue-600">🔵 Lowest</span>;
      default:
        return <span className="text-gray-500">Medium</span>;
    }
  };

  const isAnyFilterActive =
    filterProject !== 'ALL' ||
    filterAssignee !== 'ALL' ||
    filterStatus !== 'ALL' ||
    filterPriority !== 'ALL' ||
    filterType !== 'ALL' ||
    filterSprint !== 'ALL' ||
    filterLabel !== 'ALL' ||
    search.trim() !== '';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Issues & Work Items</h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse, search, and filter issues with Jira-style multi-dimensional criteria.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Issue</span>
        </button>
      </div>

      {/* Section 20: Comprehensive Jira-Style Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Global Search */}
          <div className="relative flex items-center min-w-[240px] flex-1">
            <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search issues (e.g. FLW-25, login, bug, dashboard)..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-red-600 hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* 7 Filter Dropdowns (Section 20: Project, Assignee, Status, Priority, Type, Sprint, Label) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-gray-100">
          {/* 1. Project */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Project</span>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Projects</option>
              <option value="FlowBoard">FlowBoard</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Core Backend">Core Backend</option>
            </select>
          </div>

          {/* 2. Assignee */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Assignee</span>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Assignees</option>
              <option value="Malefiya">Malefiya</option>
              <option value="John Doe">John Doe</option>
              <option value="Sara">Sara</option>
              <option value="Alex Johnson">Alex Johnson</option>
            </select>
          </div>

          {/* 3. Status */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="TO DO">TO DO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="IN REVIEW">IN REVIEW</option>
              <option value="DONE">DONE</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>

          {/* 4. Priority */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Priority</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="Highest">Highest</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Lowest">Lowest</option>
            </select>
          </div>

          {/* 5. Type */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Type</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Story">📖 Story</option>
              <option value="Task">☑️ Task</option>
              <option value="Bug">🐞 Bug</option>
              <option value="Epic">⚡ Epic</option>
            </select>
          </div>

          {/* 6. Sprint */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Sprint</span>
            <select
              value={filterSprint}
              onChange={(e) => setFilterSprint(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Sprints</option>
              <option value="Sprint 1">Sprint 1</option>
              <option value="Sprint 2">Sprint 2</option>
            </select>
          </div>

          {/* 7. Label */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Label</span>
            <select
              value={filterLabel}
              onChange={(e) => setFilterLabel(e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md bg-white text-gray-800 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Labels</option>
              <option value="frontend">#frontend</option>
              <option value="backend">#backend</option>
              <option value="react">#react</option>
              <option value="database">#database</option>
              <option value="security">#security</option>
              <option value="bug">#bug</option>
              <option value="urgent">#urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3">Key</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Summary</th>
                <th className="px-5 py-3">Component</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Assignee</th>
                <th className="px-5 py-3">Sprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIssues.map((issue) => (
                <tr
                  key={issue.key}
                  onClick={() => setSelectedIssue(issue)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {issue.key}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">{renderTypeBadge(issue.issueType)}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900 max-w-sm truncate">
                    {issue.title}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {issue.component || 'Frontend'}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">{renderPriorityBadge(issue.priority)}</td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap font-medium text-gray-800">
                    {issue.assignee}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-gray-500 font-medium">
                    {issue.sprint || 'Sprint 1'}
                  </td>
                </tr>
              ))}

              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-gray-400">
                    No issues match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
      />
    </div>
  );
};

export default Issues;
