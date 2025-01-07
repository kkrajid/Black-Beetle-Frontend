import { TrendingUp, Clock, CheckCircle, TrendingDown, Search, MoreHorizontal } from 'lucide-react';
// TradesPage.js
import React, { useState, useEffect } from 'react';
// import TradesStats from './trades-stats';
// import TradesFilters from './trades-filters';
// import TradesTable from './trades-table';
// import CreateTradeModal from './create-trade-modal';
import { PlusIcon } from 'lucide-react';
import CreateTradeModal from '../components/Trades/create-trade-modal';
import { mockTrades } from '../lib/mock-data';
import TradesTable from '../components/Trades/trades-table';
import TradeDetailsModal from '../components/Trades/trade-details-modal';
const TradesPage = () => {
  const [trades, setTrades] = useState(mockTrades);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTradeDetailsModalOpen, setIsTradeDetailsModalOpen] = useState(false);

  const handleTradeCreated = (newTrade) => {
    setTrades((prevTrades) => [...prevTrades, newTrade]);
    console.log('New trade created:', newTrade);
  };
  const handleStatusUpdate = (tradeId, newStatus) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId ? { ...trade, status: newStatus } : trade
      )
    );
  };

  const handleViewDetails = (trade) => {
    setSelectedTrade(trade);
    setIsTradeDetailsModalOpen(true);
  };

  const handleUpdateTradeHistory = (tradeId, newEntry) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId
          ? { ...trade, history: [...trade.history, newEntry] }
          : trade
      )
    );
    setSelectedTrade(prevTrade => ({
      ...prevTrade,
      history: [...prevTrade.history, newEntry]
    }));
  };


  useEffect(() => {
    // const dummyTrades = [
    //   { id: 1, company: 'Apple Inc.', segment: 'Technology', tradeType: 'Buy', status: 'Active', createdAt: '2024-03-15' },
    //   { id: 2, company: 'Tesla Inc.', segment: 'Automotive', tradeType: 'Sell', status: 'Pending', createdAt: '2024-03-16' },
    // ];
    // setTrades(dummyTrades);
  }, []);

  return (
    <div className="w-full bg-black text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-orange-500">Trades</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-sm flex items-center"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create Trade
        </button>
      </div>
      <TradesStats trades={trades} />
      <TradesFilters onSearch={(query) => console.log(query)} />
      <TradesTable
        trades={trades} 
        onStatusUpdate={handleStatusUpdate}
        onViewDetails={handleViewDetails}
      />
      <CreateTradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTradeCreated={handleTradeCreated}
      />
       <TradeDetailsModal
        isOpen={isTradeDetailsModalOpen}
        onClose={() => setIsTradeDetailsModalOpen(false)}
        trade={selectedTrade}
        onUpdateTradeHistory={handleUpdateTradeHistory}
      />
    </div>
  );
};


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


export default TradesPage;