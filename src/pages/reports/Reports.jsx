import React from 'react';
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const Reports = () => {
  // Section 23 Datasets
  const statusData = [
    { label: 'To Do', count: 15, color: 'bg-gray-400', percentage: '32%' },
    { label: 'In Progress', count: 8, color: 'bg-blue-600', percentage: '17%' },
    { label: 'Review', count: 4, color: 'bg-amber-500', percentage: '9%' },
    { label: 'Done', count: 20, color: 'bg-emerald-600', percentage: '42%' },
  ];

  const priorityData = [
    { label: 'Highest', count: 3, color: 'bg-red-600', text: 'text-red-700' },
    { label: 'High', count: 7, color: 'bg-orange-500', text: 'text-orange-700' },
    { label: 'Medium', count: 18, color: 'bg-amber-400', text: 'text-amber-700' },
    { label: 'Low', count: 9, color: 'bg-emerald-500', text: 'text-emerald-700' },
  ];

  const teamWorkload = [
    { developer: 'John', assigned: 8, points: 26, avatar: 'JD', role: 'Fullstack' },
    { developer: 'Sara', assigned: 6, points: 19, avatar: 'S', role: 'Frontend' },
    { developer: 'Abebe', assigned: 5, points: 15, avatar: 'A', role: 'Backend' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Sprint Metrics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track velocity burndown, issue distribution, priority balance, and team workload.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Sprint:</span>
          <select className="p-1.5 border border-gray-300 rounded-lg text-xs font-bold bg-white text-gray-800 focus:outline-none">
            <option value="1">Sprint 1 (Active)</option>
            <option value="2">Sprint 2 (Planned)</option>
            <option value="0">Sprint 0 (Completed)</option>
          </select>
        </div>
      </div>

      {/* Section 23: Sprint Burndown Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">Sprint Burndown</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Remaining Work curve vs Ideal Guideline</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-gray-400 border border-dashed border-gray-400" />
              <span className="text-gray-500">Ideal Guideline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 bg-blue-600 rounded" />
              <span className="text-blue-600">Remaining Work</span>
            </div>
          </div>
        </div>

        {/* SVG Burndown Graph */}
        <div className="pt-4">
          <svg className="w-full h-56 overflow-visible" viewBox="0 0 600 200">
            {/* Grid Lines */}
            <line x1="50" y1="20" x2="570" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="60" x2="570" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="100" x2="570" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="140" x2="570" y2="140" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="180" x2="570" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Y-Axis Label Values */}
            <text x="35" y="24" fontSize="10" fill="#94a3b8" textAnchor="end">50 pts</text>
            <text x="35" y="64" fontSize="10" fill="#94a3b8" textAnchor="end">35 pts</text>
            <text x="35" y="104" fontSize="10" fill="#94a3b8" textAnchor="end">25 pts</text>
            <text x="35" y="144" fontSize="10" fill="#94a3b8" textAnchor="end">12 pts</text>
            <text x="35" y="184" fontSize="10" fill="#94a3b8" textAnchor="end">0</text>

            {/* Ideal Guideline: (50, 20) -> (570, 180) */}
            <line
              x1="50"
              y1="20"
              x2="570"
              y2="180"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Remaining Work curve matching prompt: │\ \ \ \____ */}
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="
                50,20
                120,50
                200,90
                300,125
                400,150
                500,152
                570,154
              "
            />

            {/* Point Markers */}
            <circle cx="50" cy="20" r="4" fill="#2563eb" />
            <circle cx="120" cy="50" r="4" fill="#2563eb" />
            <circle cx="200" cy="90" r="4" fill="#2563eb" />
            <circle cx="300" cy="125" r="4" fill="#2563eb" />
            <circle cx="400" cy="150" r="4" fill="#2563eb" />
            <circle cx="500" cy="152" r="4" fill="#2563eb" />
            <circle cx="570" cy="154" r="4" fill="#2563eb" />

            {/* X-Axis Day Labels */}
            <text x="50" y="196" fontSize="10" fill="#94a3b8" textAnchor="middle">Day 1</text>
            <text x="180" y="196" fontSize="10" fill="#94a3b8" textAnchor="middle">Day 4</text>
            <text x="310" y="196" fontSize="10" fill="#94a3b8" textAnchor="middle">Day 8</text>
            <text x="440" y="196" fontSize="10" fill="#94a3b8" textAnchor="middle">Day 11</text>
            <text x="570" y="196" fontSize="10" fill="#94a3b8" textAnchor="middle">Day 14</text>
          </svg>
        </div>
      </div>

      {/* Grid: Issues by Status & Issues by Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues by Status (Section 23: To Do 15, In Progress 8, Review 4, Done 20) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>Issues by Status</span>
            </h3>
            <span className="text-xs font-mono font-bold text-gray-400">47 Total</span>
          </div>

          <div className="space-y-3 pt-1">
            {statusData.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="font-mono font-bold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${(item.count / 47) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues by Priority (Section 23: Highest 3, High 7, Medium 18, Low 9) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Activity size={16} className="text-orange-600" />
              <span>Issues by Priority</span>
            </h3>
            <span className="text-xs font-mono font-bold text-gray-400">37 Issues</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {priorityData.map((item) => (
              <div
                key={item.label}
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className={`text-xs font-bold ${item.text}`}>{item.label}</div>
                  <div className="text-[11px] text-gray-400">Priority</div>
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Workload Table (Section 23: John 8, Sara 6, Abebe 5) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs space-y-0">
        <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-900 text-sm">Team Workload</h3>
          </div>
          <span className="text-xs text-gray-400">Active Sprint Distribution</span>
        </div>

        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-[11px]">
            <tr>
              <th className="px-6 py-3">Developer</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Story Points</th>
              <th className="px-6 py-3 text-right">Assigned Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamWorkload.map((member) => (
              <tr key={member.developer} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                      {member.avatar}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{member.developer}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-gray-500 font-medium">
                  {member.role}
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap font-mono font-bold text-gray-700">
                  {member.points} pts
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap text-right font-mono font-extrabold text-blue-700 text-base">
                  {member.assigned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
