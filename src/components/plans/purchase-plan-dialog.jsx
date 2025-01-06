import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'

export function PurchasePlanDialog({ plan, onClose }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!plan) return null

  const handlePurchase = async () => {
    setLoading(true)
    setError(null)

    try {
      // Mock API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      onClose()
    } catch (err) {
      setError("Failed to initiate payment. Please try again.")
      console.error("Payment error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">Purchase Plan</h2>
            <p className="text-gray-600">You are about to purchase the {plan.name} plan</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-medium">Plan Details</div>
              <div className="text-sm text-gray-600">
                <div>Duration: {plan.duration_days} days</div>
                <div>Trade Limit: {plan.trade_limit} trades per day</div>
                <div>Price: ₹{plan.price.toLocaleString()}</div>
              </div>
            </div>

            <div>
              <div className="font-medium">Features Included</div>
              <div className="text-sm space-y-2">
                {Object.entries(plan.features).map(([feature, value]) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>
                      {feature.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button 
              onClick={handlePurchase} 
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}