import React from 'react';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-2 border border-neutral-800 rounded-md shadow-sm">
        <p className="text-sm font-medium text-orange-500">{label}</p>
        <p className="text-sm text-gray-300">Trades: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function BoxWrapper({ children }) {
  return (
    <div className="bg-black rounded-sm flex-1 p-4 border border-neutral-800 text-gray-300 flex flex-col shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
}

const TradesCharts = ({ data = [] }) => {
  return (
    <BoxWrapper>
      <strong className="text-orange-500 font-medium">Trading Activity</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTrades" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true}
              vertical={false}
              stroke="#525252"
              opacity={0.1}
            />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#d1d5db' }}
              axisLine={{ stroke: '#525252', opacity: 0.2 }}
              tickFormatter={(value) => value}
            />
            <YAxis 
              tick={{ fill: '#d1d5db' }}
              axisLine={{ stroke: '#525252', opacity: 0.2 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="trades"
              fill="url(#colorTrades)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            >
              <LabelList 
                dataKey="trades" 
                position="top" 
                fill="#d1d5db"
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BoxWrapper>
  );
};

export default TradesCharts;