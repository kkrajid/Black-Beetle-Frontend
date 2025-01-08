import React from 'react';

const DashboardLoading = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen p-4 animate-fade-in">
      {/* Stats Grid Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-black border border-neutral-800 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse" />
              <div className="w-16 h-4 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="mt-4 w-24 h-3 bg-neutral-800 rounded animate-pulse" />
            <div className="mt-2 w-32 h-6 bg-neutral-800 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Charts Loading */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-black border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="w-32 h-4 bg-neutral-800 rounded animate-pulse mb-4" />
          <div className="w-full h-64 bg-neutral-800 rounded animate-pulse" />
        </div>
        <div className="w-full lg:w-80 bg-black border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="w-32 h-4 bg-neutral-800 rounded animate-pulse mb-4" />
          <div className="w-full h-64 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Table Loading */}
      <div className="bg-black border border-neutral-800 rounded-lg p-4 shadow-lg">
        <div className="w-32 h-4 bg-neutral-800 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-1/4 h-4 bg-neutral-800 rounded animate-pulse" />
              <div className="w-1/4 h-4 bg-neutral-800 rounded animate-pulse" />
              <div className="w-1/4 h-4 bg-neutral-800 rounded animate-pulse" />
              <div className="w-1/4 h-4 bg-neutral-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;