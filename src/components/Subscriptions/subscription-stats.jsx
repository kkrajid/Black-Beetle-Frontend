import React from 'react';

const SubscriptionStats = ({ subscriptions }) => {
  const stats = [
    { 
      label: 'Total',
      value: subscriptions.length,
      color: 'text-orange-500',
      icon: '📊'
    },
    {
      label: 'Active',
      value: subscriptions.filter(s => s.is_active).length,
      color: 'text-orange-500',
      icon: '✓'
    },
    {
      label: 'Auto Renew',
      value: subscriptions.filter(s => s.auto_renew).length,
      color: 'text-orange-500',
      icon: '🔄'
    },
    {
      label: 'Expired',
      value: subscriptions.filter(s => !s.is_active).length,
      color: 'text-orange-500',
      icon: '⚠️'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black border border-neutral-800 rounded-sm p-4 shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center">
          <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center text-xl">
            {stat.icon}
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-300/60 font-light">{stat.label}</span>
            <div className="flex items-center">
              <strong className={`text-xl font-semibold ${stat.color}`}>{stat.value}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionStats;