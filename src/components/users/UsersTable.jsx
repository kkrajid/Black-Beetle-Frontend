import React, { useState, useEffect } from 'react'
import { Eye, MoreHorizontal, Shield, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
export function UsersTable({
  users,
  isLoading,
  error,
  currentPage,
  totalPages,
  updatingUsers,
  onPageChange,
  onToggle
}) {
  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-green-500/20 text-green-500',
      INACTIVE: 'bg-red-500/20 text-red-500',
      VERIFIED: 'bg-blue-500/20 text-blue-500',
      UNVERIFIED: 'bg-yellow-500/20 text-yellow-500'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-500';
  };

  if (isLoading) return (
    <Card className="w-full bg-black border-orange-500/20 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <CardHeader>
        <CardTitle className="text-orange-500 font-medium">Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-16 bg-neutral-800/20 rounded-md animate-pulse" />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (error) return (
    <Card className="w-full bg-black border-orange-500/20 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="text-red-500 text-center">{error}</div>
      </CardContent>
    </Card>
  );

  if (!users?.length) return (
    <Card className="w-full bg-black border-orange-500/20 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <CardContent className="p-6">
        <div className="text-gray-300/60 text-center">No users found.</div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-full bg-black border-orange-500/20 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <CardHeader>
        <CardTitle className="text-orange-500 font-medium">Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full bg-black">
            <thead className="bg-neutral-800 [&_th]:border-b [&_th]:border-orange-500/20 last:[&_th]:border-r-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Institution</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Verification</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-orange-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const {
                  id = '',
                  first_name = '',
                  last_name = '',
                  email = '',
                  user_type = '',
                  phone_number = '',
                  is_verified = false,
                  is_active = false,
                  institution = null
                } = user;

                const fullName = `${first_name} ${last_name}`.trim();
                const institutionName = institution?.name || 'N/A';
                const isUpdating = updatingUsers[id] || false;

                return (
                  <tr key={id} className={`[&_tr]:border-b [&_tr]:border-orange-500/20 [&_td]:border-orange-500/20 last:[&_td]:border-r-0 ${isUpdating ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {user_type === "B2B_ADMIN" ? (
                          <Shield className="h-4 w-4 text-orange-500" />
                        ) : (
                          <User className="h-4 w-4 text-gray-300/60" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-orange-500">{fullName}</div>
                          <div className="text-sm text-gray-300/60">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user_type)}`}>
                        {user_type ? user_type.replace("_", " ") : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-300">{institutionName}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-300">{phone_number}</span>
                    </td>
                    <td className="px-6 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={is_verified}
                          disabled={isUpdating}
                          onChange={() => onToggle(id, 'toggle_verified')}
                        />
                        <div className={`w-11 h-6 bg-neutral-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-500 after:border-orange-500/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500/50 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}></div>
                      </label>
                    </td>
                    <td className="px-6 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={is_active}
                          disabled={isUpdating}
                          onChange={() => onToggle(id, 'toggle_active')}
                        />
                        <div className={`w-11 h-6 bg-neutral-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-500 after:border-orange-500/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500/50 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}></div>
                      </label>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-neutral-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-300/60">
            Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, users.length)} of {users.length} users
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="border-orange-500/20 text-orange-500 hover:bg-neutral-800"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-orange-500/20 text-orange-500 hover:bg-neutral-800"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}