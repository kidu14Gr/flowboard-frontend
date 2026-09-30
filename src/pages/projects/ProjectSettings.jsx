import React, { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Layers,
  Tag,
  Boxes,
  Milestone,
  Bell,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Sliders,
  ExternalLink
} from 'lucide-react';

// Section 25 Components
const initialComponents = [
  { id: 'c1', name: 'Frontend', lead: 'John Doe', description: 'React UI, Tailwind, client state' },
  { id: 'c2', name: 'Backend', lead: 'Alex Johnson', description: 'Node.js, Express, microservices' },
  { id: 'c3', name: 'Authentication', lead: 'Malefiya', description: 'JWT tokens, OAuth, bcrypt security' },
  { id: 'c4', name: 'Database', lead: 'Alex Johnson', description: 'MongoDB schemas, indexing, pooling' },
  { id: 'c5', name: 'Mobile', lead: 'Sarah Smith', description: 'React Native iOS & Android client' },
  { id: 'c6', name: 'Security', lead: 'Malefiya', description: 'Role-based access control, helmet, sanitization' },
  { id: 'c7', name: 'API', lead: 'Alex Johnson', description: 'REST endpoints and documentation' },
];

// Section 26 Versions / Releases
const initialVersions = [
  {
    id: 'v1',
    name: 'Version 1.0',
    status: 'Released',
    releaseDate: '2026-09-30',
    features: ['Authentication', 'Project management', 'Board'],
    issuesCount: 18,
  },
  {
    id: 'v2',
    name: 'Version 1.1',
    status: 'In Progress',
    releaseDate: '2026-10-15',
    features: ['Reports', 'Notifications'],
    issuesCount: 9,
  },
  {
    id: 'v3',
    name: 'Version 2.0',
    status: 'Planned',
    releaseDate: '2026-11-30',
    features: ['Mobile application'],
    issuesCount: 14,
  },
];

