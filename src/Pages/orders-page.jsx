import React from 'react';
import OrderStats from '../components/orders/order-stats';
import OrderFilters from '../components/orders/order-filters';
import OrdersTable from '../components/orders/orders-table';

const OrdersPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <OrderStats />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <OrderFilters />
                </div>
                <OrdersTable />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
            </div>
        </div>
    );
}

export default OrdersPage;
