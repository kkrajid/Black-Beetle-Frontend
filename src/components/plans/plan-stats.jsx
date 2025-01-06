import React from 'react'
import { Users, Package, Crown, TrendingUp } from 'lucide-react'

export function PlanStats() {
    const stats = [
        {
            title: "Total Subscribers",
            value: "2,345",
            change: "+120",
            Icon: Users,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            title: "Active Plans",
            value: "4",
            change: "+1",
            Icon: Package,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            title: "Premium Users",
            value: "1,234",
            change: "+89",
            Icon: Crown,
            bgColor: "bg-amber-100",
            iconColor: "text-amber-600"
        },
        {
            title: "Upgrade Rate",
            value: "12%",
            change: "+2.4%",
            Icon: TrendingUp,
            bgColor: "bg-emerald-100",
            iconColor: "text-emerald-600"
        }
    ]

    function BoxWrapper({ children }) {
        return (
            <div className="bg-white rounded-sm flex-1 p-4 border border-gray-200 flex items-center">
                {children}
            </div>
        );
    }

    return (
        <div className="flex gap-4 w-full">
            {stats.map((stat) => (
                <BoxWrapper key={stat.title}>
                    <div className={`rounded-full ${stat.bgColor} w-12 h-12 flex items-center justify-center`}>
                        <stat.Icon className={`text-2xl text-white ${stat.iconColor}`} />
                    </div>
                    <div className="p-4">
                        <span className="text-sm text-gray-500 font-light">{stat.title}</span>
                        <div className="flex items-center gap-2">
                            <strong className="text-xl text-gray-700 font-semibold">{stat.value}</strong>
                            <span className="text-sm text-green-500 pl-2">{stat.change}</span>
                        </div>
                    </div>
                </BoxWrapper>
            ))}
        </div>
    )
}