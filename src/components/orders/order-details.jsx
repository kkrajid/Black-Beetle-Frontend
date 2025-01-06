import React, { useState } from 'react';
import { IndianRupee, X, User, Calendar, CheckCircle } from 'lucide-react';

const OrderDetails = ({ order, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      console.log('Processing payment...');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-orange-500">Order Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full text-gray-300">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-orange-500">Order Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-300/60">Order ID</p>
                  <p className="font-medium text-gray-300">{order.razorpay_order_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300/60">Payment ID</p>
                  <p className="font-medium text-gray-300">{order.razorpay_payment_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300/60">Status</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-300/60">Date</p>
                  <p className="font-medium text-gray-300">{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-neutral-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium text-orange-500">Customer Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-300/60">Name</p>
                    <p className="font-medium text-gray-300">{order.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300/60">Phone</p>
                    <p className="font-medium text-gray-300">{order.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300/60">Email</p>
                    <p className="font-medium text-gray-300">{order.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="border border-neutral-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium text-orange-500">Plan Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-300/60">Plan Name</p>
                    <p className="font-medium text-gray-300">{order.plan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300/60">Plan Code</p>
                    <p className="font-medium text-gray-300">{order.plan.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300/60">Duration</p>
                    <p className="font-medium text-gray-300">{order.plan.duration_days} days</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-orange-500" />
                <h3 className="font-medium text-orange-500">Plan Features</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-neutral-800">
                  <span className="text-sm text-gray-300/60">Trade Limit</span>
                  <span className="font-medium text-gray-300">{order.plan.features.trade_limit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800">
                  <span className="text-sm text-gray-300/60">Advanced Analytics</span>
                  <span className="font-medium text-gray-300">{order.plan.features.advanced_analytics ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="border border-neutral-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300/60">Total Amount</p>
                  <p className="text-2xl font-bold flex items-center mt-1 text-orange-500">
                    <IndianRupee className="h-5 w-5" />
                    {order.amount.toLocaleString()}
                  </p>
                </div>
                {order.status === 'PENDING' && (
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                )}
                {order.status === 'COMPLETED' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                    Paid
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;