import React from 'react';
import { Users, UserCheck, Building2, User } from 'lucide-react';

const UsersLoading = () => {
  const statItems = [
    { icon: Users },
    { icon: UserCheck },
    { icon: Building2 },
    { icon: User }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Loading */}
      <div className="flex gap-4 w-full">
        {statItems.map((stat, index) => (
          <div key={index} className="bg-black rounded-sm flex-1 p-4 border border-orange-500/20 text-gray-300 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <div className="rounded-full bg-orange-500/10 w-12 h-12 flex items-center justify-center">
              <stat.icon className="text-orange-500/50 h-6 w-6" />
            </div>
            <div className="pl-4 flex-1">
              <div className="h-4 bg-neutral-800/50 rounded w-24 mb-2 animate-pulse" />
              <div className="h-6 bg-neutral-800/50 rounded w-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Loading */}
      <div className="bg-black border border-neutral-800 rounded-sm p-3 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-10 bg-neutral-800/20 rounded-sm animate-pulse" />
          <div className="flex gap-2">
            <div className="w-40 h-10 bg-neutral-800/20 rounded-sm animate-pulse" />
            <div className="w-40 h-10 bg-neutral-800/20 rounded-sm animate-pulse" />
            <div className="w-24 h-10 bg-neutral-800/20 rounded-sm animate-pulse" />
          </div>
        </div>
      </div>

      {/* Table Loading */}
      <div className="bg-black border border-orange-500/20 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.3)] p-6">
        <div className="h-6 bg-neutral-800/20 w-24 mb-6 rounded animate-pulse" />
        <div className="space-y-4">
          <div className="h-12 bg-neutral-800/20 rounded animate-pulse" />
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-16 bg-neutral-800/10 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersLoading;