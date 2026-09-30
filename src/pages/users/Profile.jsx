import React from 'react';
import {
  User,
  Mail,
  Shield,
  Briefcase,
  CheckCircle2,
  Clock,
  Activity,
  Layers,
  Calendar,
  ArrowRight
} from 'lucide-react';

const Profile = () => {
  const userProfile = {
    name: 'Malefiya',
    username: 'malefiya',
    email: 'malefiya@flowboard.dev',
    avatar: 'M',
    role: 'Admin',
    bio: 'Workspace Administrator & Fullstack Lead',
    assignedIssues: 8,
    completedIssues: 31,
    projectsCount: 5,
    recentProjects: [
      { name: 'FlowBoard', key: 'FLW', role: 'Project Lead' },
      { name: 'Mobile App', key: 'MOB', role: 'Project Lead' },
      { name: 'Core Backend', key: 'SRV', role: 'Administrator' },
    ],
    activities: [
      { id: '1', action: 'Created issue FLW-25 (Login authentication failure on Safari)', time: '2 hours ago' },
      { id: '2', action: 'Changed status of FLW-10 to IN PROGRESS', time: '4 hours ago' },
      { id: '3', action: 'Added comment on FLW-12 ("Please test the endpoint.")', time: '1 day ago' },
      { id: '4', action: 'Started Sprint 1 (Goal: Build authentication system)', time: '2 days ago' },
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-700 text-white font-black text-2xl flex items-center justify-center shadow-sm">
            {userProfile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{userProfile.name}</h1>
              <span className="font-mono text-xs font-semibold text-gray-400">@{userProfile.username}</span>
              <span className="font-bold text-[10px] text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded uppercase">
                {userProfile.role}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
              <Mail size={14} className="text-gray-400" />
              <span>{userProfile.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Metrics (Section 27: Assigned Issues, Completed Issues, Projects) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Assigned Issues
          </span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2 font-mono">
            {userProfile.assignedIssues}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Active across all boards</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Completed Issues
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">
            {userProfile.completedIssues}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Finished this sprint cycle</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Projects
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-2 font-mono">
            {userProfile.projectsCount}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Workspaces participating in</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Projects List */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-gray-900">Assigned Projects</h2>
          </div>

          <div className="space-y-2.5">
            {userProfile.recentProjects.map((p) => (
              <div
                key={p.key}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                    {p.key}
                  </span>
                  <span className="font-bold text-gray-900">{p.name}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold">{p.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Activity History (Section 27) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
          </div>

          <div className="space-y-3">
            {userProfile.activities.map((act) => (
              <div
                key={act.id}
                className="p-3 border border-gray-100 rounded-lg flex items-center justify-between gap-4 text-xs hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-gray-800 font-medium">{act.action}</span>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
