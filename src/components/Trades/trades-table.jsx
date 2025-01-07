import React from 'react';

const TradesTable = ({ trades, onStatusUpdate, onViewDetails }) => {
  return (
    <div className="overflow-x-auto bg-black border border-neutral-800 rounded-sm">
      <table className="w-full">
        <thead className="bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Company</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Segment</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Created</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-t border-neutral-800">
              <td className="px-6 py-4 text-white">{trade.company.name}</td>
              <td className="px-6 py-4 text-white">{trade.segment.name}</td>
              <td className="px-6 py-4 text-white">{trade.trade_type.name}</td>
              <td className="px-6 py-4">
                <select
                  value={trade.status}
                  onChange={(e) => onStatusUpdate(trade.id, e.target.value)}
                  className="bg-transparent border border-neutral-800 rounded px-2 py-1 text-white"
                >
                  <option value="PENDING">Pending</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4 text-white">{new Date(trade.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => onViewDetails(trade)}
                  className="text-orange-500 hover:text-orange-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradesTable;

