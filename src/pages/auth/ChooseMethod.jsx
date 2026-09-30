import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Kanban,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sliders,
  Check,
  Zap,
  Repeat,
  Sparkles
} from 'lucide-react';

const ChooseMethod = () => {
  const navigate = useNavigate();
  const [rememberChoice, setRememberChoice] = useState(true);

  const handleSelectMethod = (method) => {
    if (rememberChoice) {
      localStorage.setItem('flowboard_preferred_method', method);
    }
    if (method === 'kanban') {
      navigate('/kanban');
    } else {
      navigate('/scrum');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 flex flex-col justify-between p-6">
      {/* Top Branding */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center shadow-xs">
            <Kanban size={20} />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Flow<span className="text-blue-600">Board</span>
          </span>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Skip to Overview Dashboard →
        </button>
      </div>

      {/* Main Choice Container */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/60 text-blue-700 rounded-full text-xs font-bold tracking-wide">
            <Sparkles size={13} />
            <span>Welcome to FlowBoard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Choose Project Management Method
          </h1>
          <p className="text-sm text-gray-500">
            Select the agile methodology that best matches your team's execution and delivery workflow.
          </p>
        </div>

        {/* 2 Method Cards Grid: Kanban vs Scrum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Option 1: Kanban */}
          <div
            onClick={() => handleSelectMethod('kanban')}
            className="group bg-white border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                  <Kanban size={26} />
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Continuous Flow
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Kanban
                </h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Focus on visualizing work in progress, minimizing bottlenecks, and optimizing continuous delivery.
                </p>
              </div>

              {/* Mini Visual Preview of Kanban Board */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-gray-500 text-center">
                  <div className="bg-white border border-gray-200 rounded py-1">TO DO (3)</div>
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded py-1">WIP (2)</div>
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded py-1">DONE (8)</div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-6 bg-white border border-gray-200 rounded flex items-center px-2 text-[10px] text-gray-700 font-semibold shadow-2xs">
                    FLW-10 Login UI Form
                  </div>
                  <div className="h-6 bg-white border border-gray-200 rounded flex items-center px-2 text-[10px] text-gray-700 font-semibold shadow-2xs">
                    FLW-7 REST API Endpoints
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Visual board with custom columns & WIP limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Continuous delivery without rigid timebox constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Best for support, DevOps, operations, & agile teams</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-gray-100 group-hover:bg-blue-600 text-gray-800 group-hover:text-white transition-colors cursor-pointer shadow-xs"
            >
              <span>Launch Kanban Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Option 2: Scrum */}
          <div
            onClick={() => handleSelectMethod('scrum')}
            className="group bg-white border-2 border-gray-200 hover:border-indigo-500 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                  <Layers size={26} />
                </div>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Sprints & Velocity
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Scrum
                </h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Plan timeboxed sprint cycles, estimate story points, manage product backlogs, and track burndown.
                </p>
              </div>

              {/* Mini Visual Preview of Scrum Board */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-600">
                  <span className="flex items-center gap-1 text-indigo-700 font-extrabold">
                    <Repeat size={12} /> Sprint 1 (Active)
                  </span>
                  <span className="text-gray-400 font-mono">18 / 42 pts</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-2/5" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="bg-white border border-gray-200 rounded p-1 font-semibold text-gray-700">
                    📖 Stories: 6
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-1 font-semibold text-gray-700">
                    📉 Burndown: On Track
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Timeboxed Sprints with start/end dates & Sprint Goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Product backlog grooming, story points, & epics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Interactive burndown velocity charts & workload metrics</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-gray-100 group-hover:bg-indigo-600 text-gray-800 group-hover:text-white transition-colors cursor-pointer shadow-xs"
            >
              <span>Launch Scrum Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Preferences checkbox */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <input
            type="checkbox"
            id="rememberChoice"
            checked={rememberChoice}
            onChange={(e) => setRememberChoice(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="rememberChoice" className="text-xs text-gray-600 cursor-pointer select-none">
            Remember this method as my default workspace dashboard
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-2">
        FlowBoard Agile Workspace • You can switch between Kanban and Scrum anytime in the sidebar.
      </div>
    </div>
  );
};

export default ChooseMethod;
