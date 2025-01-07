import React, { useState } from 'react';

export default function CreateNewEntryModal({ isOpen, onClose, onCreateNew, type }) {
  const [name, setName] = useState('');
  const [stockIndex, setStockIndex] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'company') {
      onCreateNew(name, stockIndex);
    } else {
      onCreateNew(name);
    }
    setName('');
    setStockIndex('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-xl border border-neutral-800 w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-orange-500 mb-6">
          Create New {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              placeholder={`Enter ${type} name`}
              required
            />
          </div>

          {type === 'company' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Stock Index
              </label>
              <input
                type="text"
                value={stockIndex}
                onChange={(e) => setStockIndex(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Enter stock index"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-700 text-gray-300 rounded-lg hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}