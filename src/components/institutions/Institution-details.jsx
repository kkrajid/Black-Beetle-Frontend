import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Building2, Globe, Mail, Phone, Users,
  Eye, ToggleLeft, ToggleRight, Check, AlertCircle
} from 'lucide-react';

// Mock Institution Data
const mockInstitution = {
  id: 1,
  name: "Tech University",
  code: "TECH-001",
  website: "https://techuniversity.edu",
  contact_email: "admin@techuniversity.edu",
  contact_phone: "+1 (555) 123-4567",
  active_users: 145,
  max_users: 200
};

// Mock Users Data
const mockUsers = [
  {
    id: 1,
    user: {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@techuniversity.edu",
      is_verified: true,
      is_active: true,
      is_blocked: false
    },
    role: "ADMIN"
  },
  {
    id: 2,
    user: {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@techuniversity.edu",
      is_verified: false,
      is_active: true,
      is_blocked: false
    },
    role: "MEMBER"
  },
  {
    id: 3,
    user: {
      first_name: "Robert",
      last_name: "Johnson",
      email: "robert.j@techuniversity.edu",
      is_verified: true,
      is_active: false,
      is_blocked: true
    },
    role: "MEMBER"
  },
  {
    id: 4,
    user: {
      first_name: "Sarah",
      last_name: "Williams",
      email: "sarah.w@techuniversity.edu",
      is_verified: true,
      is_active: true,
      is_blocked: false
    },
    role: "ADMIN"
  },
  {
    id: 5,
    user: {
      first_name: "Michael",
      last_name: "Brown",
      email: "m.brown@techuniversity.edu",
      is_verified: false,
      is_active: true,
      is_blocked: false
    },
    role: "MEMBER"
  }
];

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  </div>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const InstitutionDetails = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  // Filter users based on search term and role
  const filteredUsers = users.filter(userData => {
    const matchesSearch =
      userData.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || userData.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleStatusToggle = (user) => {
    setSelectedUser(user);
    setActionType('status');
    setShowConfirmDialog(true);
  };

  const handleVerificationToggle = (user) => {
    setSelectedUser(user);
    setActionType('verification');
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            user: {
              ...user.user,
              is_active: actionType === 'status' ? !user.user.is_active : user.user.is_active,
              is_verified: actionType === 'verification' ? !user.user.is_verified : user.user.is_verified
            }
          };
        }
        return user;
      })
    );
    setShowConfirmDialog(false);
  };

  const handleViewDetails = (userId) => {
    navigate(`/users/${userId}`);
  };

  const StatusBadge = ({ isActive }) => (
    <span className={`px-3 py-1 rounded-full text-xs ${isActive
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'
      }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );

  const VerificationBadge = ({ isVerified }) => (
    <span className={`px-3 py-1 rounded-full text-xs ${isVerified
        ? 'bg-blue-100 text-blue-800'
        : 'bg-yellow-100 text-yellow-800'
      }`}>
      {isVerified ? 'Verified' : 'Unverified'}
    </span>
  );

  return (
    <Modal onClose={onClose}>
      <div className="border-b p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{mockInstitution.name}</h2>
            <p className="text-gray-500 mt-1">Institution Details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building2 className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Institution Code</p>
                <p className="font-medium">{mockInstitution.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a href={mockInstitution.website} className="text-blue-500 hover:underline">
                  {mockInstitution.website}
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Contact Email</p>
                <p className="font-medium">{mockInstitution.contact_email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="font-medium">
                  {mockInstitution.active_users} / {mockInstitution.max_users}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold">Users Management</h3>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-64"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MEMBER">Member</option>
            </select>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No users found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((userData) => (
                  <tr key={userData.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        {userData.user.first_name} {userData.user.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userData.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                        {userData.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusToggle(userData)}
                        className="flex items-center gap-2"
                      >
                        {userData.user.is_active ? (
                          <ToggleRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-red-500" />
                        )}
                        <StatusBadge isActive={userData.user.is_active} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleVerificationToggle(userData)}
                        className="flex items-center gap-2"
                      >
                        {userData.user.is_verified ? (
                          <Check className="h-5 w-5 text-blue-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                        <VerificationBadge isVerified={userData.user.is_verified} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(userData.id)}
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message={`Are you sure you want to change the ${actionType} for user ${selectedUser?.user.first_name} ${selectedUser?.user.last_name}?`}
      />
    </Modal>
  );
};

export default InstitutionDetails;