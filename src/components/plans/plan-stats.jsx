import React from 'react'
import { Users, Package, Crown, TrendingUp } from 'lucide-react'

export function PlanStats() {
    const stats = [
        {
            title: "Total Subscribers",
            value: "2,345",
            change: "+120",
            Icon: Users,
            bgColor: "bg-neutral-800",
            iconColor: "text-orange-500"
        },
        {
            title: "Active Plans",
            value: "4",
            change: "+1",
            Icon: Package,
            bgColor: "bg-neutral-800",
            iconColor: "text-orange-500"
        },
        {
            title: "Premium Users",
            value: "1,234",
            change: "+89",
            Icon: Crown,
            bgColor: "bg-neutral-800",
            iconColor: "text-orange-500"
        },
        {
            title: "Upgrade Rate",
            value: "12%",
            change: "+2.4%",
            Icon: TrendingUp,
            bgColor: "bg-neutral-800",
            iconColor: "text-orange-500"
        }
    ]

    function BoxWrapper({ children }) {
        return (
            <div className="bg-black rounded-sm flex-1 p-4 border border-neutral-800 text-gray-300 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                {children}
            </div>
        );
    }

    return (
        <div className="flex gap-4 w-full">
            {stats.map((stat) => (
                <BoxWrapper key={stat.title}>
                    <div className={`rounded-full ${stat.bgColor} w-12 h-12 flex items-center justify-center`}>
                        <stat.Icon className={`text-2xl ${stat.iconColor}`} />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-300/60 font-light">{stat.title}</span>
                        <div className="flex items-center gap-2">
                            <strong className="text-xl text-orange-500 font-semibold">{stat.value}</strong>
                            <span className="text-sm text-green-500 pl-2">{stat.change}</span>
                        </div>
                    </div>
                </BoxWrapper>
            ))}
        </div>
    )
}

export default PlanStats;