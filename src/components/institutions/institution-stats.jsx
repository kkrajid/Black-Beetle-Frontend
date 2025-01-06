import React from 'react';
import { Building2, Users, UserCheck } from 'lucide-react';


const InstitutionStats= ({ stats }) => {
    const statsConfig = [
        {
            title: "Total Institutions",
            value: stats.total_institutions,
            icon: Building2,
        },
        {
            title: "Total Users",
            value: stats.total_users,
            icon: Users,
        },
        {
            title: "Active Admins",
            value: stats.active_admins,
            icon: UserCheck,
        },
    ];

    function BoxWrapper({ children }) {
        return (
            <div className="bg-background rounded-sm flex-1 p-4 border border-border text-text flex items-center shadow-[0_0_10px_rgba(215,178,87,0.1)]">
                {children}
            </div>
        );
    }

    return (
        <div className='flex gap-4 w-full'>
            {statsConfig.map((stat, index) => (
                <BoxWrapper key={index}>
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
    );
};

export default InstitutionStats;

