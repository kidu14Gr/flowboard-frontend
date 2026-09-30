import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  CheckSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Briefcase,
  Layers,
  ExternalLink
} from 'lucide-react';
import CreateIssueModal from '../../components/modal/CreateIssueModal';
import IssueDetailsModal from '../../components/issue/IssueDetailsModal';

const initialRecentProjects = [
  { id: '1', key: 'FLW', name: 'Project A (FlowBoard)', type: 'Software', lead: 'Malefiya', issues: 12 },
  { id: '2', key: 'MOB', name: 'Project B (Mobile Client)', type: 'Mobile', lead: 'Sarah Smith', issues: 8 },
  { id: '3', key: 'SRV', name: 'Project C (Core Backend)', type: 'Backend', lead: 'Alex Johnson', issues: 11 },
];

const initialMyTasks = [
  {
    key: 'FLW-1',
    title: 'Fix login',
    summary: 'Fix login',
    status: 'TO DO',
    statusLabel: 'To Do',
    priority: 'High',
    issueType: 'Bug',
    type: 'Bug',
    points: 3,
    description: 'Fix login button styling and token expiration validation.',
    assignee: 'John Doe',
  },
  {
    key: 'FLW-2',
    title: 'Build dashboard',
    summary: 'Build dashboard',
    status: 'IN PROGRESS',
    statusLabel: 'Progress',
    priority: 'Highest',
    issueType: 'Task',
    type: 'Task',
    points: 5,
    description: 'Construct Jira-style overview dashboard with recent projects and task tracking.',
    assignee: 'John Doe',
  },
  {
    key: 'FLW-3',
    title: 'Create API',
    summary: 'Create API',
    status: 'DONE',
    statusLabel: 'Done',
    priority: 'Medium',
    issueType: 'Story',
    type: 'Story',
    points: 8,
    description: 'Create REST API endpoints for user authentication, projects, and sprint planning.',
    assignee: 'John Doe',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialMyTasks);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Status mapping badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'TO DO':
      case 'OPEN':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'IN PROGRESS':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'IN REVIEW':
      case 'IN TESTING':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'DONE':
      case 'RESOLVED':
      case 'CLOSED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleUpdateStatus = (issueKey, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.key === issueKey ? { ...t, status: newStatus } : t))
    );
    if (selectedIssue && selectedIssue.key === issueKey) {
      setSelectedIssue((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleCreateIssue = (newIssueData) => {
    const newTask = {
      key: `FLW-${tasks.length + 4}`,
      title: newIssueData.title,
      summary: newIssueData.title,
      status: 'TO DO',
      statusLabel: 'To Do',
      priority: newIssueData.priority || 'Medium',
      issueType: newIssueData.issueType || 'Task',
      type: newIssueData.issueType || 'Task',
      points: newIssueData.storyPoints || 3,
      description: newIssueData.description || '',
      assignee: newIssueData.assignee || 'John Doe',
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">FlowBoard Overview & Workspace Metrics</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
          >
            <FolderKanban size={16} />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* 4 Main Summary Stat Cards per Specification */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* My Projects: 5 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            My Projects
          </div>
          <div className="text-3xl font-extrabold text-gray-900 mt-2">5</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <span>2 active workspaces</span>
          </div>
        </div>

        {/* Open Issues: 24 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Open Issues
          </div>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">24</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <span>Across all sprints</span>
          </div>
        </div>

        {/* Assigned to Me: 8 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Assigned to Me
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">8</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <span>Require your action</span>
          </div>
        </div>

        {/* Completed: 31 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Completed
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">31</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <span>This sprint cycle</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: My Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-600" />
              <span>My Tasks</span>
            </h2>
            <Link to="/issues" className="text-xs font-semibold text-blue-600 hover:underline">
              View all issues
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-xs divide-y divide-gray-100 overflow-hidden">
            {tasks.map((task) => (
              <div
                key={task.key}
                onClick={() => setSelectedIssue(task)}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-[11px] font-bold px-2 py-1 rounded border uppercase ${getStatusBadge(
                      task.status
                    )}`}
                  >
                    [{task.status === 'TO DO' ? 'To Do' : task.status === 'IN PROGRESS' ? 'Progress' : 'Done'}]
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-900 truncate">
                      {task.title}
                    </div>
                    <div className="text-xs font-mono text-gray-400 mt-0.5">
                      {task.key} • {task.priority} Priority
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
                  <span className="font-semibold text-gray-600">{task.points} pts</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Sprint Tracker Banner */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <Layers size={20} />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Active Sprint: Sprint 1</div>
                <div className="text-xs text-gray-500">8 days remaining • 42 / 50 Story Points complete</div>
              </div>
            </div>
            <Link
              to="/scrum"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
            >
              Open Board
            </Link>
          </div>
        </div>

        {/* Right Column: Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              <span>Recent Projects</span>
            </h2>
            <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {initialRecentProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate('/scrum')}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {p.key}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{p.name}</div>
                      <div className="text-[11px] text-gray-400">Lead: {p.lead}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-gray-400" />
                </div>
                <div className="text-xs text-gray-500 pt-1 flex items-center justify-between border-t border-gray-100">
                  <span>{p.type} Project</span>
                  <span className="font-semibold text-blue-600">{p.issues} issues</span>
                </div>
              </div>
            ))}
          </div>
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

export default Dashboard;