const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState('components'); // 'general' | 'members' | 'components' | 'versions' | 'workflows' | 'labels' | 'notifications'

  // General state
  const [projectName, setProjectName] = useState('FlowBoard');
  const [projectKey, setProjectKey] = useState('FLW');
  const [projectLead, setProjectLead] = useState('Malefiya');
  const [projectDesc, setProjectDesc] = useState('Agile project tracking software.');

  // Components state (Section 25)
  const [components, setComponents] = useState(initialComponents);
  const [newCompName, setNewCompName] = useState('');
  const [newCompLead, setNewCompLead] = useState('Malefiya');

  // Versions state (Section 26)
  const [versions, setVersions] = useState(initialVersions);
  const [newVerName, setNewVerName] = useState('');
  const [newVerFeature, setNewVerFeature] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddComponent = (e) => {
    e.preventDefault();
    if (!newCompName.trim()) return;
    const newComp = {
      id: `c-${Date.now()}`,
      name: newCompName.trim(),
      lead: newCompLead,
      description: 'Project component module',
    };
    setComponents([...components, newComp]);
    setNewCompName('');
  };

  const handleDeleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddVersion = (e) => {
    e.preventDefault();
    if (!newVerName.trim()) return;
    const newVer = {
      id: `v-${Date.now()}`,
      name: newVerName.trim(),
      status: 'Planned',
      releaseDate: '2026-12-15',
      features: newVerFeature ? [newVerFeature.trim()] : ['Feature updates'],
      issuesCount: 0,
    };
    setVersions([...versions, newVer]);
    setNewVerName('');
    setNewVerFeature('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Project Settings: FlowBoard</h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure project details, components, versions, members, and custom workflows.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold animate-in fade-in">
            <CheckCircle2 size={14} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs Bar (Section 24) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 text-xs font-semibold">
        {[
          { id: 'components', label: 'Components (Section 25)', icon: Boxes },
          { id: 'versions', label: 'Versions & Releases (Section 26)', icon: Milestone },
          { id: 'general', label: 'General', icon: Sliders },
          { id: 'members', label: 'Members & Roles', icon: Users },
          { id: 'workflows', label: 'Statuses & Workflow', icon: Layers },
          { id: 'labels', label: 'Labels', icon: Tag },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Components (Section 25) */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Boxes size={18} className="text-blue-600" />
                  <span>Components</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Subdivide your project into functional modules (e.g. Frontend, Backend, Authentication, Database, Mobile, Security, API).
                </p>
              </div>
            </div>

            {/* Quick Add Component Form */}
            <form onSubmit={handleAddComponent} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex flex-wrap items-center gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Component name (e.g. API Gateway)..."
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md flex-1 text-xs text-gray-900 focus:outline-none focus:border-blue-600 min-w-[200px]"
                value={newCompName}
                onChange={(e) => setNewCompName(e.target.value)}
              />
              <select
                value={newCompLead}
                onChange={(e) => setNewCompLead(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-700 focus:outline-none"
              >
                <option value="Malefiya">Lead: Malefiya</option>
                <option value="John Doe">Lead: John Doe</option>
                <option value="Alex Johnson">Lead: Alex Johnson</option>
                <option value="Sarah Smith">Lead: Sarah Smith</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                + Add Component
              </button>
            </form>

            {/* Components Table */}
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Component</th>
                  <th className="px-4 py-2.5">Component Lead</th>
                  <th className="px-4 py-2.5">Description</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {components.map((comp) => (
                  <tr key={comp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                      {comp.name}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                      {comp.lead}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {comp.description}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteComponent(comp.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded cursor-pointer"
                        title="Delete component"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Versions / Releases (Section 26) */}
      {activeTab === 'versions' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Milestone size={18} className="text-blue-600" />
                <span>Versions & Releases</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Track releases and milestone deliverables (e.g. Version 1.0, Version 1.1, Version 2.0).
              </p>
            </div>

            {/* Quick Add Version Form */}
            <form onSubmit={handleAddVersion} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex flex-wrap items-center gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Version name (e.g. Version 2.1)..."
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-900 focus:outline-none focus:border-blue-600 min-w-[180px]"
                value={newVerName}
                onChange={(e) => setNewVerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Main features (e.g. AI Assistant, Analytics)..."
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md flex-1 text-xs text-gray-900 focus:outline-none focus:border-blue-600 min-w-[200px]"
                value={newVerFeature}
                onChange={(e) => setNewVerFeature(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              >
                + Add Release
              </button>
            </form>

            {/* Versions Cards List (Section 26) */}
            <div className="space-y-3">
              {versions.map((ver) => (
                <div
                  key={ver.id}
                  className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs space-y-2.5 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-sm text-gray-900">{ver.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          ver.status === 'Released'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ver.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {ver.status}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400">Target: {ver.releaseDate}</span>
                  </div>

                  <div className="text-xs text-gray-600 flex flex-wrap items-center gap-1.5">
                    <span className="font-medium text-gray-400">Included Features:</span>
                    {ver.features.map((f, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium text-[11px]"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: General Settings */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4 max-w-xl text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Project Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Project Key *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono font-bold uppercase text-blue-700 bg-gray-50 focus:outline-none"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value.toUpperCase())}
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Project Lead *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              value={projectLead}
              onChange={(e) => setProjectLead(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-600"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Tab 4: Workflows */}
      {activeTab === 'workflows' && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-gray-900 text-sm">Issue Statuses & Workflows</h3>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="font-bold text-gray-800">Standard Issue Workflow:</span>
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-blue-700">
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">BACKLOG</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">TO DO</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">IN PROGRESS</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">IN REVIEW</span>
              <span>→</span>
              <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 rounded">DONE</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
            <span className="font-bold text-gray-800">Bug Workflow:</span>
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-amber-800">
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">OPEN</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">IN PROGRESS</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">IN TESTING</span>
              <span>→</span>
              <span className="bg-white border border-gray-200 px-2.5 py-1 rounded">RESOLVED</span>
              <span>→</span>
              <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 rounded">CLOSED</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Members & Notifications */}
      {(activeTab === 'members' || activeTab === 'labels' || activeTab === 'notifications') && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs text-xs text-gray-600">
          Configuration settings for {activeTab} are active and synchronized with project workspace.
        </div>
      )}
    </div>
  );
};

export default ProjectSettings;
