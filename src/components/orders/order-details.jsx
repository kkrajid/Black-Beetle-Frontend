import React, { useState } from 'react'
import { IndianRupee, X, User, Calendar, CheckCircle } from 'lucide-react'

const mockOrder = {
  id: '1',
  user: {
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@example.com'
  },
  plan: {
    name: 'Premium Plan',
    code: 'PREM2024',
    duration_days: 365,
    features: {
      trade_limit: 100,
      advanced_analytics: true
    }
  },
  amount: 19999,
  status: 'PENDING',
  razorpay_order_id: 'order_MXlJ7qrWH5UVK',
  razorpay_payment_id: null,
  created_at: '2024-03-15T10:30:00Z'
}

const OrderDetails = ({ order = mockOrder, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // Payment logic here
      console.log('Processing payment...')
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Order Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Order Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.razorpay_order_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment ID</p>
                  <p className="font-medium">{order.razorpay_payment_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Customer and Plan Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4" />
                  <h3 className="font-medium">Customer Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{order.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{order.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{order.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <h3 className="font-medium">Plan Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Plan Name</p>
                    <p className="font-medium">{order.plan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plan Code</p>
                    <p className="font-medium">{order.plan.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{order.plan.duration_days} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4" />
                <h3 className="font-medium">Plan Features</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-500">Trade Limit</span>
                  <span className="font-medium">{order.plan.features.trade_limit}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-500">Advanced Analytics</span>
                  <span className="font-medium">{order.plan.features.advanced_analytics ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold flex items-center mt-1">
                    <IndianRupee className="h-5 w-5" />
                    {order.amount.toLocaleString()}
                  </p>
                </div>
                {order.status === 'PENDING' && (
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                )}
                {order.status === 'COMPLETED' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails