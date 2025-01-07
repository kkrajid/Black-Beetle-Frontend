import React from 'react';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import TransactionCharts from '../components/dashboard/TradesCharts';
import UserMetric from '../components/dashboard/UserMetric';
import RecentTrades from '../components/dashboard/RecentTrades';

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionCharts />
				<UserMetric/>
			</div>
			<div className="flex-1 w-full">
			<RecentTrades/>
			</div>
		</div>
    );
}

export default Dashboard;
