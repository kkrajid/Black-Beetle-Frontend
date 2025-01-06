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

const data = [
  { id: 1, date: 'Jan 2023', trades: 100 },
  { id: 2, date: 'Feb 2023', trades: 200 },
  { id: 3, date: 'Mar 2023', trades: 300 },
  { id: 4, date: 'Apr 2023', trades: 400 },
  { id: 5, date: 'May 2023', trades: 500 },
  { id: 6, date: 'Jun 2023', trades: 600 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded-md shadow-sm">
        <p className="text-sm font-medium text-primary">{label}</p>
        <p className="text-sm text-text">Trades: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function BoxWrapper({ children }) {
  return (
    <div className="bg-background rounded-sm flex-1 p-4 border border-border text-text flex flex-col shadow-[0_0_10px_rgba(215,178,87,0.1)]">
      {children}
    </div>
  );
}

const TradesCharts = () => {
  return (
    <BoxWrapper>
      <strong className="text-primary font-medium">Trading Activity</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTrades" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D7B257" stopOpacity={1}/>
                <stop offset="100%" stopColor="#D7B257" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true}
              vertical={false}
              stroke="#91916B"
              opacity={0.1}
            />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#91916B' }}
              axisLine={{ stroke: '#91916B', opacity: 0.2 }}
              tickFormatter={(value) => value}
            />
            <YAxis 
              tick={{ fill: '#91916B' }}
              axisLine={{ stroke: '#91916B', opacity: 0.2 }}
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
                fill="#91916B"
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

