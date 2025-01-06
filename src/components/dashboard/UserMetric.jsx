import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const UserMetric = () => {
    const data = [
        { name: 'B2B Users', value: 20, color: '#f97316' },    // Orange-500
        { name: 'B2B Admins', value: 21, color: '#ea580c' },  // Orange-600
        { name: 'B2C Users', value: 40, color: '#c2410c' }    // Orange-700
    ];

    return (
        <div className="w-[20rem] h-[22rem] bg-black border border-neutral-800 text-gray-300 p-4 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.3)] flex flex-col">
            <strong className="text-orange-500 font-medium">User Distribution</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#000000',
                                border: '1px solid #404040',
                                borderRadius: '4px'
                            }}
                            itemStyle={{ color: '#d1d5db' }}
                            labelStyle={{ color: '#d1d5db' }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                paddingTop: '2rem'
                            }}
                            formatter={(value, entry, index) => <span style={{ color: '#d1d5db' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default UserMetric;