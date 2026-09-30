import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Play,
  CheckCircle2,
  Calendar,
  Clock,
  Target,
  ArrowRight,
  X
} from 'lucide-react';

const initialSprintsList = [
  {
    id: 'sprint-1',
    name: 'Sprint 1',
    goal: 'Build authentication system and login flow',
    startDate: '2026-10-01',
    endDate: '2026-10-14',
    status: 'Active',
    totalIssues: 5,
    completedIssues: 3,
    storyPoints: 21,
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2',
    goal: 'Project management workspace configuration and member roles',
    startDate: '2026-10-15',
    endDate: '2026-10-28',
    status: 'Planned',
    totalIssues: 4,
    completedIssues: 0,
    storyPoints: 17,
  },
  {
    id: 'sprint-0',
    name: 'Sprint 0 (Setup)',
    goal: 'Initial scaffolding, Tailwind CSS setup, and architecture design',
    startDate: '2026-09-15',
    endDate: '2026-09-30',
    status: 'Completed',
    totalIssues: 6,
    completedIssues: 6,
    storyPoints: 15,
  },
];

const Sprints = () => {
  const [sprints, setSprints] = useState(initialSprintsList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(`Sprint ${sprints.length + 1}`);
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateSprint = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSprint = {
      id: `sprint-${Date.now()}`,
      name: name.trim(),
      goal: goal.trim() || 'Sprint goal',
      startDate: startDate || '2026-11-01',
      endDate: endDate || '2026-11-14',
      status: 'Planned',
      totalIssues: 0,
      completedIssues: 0,
      storyPoints: 0,
    };

    setSprints([newSprint, ...sprints]);
    setIsModalOpen(false);
    setName(`Sprint ${sprints.length + 2}`);
    setGoal('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Planned':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sprints</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage sprint cycles, track team velocity, and view sprint goals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Sprint</span>
        </button>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sprints.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{s.name}</h3>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {s.startDate} – {s.endDate}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(
                    s.status
                  )}`}
                >
                  {s.status}
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Sprint Goal:
                </span>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  {s.goal || 'No goal set for this sprint.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>{s.storyPoints} Story Points</span>
              <span className="font-semibold text-gray-900">
                {s.completedIssues} / {s.totalIssues} issues
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">Create Sprint</h3>
              <button
                onClick={() => setIsModalOpen(false)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Sprint Goal</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Build authentication system and sprint planning..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default Sprints;
