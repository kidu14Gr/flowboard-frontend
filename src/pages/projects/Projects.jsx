import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Users,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  MoreVertical,
  X,
  ArrowRight,
  Shield
} from 'lucide-react';

const initialProjects = [
  {
    id: '1',
    name: 'FlowBoard',
    key: 'FLW',
    description: 'Jira-style agile project tracking and sprint planning software.',
    projectType: 'Software',
    lead: 'Malefiya',
    members: ['Malefiya', 'John Doe', 'Sarah Smith', 'Alex Johnson'],
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    status: 'Active',
    totalIssues: 24,
    sampleKeys: ['FLW-1', 'FLW-2', 'FLW-3', 'FLW-4'],
  },
  {
    id: '2',
    name: 'Mobile App React Native',
    key: 'MOB',
    description: 'iOS and Android client for real-time issue updates and notifications.',
    projectType: 'Mobile',
    lead: 'Sarah Smith',
    members: ['Sarah Smith', 'John Doe', 'Emily Davis'],
    startDate: '2026-09-15',
    endDate: '2026-11-30',
    status: 'Active',
    totalIssues: 16,
    sampleKeys: ['MOB-1', 'MOB-2', 'MOB-3'],
  },
  {
    id: '3',
    name: 'Core Backend Services',
    key: 'SRV',
    description: 'REST API, WebSockets gateway, and database microservices.',
    projectType: 'Backend',
    lead: 'Alex Johnson',
    members: ['Alex Johnson', 'Malefiya'],
    startDate: '2026-08-01',
    endDate: '2026-10-31',
    status: 'Active',
    totalIssues: 19,
    sampleKeys: ['SRV-1', 'SRV-2', 'SRV-3'],
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for creating a project
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState('Software');
  const [lead, setLead] = useState('Malefiya');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Active');

  // Auto-generate key from project name
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!key || key.length <= 4) {
      const generated = val
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 4);
      setKey(generated || 'PRJ');
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!name.trim() || !key.trim()) return;

    const newProject = {
      id: String(Date.now()),
      name: name.trim(),
      key: key.toUpperCase().trim(),
      description: description.trim(),
      projectType,
      lead,
      members: [lead, 'John Doe'],
      startDate,
      endDate: endDate || null,
      status,
      totalIssues: 0,
      sampleKeys: [`${key.toUpperCase().trim()}-1`, `${key.toUpperCase().trim()}-2`],
    };

    setProjects([newProject, ...projects]);
    setIsModalOpen(false);
    // Reset form
    setName('');
    setKey('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, manage and configure workspace projects with unique Jira-style issue keys.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Top Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {project.key}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{project.name}</h3>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {project.projectType}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                    project.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {project.description || 'No description specified for this project.'}
              </p>

              {/* Jira Issue Keys Demo per Spec */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Issue Key Sequence:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.sampleKeys.map((k) => (
                    <span
                      key={k}
                      className="font-mono text-[11px] font-bold bg-white border border-gray-200 text-blue-700 px-2 py-0.5 rounded shadow-2xs"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Meta & Actions */}
            <div className="space-y-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield size={14} className="text-gray-400" />
                  Lead: <strong className="text-gray-900">{project.lead}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-gray-400" />
                  {project.members.length} members
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-gray-700">
                  {project.totalIssues} total issues
                </span>
                <button
                  onClick={() => navigate('/scrum')}
                  className="flex items-center gap-1 text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  <span>Open Scrum</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <FolderKanban className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Create Project</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProject} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Project Name & Key */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-gray-700">Project Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FlowBoard"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Project Key *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="e.g. FLW"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono font-bold uppercase text-blue-700 bg-blue-50/50 focus:outline-none focus:border-blue-600"
                    value={key}
                    onChange={(e) => setKey(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Description</label>
                <textarea
                  rows={3}
                  placeholder="Outline the goals and scope of this project..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Type & Lead */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Project Type *</label>
                  <select
                    className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                  >
                    <option value="Software">Software (Scrum / Kanban)</option>
                    <option value="Business">Business Project</option>
                    <option value="Mobile">Mobile Application</option>
                    <option value="Marketing">Marketing Campaign</option>
                    <option value="Service Desk">IT Service Desk</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Project Lead *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Malefiya"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={lead}
                    onChange={(e) => setLead(e.target.value)}
                  />
                </div>
              </div>

              {/* Dates & Status */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Status</label>
                  <select
                    className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
