import React, { useState } from 'react';

const TradeDetailsModal = ({ isOpen, onClose, trade, onUpdateTradeHistory }) => {
  const [newEntry, setNewEntry] = useState({ buy: '', target: '', sl: '' });
  const [error, setError] = useState('');

  if (!isOpen || !trade) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.buy || !newEntry.target || !newEntry.sl) {
      setError('All fields are required');
      return;
    }
    const updatedEntry = {
      ...newEntry,
      buy: parseFloat(newEntry.buy),
      target: parseFloat(newEntry.target),
      sl: parseFloat(newEntry.sl),
      timestamp: new Date().toISOString()
    };
    onUpdateTradeHistory(trade.id, updatedEntry);
    setNewEntry({ buy: '', target: '', sl: '' });
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-black border border-neutral-800 p-6 rounded-lg max-w-2xl w-full m-4">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Trade Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Company</p>
              <p className="text-white">{trade.company.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Segment</p>
              <p className="text-white">{trade.segment.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Trade Type</p>
              <p className="text-white">{trade.trade_type.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-white">{trade.status}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Expiry Date</p>
            <p className="text-white">{new Date(trade.expiry_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Created At</p>
            <p className="text-white">{new Date(trade.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">Trade History</p>
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-500">Buy</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-500">Target</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-500">Stop Loss</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-orange-500">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {trade.history.map((entry, index) => (
                  <tr key={index} className="border-t border-neutral-800">
                    <td className="px-4 py-2 text-white">{entry.buy}</td>
                    <td className="px-4 py-2 text-white">{entry.target}</td>
                    <td className="px-4 py-2 text-white">{entry.sl}</td>
                    <td className="px-4 py-2 text-white">{new Date(entry.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Add New Trade History Entry</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="buy" className="block text-sm text-gray-400 mb-1">Buy</label>
                <input
                  type="number"
                  id="buy"
                  name="buy"
                  value={newEntry.buy}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-800 text-white border border-neutral-700 rounded p-2"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="target" className="block text-sm text-gray-400 mb-1">Target</label>
                <input
                  type="number"
                  id="target"
                  name="target"
                  value={newEntry.target}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-800 text-white border border-neutral-700 rounded p-2"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="sl" className="block text-sm text-gray-400 mb-1">Stop Loss</label>
                <input
                  type="number"
                  id="sl"
                  name="sl"
                  value={newEntry.sl}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-800 text-white border border-neutral-700 rounded p-2"
                  step="0.01"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Add Entry
            </button>
          </form>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeDetailsModal;

