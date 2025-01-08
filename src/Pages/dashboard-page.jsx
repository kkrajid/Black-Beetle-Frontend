import React, { useState, useEffect } from 'react';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import TransactionCharts from '../components/dashboard/TradesCharts';
import UserMetric from '../components/dashboard/UserMetric';
import RecentTrades from '../components/dashboard/RecentTrades';
import { Wallet, Users, BarChart2, ShoppingBag } from 'lucide-react';
import DashboardLoading from '../components/dashboard/DashboardLoading';

const Dashboard = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate data loading
		setTimeout(() => setLoading(false), 1500);
	}, []);

	
	// Stats Grid Data
	const statsData = [
		{
			title: 'Total Orders',
			value: '10,000',
			change: '+234',
			positive: true,
			icon: <ShoppingBag />
		},
		{
			title: 'Total Revenue',
			value: '$50,000',
			change: '+18%',
			positive: true,
			icon: <Wallet />
		},
		{
			title: 'Conversion Rate',
			value: '2.5%',
			change: '-0.3%',
			positive: false,
			icon: <BarChart2 />
		},
		{
			title: 'Total Customers',
			value: '5,000',
			change: '+120',
			positive: true,
			icon: <Users />
		}
	];

	// Trading Activity Chart Data
	const tradingActivityData = [
		{ id: 1, date: 'Jan 2023', trades: 100 },
		{ id: 2, date: 'Feb 2023', trades: 200 },
		{ id: 3, date: 'Mar 2023', trades: 300 },
		{ id: 4, date: 'Apr 2023', trades: 400 },
		{ id: 5, date: 'May 2023', trades: 500 },
		{ id: 6, date: 'Jun 2023', trades: 600 }
	];

	// User Distribution Data
	const userDistributionData = [
		{ name: 'B2B Users', value: 20, color: '#f97316' },
		{ name: 'B2B Admins', value: 21, color: '#ea580c' },
		{ name: 'B2C Users', value: 40, color: '#c2410c' }
	];

	// Recent Trades Data
	const recentTradesData = [
		{
			id: 1,
			company: { name: "Apple Inc.", stock_index: "AAPL" },
			trade_type: { name: "BUY" },
			segment: { name: "EQUITY" },
			status: "ACTIVE",
		},
		{
			id: 2,
			company: { name: "Microsoft Corporation", stock_index: "MSFT" },
			trade_type: { name: "SELL" },
			segment: { name: "FUTURES" },
			status: "PENDING",
		},
		{
			id: 3,
			company: { name: "Tesla, Inc.", stock_index: "TSLA" },
			trade_type: { name: "BUY" },
			segment: { name: "OPTIONS" },
			status: "COMPLETED",
		},
		{
			id: 4,
			company: { name: "Amazon.com, Inc.", stock_index: "AMZN" },
			trade_type: { name: "SELL" },
			segment: { name: "EQUITY" },
			status: "CANCELLED",
		},
		{
			id: 5,
			company: { name: "Meta Platforms, Inc.", stock_index: "META" },
			trade_type: { name: "BUY" },
			segment: { name: "FUTURES" },
			status: "ACTIVE",
		},
		{
			id: 6,
			company: { name: "NVIDIA Corporation", stock_index: "NVDA" },
			trade_type: { name: "SELL" },
			segment: { name: "OPTIONS" },
			status: "PENDING",
		}
	];
	
	if (loading) return <DashboardLoading />;
	
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid stats={statsData} />
			<div className="flex flex-row gap-4 w-full">
				<TransactionCharts data={tradingActivityData} />
				<UserMetric data={userDistributionData} />
			</div>
			<div className="flex-1 w-full">
				<RecentTrades trades={recentTradesData} />
			</div>
		</div>
	);
}

export default Dashboard;