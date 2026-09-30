import React, { useState } from 'react';
import {
  Shield,
  Users,
  FolderKanban,
  CheckSquare,
  Layers,
  CheckCircle2,
  Activity,
  UserCheck,
  KeyRound,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const stats = [
    { title: 'Total Users', value: 14, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Projects', value: 5, icon: FolderKanban, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Issues', value: 47, icon: CheckSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Active Sprints', value: 2, icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Completed Issues', value: 31, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const systemActivities = [
    { id: '1', user: 'Malefiya', role: 'Admin', action: 'Created project FlowBoard (FLW)', time: '1 hour ago' },
    { id: '2', user: 'Sarah Smith', role: 'Project Manager', action: 'Started Sprint 1 in FlowBoard', time: '3 hours ago' },
    { id: '3', user: 'Malefiya', role: 'Admin', action: 'Updated user role for John Doe to Developer', time: '5 hours ago' },
    { id: '4', user: 'Alex Johnson', role: 'Developer', action: 'Closed issue FLW-3 (Create REST API)', time: '1 day ago' },
    { id: '5', user: 'System', role: 'Audit', action: 'Automated daily backup completed successfully', time: '1 day ago' },
  ];

  const usersList = [
    { id: '1', name: 'Malefiya', email: 'malefiya@flowboard.dev', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Sarah Smith', email: 'sarah.smith@flowboard.dev', role: 'Project Manager', status: 'Active' },
    { id: '3', name: 'John Doe', email: 'john.doe@flowboard.dev', role: 'Developer', status: 'Active' },
    { id: '4', name: 'Alex Johnson', email: 'alex.j@flowboard.dev', role: 'Developer', status: 'Active' },
    { id: '5', name: 'Emily Davis', email: 'emily.d@flowboard.dev', role: 'Reporter', status: 'Active' },
  ];

  const rolePermissions = [
    { role: 'Admin', permissions: 'Manage users, projects, teams, delete projects, manage permissions, system activity' },
    { role: 'Project Manager', permissions: 'Create projects, manage members, epics, issues, sprints, backlog, reports' },
    { role: 'Developer', permissions: 'View assigned issues, update & move issues, comments, attachments, subtasks' },
    { role: 'Reporter', permissions: 'Create issues, view issues, comment, track progress' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Management Dashboard</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            System administration, user authorization, role permissions, and global audit logs.
          </p>
        </div>
      </div>

      {/* 5 Main Admin Metric Cards (Section 28) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:border-blue-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {s.title}
                </span>
                <div className={`p-1.5 rounded-lg ${s.bg}`}>
                  <Icon size={16} className={s.color} />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 font-mono">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview & Activity' },
          { id: 'users', label: 'User Management' },
          { id: 'roles', label: 'Role Permissions Matrix' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
              activeSection === sec.id
                ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Section 1: Overview & System Activity */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Activity size={16} className="text-red-600" />
                <span>System Activity Log (Section 28)</span>
              </h2>
              <span className="text-xs text-gray-400">Live Workspace Audit</span>
            </div>

            <div className="space-y-3">
              {systemActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-gray-900">{act.user}</span>
                    <span className="font-bold text-[10px] px-1.5 py-0.2 rounded bg-gray-200 text-gray-700">
                      {act.role}
                    </span>
                    <span className="text-gray-600">{act.action}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Shield size={16} className="text-red-600" />
              <span>Admin Privileges</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              As an Administrator, you have full privileges to manage users, delete projects, adjust roles, and audit security events.
            </p>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900 space-y-1">
              <span className="font-bold block">Security Status: Enforced</span>
              <span className="text-[11px] block">RBAC guards are active across all REST endpoints.</span>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: User Management */}
      {activeSection === 'users' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{u.name}</td>
                  <td className="px-5 py-3.5 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                        u.role === 'Admin'
                          ? 'bg-red-50 text-red-700'
                          : u.role === 'Project Manager'
                          ? 'bg-blue-50 text-blue-700'
                          : u.role === 'Developer'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section 3: Role Management */}
      {activeSection === 'roles' && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Role Permissions Matrix</h2>
          <div className="space-y-3 text-xs">
            {rolePermissions.map((rp) => (
              <div
                key={rp.role}
                className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span className="font-bold text-gray-900 w-36">{rp.role}:</span>
                <span className="text-gray-600 flex-1">{rp.permissions}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
