import { useState } from 'react'

export function AddPlanModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    price: '',
    duration_days: 30,
    trade_limit: '',
    features: {
      real_time_data: false,
      advanced_charts: false,
      ai_predictions: false
    }
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      id: Date.now().toString(),
      is_visible: true,
      price: Number(formData.price),
      trade_limit: Number(formData.trade_limit)
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-black rounded-xl border border-neutral-800 max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-orange-500 mb-6">Add New Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Code</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Trade Limit</label>
              <input
                type="number"
                required
                value={formData.trade_limit}
                onChange={e => setFormData(prev => ({ ...prev, trade_limit: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
            {Object.entries(formData.features).map(([feature, value]) => (
              <div key={feature} className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    features: {
                      ...prev.features,
                      [feature]: e.target.checked
                    }
                  }))}
                  className="w-4 h-4 text-orange-500 bg-neutral-900 border-neutral-700 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-300">
                  {feature.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            ))}
          </div>

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
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}