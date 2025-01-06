import { TrendingUp, Clock, CheckCircle, TrendingDown, Search, MoreHorizontal } from 'lucide-react';
// TradesPage.js
import React, { useState, useEffect } from 'react';
// import TradesStats from './trades-stats';
// import TradesFilters from './trades-filters';
// import TradesTable from './trades-table';
// import CreateTradeModal from './create-trade-modal';
import { PlusIcon } from 'lucide-react';

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const dummyTrades = [
      { id: 1, company: 'Apple Inc.', segment: 'Technology', tradeType: 'Buy', status: 'Active', createdAt: '2024-03-15' },
      { id: 2, company: 'Tesla Inc.', segment: 'Automotive', tradeType: 'Sell', status: 'Pending', createdAt: '2024-03-16' },
    ];
    setTrades(dummyTrades);
  }, []);

  return (
    <div className="w-full bg-black text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-orange-500">Trades</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm flex items-center"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create Trade
        </button>
      </div>
      <TradesStats trades={trades} />
      <TradesFilters onSearch={(query) => console.log(query)} />
      <TradesTable trades={trades} />
      <CreateTradeModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};

// TradesTable.js
const TradesTable = ({ trades }) => {
  const getStatusColor = (status) => ({
    'Active': 'bg-green-500/20 text-green-500',
    'Completed': 'bg-blue-500/20 text-blue-500',
    'Pending': 'bg-yellow-500/20 text-yellow-500'
  }[status] || 'bg-gray-500/20 text-gray-500');

  return (
    <div className="bg-black border border-neutral-800 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Company</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Segment</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Trade Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Created At</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-orange-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-neutral-800">
                <td className="px-6 py-3 text-sm text-gray-300">{trade.company}</td>
                <td className="px-6 py-3 text-sm text-gray-300">{trade.segment}</td>
                <td className="px-6 py-3 text-sm text-gray-300">{trade.tradeType}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trade.status)}`}>
                    {trade.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-300">{trade.createdAt}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-orange-500 hover:text-orange-400 hover:bg-neutral-800 p-2 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// // TradesStats.js
// const TradesStats = ({ trades }) => {
//   const stats = [
//     { label: 'Total Trades', value: trades.length, icon: TrendingUp },
//     { label: 'Active Trades', value: trades.filter(t => t.status === 'Active').length, icon: Clock },
//     { label: 'Completed Trades', value: trades.filter(t => t.status === 'Completed').length, icon: CheckCircle },
//     { label: 'Pending Trades', value: trades.filter(t => t.status === 'Pending').length, icon: TrendingDown }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       {stats.map((stat, index) => (
//         <div key={index} className="bg-black border border-neutral-800 rounded-sm p-4 shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center">
//           <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
//             <stat.icon className="h-6 w-6 text-orange-500" />
//           </div>
//           <div className="ml-4">
//             <p className="text-sm text-gray-300/60">{stat.label}</p>
//             <p className="text-xl font-semibold text-orange-500">{stat.value}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // TradesFilters.js
// const TradesFilters = ({ onSearch }) => {
//   return (
//     <div className="flex flex-col md:flex-row gap-4 mb-6">
//       <div className="relative flex-grow">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search trades..."
//           onChange={(e) => onSearch(e.target.value)}
//           className="w-full pl-10 py-2 bg-black border border-neutral-800 rounded-sm text-gray-300 placeholder-gray-400"
//         />
//       </div>
//       <select className="bg-black border border-neutral-800 rounded-sm px-3 py-2 text-gray-300">
//         <option value="">All Statuses</option>
//         <option value="active">Active</option>
//         <option value="completed">Completed</option>
//         <option value="pending">Pending</option>
//       </select>
//       <select className="bg-black border border-neutral-800 rounded-sm px-3 py-2 text-gray-300">
//         <option value="">All Segments</option>
//         <option value="technology">Technology</option>
//         <option value="automotive">Automotive</option>
//       </select>
//     </div>
//   );
// };



// TradesStats component with imports
const TradesStats = ({ trades }) => {
  const stats = [
    { label: 'Total Trades', value: trades.length, icon: TrendingUp },
    { label: 'Active Trades', value: trades.filter(t => t.status === 'Active').length, icon: Clock },
    { label: 'Completed Trades', value: trades.filter(t => t.status === 'Completed').length, icon: CheckCircle },
    { label: 'Pending Trades', value: trades.filter(t => t.status === 'Pending').length, icon: TrendingDown }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black border border-neutral-800 rounded-sm p-4 shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center">
          <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
            <stat.icon className="h-6 w-6 text-orange-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-300/60">{stat.label}</p>
            <p className="text-xl font-semibold text-orange-500">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// TradesFilters component with imports
const TradesFilters = ({ onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search trades..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 py-2 bg-black border border-neutral-800 rounded-sm text-gray-300 placeholder-gray-400"
        />
      </div>
      <select className="bg-black border border-neutral-800 rounded-sm px-3 py-2 text-gray-300">
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <select className="bg-black border border-neutral-800 rounded-sm px-3 py-2 text-gray-300">
        <option value="">All Segments</option>
        <option value="technology">Technology</option>
        <option value="automotive">Automotive</option>
      </select>
    </div>
  );
};



// CreateTradeModal.js
const CreateTradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-50 bg-black border border-neutral-800 rounded-sm p-6 w-full max-w-md shadow-[0_0_10px_rgba(0,0,0,0.3)]">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">Create New Trade</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300/60 mb-1">Company</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-sm text-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300/60 mb-1">Segment</label>
            <select className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-sm text-gray-300">
              <option value="">Select segment</option>
              <option value="technology">Technology</option>
              <option value="automotive">Automotive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300/60 mb-1">Trade Type</label>
            <select className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-sm text-gray-300">
              <option value="">Select trade type</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-800 text-gray-300 rounded-sm hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600"
            >
              Create Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradesPage;