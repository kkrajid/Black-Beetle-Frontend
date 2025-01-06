import React from 'react';
import { Search } from 'lucide-react';

const SubscriptionFilters = ({ onSearch, onStatusChange, onDateChange }) => {
  return (
    <div className="bg-black border border-neutral-800 rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-300/60" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            onChange={onSearch}
            className="w-full pl-10 pr-4 py-2 bg-neutral-800 border-neutral-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-300"
          />
        </div>
        <select 
          onChange={onStatusChange}
          className="px-3 md:px-4 py-2 bg-neutral-800 border-neutral-700 border rounded-lg text-sm text-gray-300"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
        <input
          type="date"
          onChange={onDateChange}
          className="px-3 md:px-4 py-2 bg-neutral-800 border-neutral-700 border rounded-lg text-sm text-gray-300"
        />
      </div>
    </div>
  );
};

export default SubscriptionFilters;