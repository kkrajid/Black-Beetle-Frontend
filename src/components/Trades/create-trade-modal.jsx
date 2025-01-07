import React, { useState } from 'react';
import { mockCompanies, mockSegments, mockTradeTypes } from '../../lib/mock-data';
import CreateNewEntryModal from './create-new-entry-modal';

export default function CreateTradeModal({ isOpen, onClose, onTradeCreated }) {
  const [formData, setFormData] = useState({
    company: '',
    segment: '',
    trade_type: '',
    expiry_date: '',
    initial_buy_price: '',
    initial_target: '',
    initial_stop_loss: '',
    bull_scenario: '',
    bear_scenario: '',
  });

  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] = useState(false);
  const [isCreateSegmentModalOpen, setIsCreateSegmentModalOpen] = useState(false);
  const [isCreateTradeTypeModalOpen, setIsCreateTradeTypeModalOpen] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrade = {
      id: Date.now(),
      company: mockCompanies.find(c => c.id.toString() === formData.company),
      segment: mockSegments.find(s => s.id.toString() === formData.segment),
      trade_type: mockTradeTypes.find(t => t.id.toString() === formData.trade_type),
      expiry_date: formData.expiry_date,
      status: 'PENDING',
      created_at: new Date().toISOString(),
      history: [{
        id: Date.now(),
        buy: parseFloat(formData.initial_buy_price),
        target: parseFloat(formData.initial_target),
        sl: parseFloat(formData.initial_stop_loss),
        timestamp: new Date().toISOString()
      }]
    };
    onTradeCreated(newTrade);
    onClose();
  };

  const handleCreateNewCompany = (name, stockIndex) => {
    const newCompany = { id: mockCompanies.length + 1, name, stock_index: stockIndex };
    mockCompanies.push(newCompany);
    handleInputChange('company', newCompany.id.toString());
  };

  const handleCreateNewSegment = (name) => {
    const newSegment = { id: mockSegments.length + 1, name };
    mockSegments.push(newSegment);
    handleInputChange('segment', newSegment.id.toString());
  };

  const handleCreateNewTradeType = (name) => {
    const newTradeType = { id: mockTradeTypes.length + 1, name };
    mockTradeTypes.push(newTradeType);
    handleInputChange('trade_type', newTradeType.id.toString());
  };

  if (!isOpen) return null;

  const inputClassName = "w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50";
  const selectClassName = "flex-1 rounded-lg bg-neutral-900 border border-neutral-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50";
  const addButtonClassName = "ml-2 inline-flex items-center px-3 py-2 border border-neutral-700 text-sm font-medium rounded-lg text-gray-300 bg-neutral-900 hover:bg-neutral-800";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-40">
      <div className="bg-black rounded-xl border border-neutral-800 p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-orange-500 mb-6">Create New Trade</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Company</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={selectClassName}
                  required
                >
                  <option value="">Select Company</option>
                  {mockCompanies.map(company => (
                    <option key={company.id} value={company.id.toString()}>{company.name} ({company.stock_index})</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCreateCompanyModalOpen(true)}
                  className={addButtonClassName}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="segment" className="block text-sm font-medium text-gray-400 mb-1">Segment</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="segment"
                  value={formData.segment}
                  onChange={(e) => handleInputChange('segment', e.target.value)}
                  className={selectClassName}
                  required
                >
                  <option value="">Select Segment</option>
                  {mockSegments.map(segment => (
                    <option key={segment.id} value={segment.id.toString()}>{segment.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCreateSegmentModalOpen(true)}
                  className={addButtonClassName}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="trade_type" className="block text-sm font-medium text-gray-400 mb-1">Trade Type</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="trade_type"
                  value={formData.trade_type}
                  onChange={(e) => handleInputChange('trade_type', e.target.value)}
                  className={selectClassName}
                  required
                >
                  <option value="">Select Trade Type</option>
                  {mockTradeTypes.map(type => (
                    <option key={type.id} value={type.id.toString()}>{type.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCreateTradeTypeModalOpen(true)}
                  className={addButtonClassName}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
              <input
                type="date"
                id="expiry_date"
                value={formData.expiry_date}
                onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="initial_buy_price" className="block text-sm font-medium text-gray-400 mb-1">Buy Price</label>
              <input
                type="number"
                id="initial_buy_price"
                value={formData.initial_buy_price}
                onChange={(e) => handleInputChange('initial_buy_price', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label htmlFor="initial_target" className="block text-sm font-medium text-gray-400 mb-1">Target Price</label>
              <input
                type="number"
                id="initial_target"
                value={formData.initial_target}
                onChange={(e) => handleInputChange('initial_target', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label htmlFor="initial_stop_loss" className="block text-sm font-medium text-gray-400 mb-1">Stop Loss</label>
              <input
                type="number"
                id="initial_stop_loss"
                value={formData.initial_stop_loss}
                onChange={(e) => handleInputChange('initial_stop_loss', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="bull_scenario" className="block text-sm font-medium text-gray-400 mb-1">Bull Scenario</label>
            <textarea
              id="bull_scenario"
              value={formData.bull_scenario}
              onChange={(e) => handleInputChange('bull_scenario', e.target.value)}
              rows={3}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="bear_scenario" className="block text-sm font-medium text-gray-400 mb-1">Bear Scenario</label>
            <textarea
              id="bear_scenario"
              value={formData.bear_scenario}
              onChange={(e) => handleInputChange('bear_scenario', e.target.value)}
              rows={3}
              className={inputClassName}
            />
          </div>
          <div className="flex justify-end gap-3">
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
              Create Trade
            </button>
          </div>
        </form>
      </div>
      <CreateNewEntryModal
        isOpen={isCreateCompanyModalOpen}
        onClose={() => setIsCreateCompanyModalOpen(false)}
        onCreateNew={handleCreateNewCompany}
        type="company"
      />
      <CreateNewEntryModal
        isOpen={isCreateSegmentModalOpen}
        onClose={() => setIsCreateSegmentModalOpen(false)}
        onCreateNew={handleCreateNewSegment}
        type="segment"
      />
      <CreateNewEntryModal
        isOpen={isCreateTradeTypeModalOpen}
        onClose={() => setIsCreateTradeTypeModalOpen(false)}
        onCreateNew={handleCreateNewTradeType}
        type="tradeType"
      />
    </div>
  );
}