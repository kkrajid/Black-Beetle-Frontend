import React from 'react';
import { Building2, Users, UserCheck } from 'lucide-react';

const InstitutionStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="flex gap-4 w-full">
        {[...Array(3)].map((_, index) => (
          <BoxWrapper key={index}>
            <div className="rounded-full bg-neutral-800/50 w-12 h-12 animate-pulse" />
            <div className="pl-4 flex-1">
              <div className="h-4 bg-neutral-800/50 rounded w-24 mb-2 animate-pulse" />
              <div className="h-6 bg-neutral-800/50 rounded w-16 animate-pulse" />
            </div>
          </BoxWrapper>
        ))}
      </div>
    );
  }

  const statsConfig = [
    {
      title: "Total Institutions",
      value: stats.total_institutions,
      icon: Building2,
      description: "Registered organizations",
      trend: stats.institutions_trend
    },
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
      description: "All institution members",
      trend: stats.users_trend
    },
    {
      title: "Active Admins",
      value: stats.active_admins,
      icon: UserCheck,
      description: "Current admin users",
      trend: stats.admins_trend
    }
  ];

  return (
    <div className="flex gap-4 w-full">
      {statsConfig.map((stat, index) => (
        <BoxWrapper key={index}>
          <div className="rounded-full bg-orange-500/10 w-12 h-12 flex items-center justify-center">
            <stat.icon className="text-orange-500 h-6 w-6" />
          </div>
          <div className="pl-4 flex flex-col">
            <span className="text-sm text-gray-300/60 font-light">
              {stat.title}
            </span>
            <div className="flex items-baseline space-x-2">
              <strong className="text-xl text-orange-500 font-semibold">
                {typeof stat.value === 'number' 
                  ? new Intl.NumberFormat().format(stat.value) 
                  : stat.value || '0'}
              </strong>
              {stat.trend && (
                <span className={`text-xs ${
                  stat.trend > 0 
                    ? 'text-green-500' 
                    : stat.trend < 0 
                      ? 'text-red-500' 
                      : 'text-gray-300/60'
                }`}>
                  {stat.trend > 0 ? '+' : ''}{stat.trend}%
                </span>
              )}
            </div>
            <span className="text-xs text-gray-300/40 mt-1">
              {stat.description}
            </span>
          </div>
        </BoxWrapper>
      ))}
    </div>
  );
};

function BoxWrapper({ children }) {
  return (
    <div className="bg-black rounded-sm flex-1 p-4 border border-orange-500/20 text-gray-300 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  )
}

export default InstitutionStats;