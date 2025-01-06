import React from 'react'
import { IndianRupee, CheckCircle, XCircle, Clock } from 'lucide-react'


const BoxWrapper= ({ children }) => (
  <div className="bg-background rounded-sm flex-1 p-4 border border-border text-text flex items-center shadow-[0_0_10px_rgba(215,178,87,0.1)]">
    {children}
  </div>
)

const OrderStats = () => {
  const mockData = {
    total_revenue: 245799,
    completed_orders: 156,
    pending_orders: 23,
    failed_orders: 7
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${mockData.total_revenue.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      title: "Completed Orders",
      value: mockData.completed_orders.toString(),
      icon: CheckCircle,
    },
    {
      title: "Pending Orders",
      value: mockData.pending_orders.toString(),
      icon: Clock,
    },
    {
      title: "Failed Orders",
      value: mockData.failed_orders.toString(),
      icon: XCircle,
    }
  ]

  return (
    <div className='flex gap-4 w-full'>
      {stats.map((stat) => (
        <BoxWrapper key={stat.title}>
          <div className="rounded-full bg-hover w-12 h-12 flex items-center justify-center">
            <stat.icon className='text-2xl text-primary' />
          </div>
          <div className='pl-4'>
            <span className='text-sm text-text/60 font-light'>{stat.title}</span>
            <div className='flex items-center'>
              <strong className='text-xl text-primary font-semibold'>{stat.value}</strong>
            </div>
          </div>
        </BoxWrapper>
      ))}
    </div>
  )
}

export default OrderStats

