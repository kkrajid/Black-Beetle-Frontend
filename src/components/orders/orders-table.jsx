import React, { useState } from 'react'
import { Eye, MoreHorizontal, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import OrderDetails from './order-details'

const mockOrders = [
  {
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
    status: 'COMPLETED',
    razorpay_order_id: 'order_MXlJ7qrWH5UVK',
    razorpay_payment_id: 'pay_123456',
    created_at: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      phone: '+91 9876543211',
      email: 'jane@example.com'
    },
    plan: {
      name: 'Basic Plan',
      code: 'BASIC2024',
      duration_days: 180,
      features: {
        trade_limit: 50,
        advanced_analytics: false
      }
    },
    amount: 9999,
    status: 'PENDING',
    razorpay_order_id: 'order_MXlK8rWH5UVL',
    razorpay_payment_id: null,
    created_at: '2024-03-16T11:30:00Z'
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      phone: '+91 9876543212',
      email: 'mike@example.com'
    },
    plan: {
      name: 'Pro Plan',
      code: 'PRO2024',
      duration_days: 365,
      features: {
        trade_limit: 75,
        advanced_analytics: true
      }
    },
    amount: 14999,
    status: 'PROCESSING',
    razorpay_order_id: 'order_MXlL9sWH5UVM',
    razorpay_payment_id: null,
    created_at: '2024-03-17T12:30:00Z'
  },
  {
    id: '4',
    user: {
      name: 'Sarah Wilson',
      phone: '+91 9876543213',
      email: 'sarah@example.com'
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
    status: 'COMPLETED',
    razorpay_order_id: 'order_MXlN9tWH5UVN',
    razorpay_payment_id: 'pay_789012',
    created_at: '2024-03-18T13:30:00Z'
  },
  {
    id: '5',
    user: {
      name: 'David Brown',
      phone: '+91 9876543214',
      email: 'david@example.com'
    },
    plan: {
      name: 'Basic Plan',
      code: 'BASIC2024',
      duration_days: 180,
      features: {
        trade_limit: 50,
        advanced_analytics: false
      }
    },
    amount: 9999,
    status: 'PENDING',
    razorpay_order_id: 'order_MXlO0uWH5UVO',
    razorpay_payment_id: null,
    created_at: '2024-03-19T14:30:00Z'
  },
  {
    id: '6',
    user: {
      name: 'Emily Davis',
      phone: '+91 9876543215',
      email: 'emily@example.com'
    },
    plan: {
      name: 'Pro Plan',
      code: 'PRO2024',
      duration_days: 365,
      features: {
        trade_limit: 75,
        advanced_analytics: true
      }
    },
    amount: 14999,
    status: 'PROCESSING',
    razorpay_order_id: 'order_MXlP1vWH5UVP',
    razorpay_payment_id: null,
    created_at: '2024-03-20T15:30:00Z'
  }
]

const getStatusColor = (status) => {
  const colors = {
    'PENDING': 'bg-yellow-500/20 text-yellow-500',
    'PROCESSING': 'bg-blue-500/20 text-blue-500',
    'COMPLETED': 'bg-green-500/20 text-green-500',
    'FAILED': 'bg-red-500/20 text-red-500',
    'REFUNDED': 'bg-gray-500/20 text-gray-500'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-500'
}

const ITEMS_PER_PAGE = 5

const OrdersTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(mockOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = mockOrders.slice(startIndex, endIndex)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Card className="w-full bg-background border-border shadow-[0_0_10px_rgba(215,178,87,0.1)]">
      <CardHeader>
        <CardTitle className="text-primary font-medium">Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full bg-background">
            <thead className="bg-hover [&_th]:border-b [&_th]:border-border last:[&_th]:border-r-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">User</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Date</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="[&_tr]:border-b [&_tr]:border-border [&_td]:border-border last:[&_td]:border-r-0 hover:bg-hover">
                  <td className="px-6 py-3 font-medium text-primary">
                    {order.razorpay_order_id}
                  </td>
                  <td className="px-6 py-3">
                    <div>
                      <div className="font-medium text-primary">{order.user.name}</div>
                      <div className="text-sm text-text/60">{order.user.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div>
                      <div className="font-medium text-primary">{order.plan.name}</div>
                      <div className="text-sm text-text/60">{order.plan.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center text-text">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-text">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDropdownOpen(dropdownOpen === order.id ? null : order.id)}
                        className="text-primary hover:text-primary/80 hover:bg-hover"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {dropdownOpen === order.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setSelectedOrder(order)
                                setDropdownOpen(null)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-text hover:bg-hover"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-text/60">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="border-border text-primary hover:bg-hover"
            >
              {/* <ChevronLeft className="h-4 w-4 mr-1" /> */}
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="border-border text-primary hover:bg-hover"
            >
              Next
              {/* <ChevronRight className="h-4 w-4 ml-1" /> */}
            </Button>
          </div>
        </div>
      </CardContent>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </Card>
  )
}

export default OrdersTable

