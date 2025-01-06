import React from 'react';
import { IndianRupee, CheckCircle, XCircle, Clock } from 'lucide-react';

const BoxWrapper = ({ children }) => (
  <div className="bg-black rounded-sm flex-1 p-4 border border-neutral-800 text-gray-300 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.3)]">
    {children}
  </div>
);

const OrderStats = () => {
  const mockData = {
    total_revenue: 245799,
    completed_orders: 156,
    pending_orders: 23,
    failed_orders: 7
  };

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
  ];

  return (
    <div className="flex gap-4 w-full">
      {stats.map((stat) => (
        <BoxWrapper key={stat.title}>
          <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center">
            <stat.icon className="text-2xl text-orange-500" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-300/60 font-light">{stat.title}</span>
            <div className="flex items-center">
              <strong className="text-xl text-orange-500 font-semibold">{stat.value}</strong>
            </div>
          </div>
        </BoxWrapper>
      ))}
    </div>
  );
};

export default OrderStats;