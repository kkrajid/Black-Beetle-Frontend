import React from 'react';
import OrderStats from '../components/orders/order-stats';
import OrderFilters from '../components/orders/order-filters';
import OrdersTable from '../components/orders/orders-table';
// const orderStats = {
//     total_revenue: 245799,
//     completed_orders: 156,
//     pending_orders: 23,
//     failed_orders: 7
//   }
const OrdersPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <OrderStats />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <OrderFilters />
                    {/* <AddAdminDialog /> */}
                </div>
                <OrdersTable />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* <VerificationRequests />
        <RecentActivity /> */}
            </div>
        </div>
    );
}

export default OrdersPage;
