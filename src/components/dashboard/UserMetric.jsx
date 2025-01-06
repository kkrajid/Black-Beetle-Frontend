import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const UserMetric = () => {
    const data = [
        { name: 'B2B Users', value: 20, color: '#D7B257' },  // Primary color
        { name: 'B2B Admins', value: 21, color: '#C9A64E' }, // Slightly darker shade of primary
        { name: 'B2C Users', value: 40, color: '#B89A45' }   // Even darker shade of primary
    ];

    return (
        <div className="w-[20rem] h-[22rem] bg-background border border-border text-text p-4 rounded-sm shadow-[0_0_10px_rgba(215,178,87,0.1)] flex flex-col">
            <strong className="text-primary font-medium">User Distribution</strong>
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
                                border: '1px solid rgba(215, 178, 87, 0.2)', 
                                borderRadius: '4px' 
                            }}
                            itemStyle={{ color: '#91916B' }}
                            labelStyle={{ color: '#91916B' }}
                        />
                        <Legend 
                            layout="horizontal" 
                            verticalAlign="bottom" 
                            align="center"
                            wrapperStyle={{
                                paddingTop: '2rem'
                            }}
                            formatter={(value, entry, index) => <span style={{ color: '#91916B' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default UserMetric;

