import React, { useState } from 'react';
import {
  Users as UsersIcon,
  UserPlus,
  Shield,
  Briefcase,
  Code2,
  FileText,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';

const initialUsersList = [
  {
    id: '1',
    name: 'Malefiya',
    username: 'malefiya',
    email: 'malefiya@flowboard.dev',
    role: 'Admin',
    avatar: 'M',
    bio: 'Workspace Administrator and System Owner',
    capabilities: [
      'Manage users',
      'Manage projects',
      'Manage teams',
      'Delete projects',
      'Manage permissions',
      'View system activity',
    ],
  },
  {
    id: '2',
    name: 'Sarah Smith',
    username: 'sarah.smith',
    email: 'sarah.smith@flowboard.dev',
    role: 'Project Manager',
    avatar: 'SS',
    bio: 'Lead Agile Project Manager',
    capabilities: [
      'Create projects',
      'Manage project members',
      'Create epics',
      'Create issues',
      'Create sprints',
      'Assign tasks',
      'Manage backlog',
      'View reports',
    ],
  },
  {
    id: '3',
    name: 'John Doe',
    username: 'john.doe',
    email: 'john.doe@flowboard.dev',
    role: 'Developer',
    avatar: 'JD',
    bio: 'Frontend & Full-stack Engineer',
    capabilities: [
      'View assigned issues',
      'Update issues',
      'Move issues',
      'Add comments',
      'Upload attachments',
      'Work on subtasks',
    ],
  },
  {
    id: '4',
    name: 'Alex Johnson',
    username: 'alex.j',
    email: 'alex.j@flowboard.dev',
    role: 'Developer',
    avatar: 'AJ',
    bio: 'Backend & Infrastructure Engineer',
    capabilities: [
      'View assigned issues',
      'Update issues',
      'Move issues',
      'Add comments',
      'Upload attachments',
      'Work on subtasks',
    ],
  },
  {
    id: '5',
    name: 'Emily Davis',
    username: 'emily.d',
    email: 'emily.d@flowboard.dev',
    role: 'Reporter',
    avatar: 'ED',
    bio: 'QA & Product Tester',
    capabilities: [
      'Create issues',
      'View issues',
      'Comment',
      'Track progress',
    ],
  },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsersList);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const filteredUsers = users.filter((u) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedRole !== 'ALL' && u.role !== selectedRole) return false;
    return true;
  });

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return (
          <span className="flex items-center gap-1 font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]">
            <Shield size={12} /> Admin
          </span>
        );
      case 'Project Manager':
        return (
          <span className="flex items-center gap-1 font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px]">
            <Briefcase size={12} /> Project Manager
          </span>
        );
      case 'Developer':
        return (
          <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
            <Code2 size={12} /> Developer
          </span>
        );
      case 'Reporter':
        return (
          <span className="flex items-center gap-1 font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px]">
            <FileText size={12} /> Reporter
          </span>
        );
      default:
        return <span className="font-semibold text-gray-700 text-xs">{role}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Roles & Permissions</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage workspace members and configure RBAC access levels across FlowBoard.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer">
          <UserPlus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Role Definitions Reference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Admin Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-red-700">
            <Shield size={16} />
            <span>Admin</span>
          </div>
          <p className="text-[11px] text-gray-500">Full system control</p>
          <ul className="space-y-1 text-[11px] text-gray-600 list-disc list-inside">
            <li>Manage users & permissions</li>
            <li>Manage & delete projects</li>
            <li>Manage teams</li>
            <li>View system activity</li>
          </ul>
        </div>

        {/* Project Manager Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-700">
            <Briefcase size={16} />
            <span>Project Manager</span>
          </div>
          <p className="text-[11px] text-gray-500">Project-level management</p>
          <ul className="space-y-1 text-[11px] text-gray-600 list-disc list-inside">
            <li>Create projects & epics</li>
            <li>Manage project members</li>
            <li>Create sprints & backlog</li>
            <li>Assign tasks & view reports</li>
          </ul>
        </div>

        {/* Developer Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-700">
            <Code2 size={16} />
            <span>Developer</span>
          </div>
          <p className="text-[11px] text-gray-500">Work on assigned issues</p>
          <ul className="space-y-1 text-[11px] text-gray-600 list-disc list-inside">
            <li>View assigned issues</li>
            <li>Update & move issues</li>
            <li>Add comments & attachments</li>
            <li>Work on subtasks</li>
          </ul>
        </div>

        {/* Reporter Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-purple-700">
            <FileText size={16} />
            <span>Reporter</span>
          </div>
          <p className="text-[11px] text-gray-500">Create & track issues</p>
          <ul className="space-y-1 text-[11px] text-gray-600 list-disc list-inside">
            <li>Create issues</li>
            <li>View issues</li>
            <li>Comment on issues</li>
            <li>Track progress</li>
          </ul>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex items-center min-w-[240px]">
          <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search member by name, username, email..."
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Filter by Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-1.5 border border-gray-300 rounded-lg bg-white text-gray-800 text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Developer">Developer</option>
            <option value="Reporter">Reporter</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Email Address</th>
                <th className="px-5 py-3">Assigned Role</th>
                <th className="px-5 py-3">Permissions & Capabilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-1.5 border border-gray-300 rounded-lg text-xs font-bold bg-white text-gray-800 focus:outline-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Reporter">Reporter</option>
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {user.capabilities.map((c, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
