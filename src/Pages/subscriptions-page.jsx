
import React, { useState } from 'react';
import SubscriptionStats from '../components/Subscriptions/subscription-stats';
import SubscriptionFilters from '../components/Subscriptions/subscription-filters';
import SubscriptionTable from '../components/Subscriptions/subscription-table';



const SubscriptionsPage = () => {

    const subscriptionss = [
        {
            id: 1,
            user: { name: 'John Doe', phone: '+91 9876543210' },
            plan: { name: 'Premium Plan', code: 'PREM2024' },
            start_date: '2024-03-15',
            end_date: '2024-04-14',
            is_active: true,
            auto_renew: true
        },
        {
            id: 2,
            user: { name: 'Jane Smith', phone: '+91 9876543211' },
            plan: { name: 'Basic Plan', code: 'BASIC2024' },
            start_date: '2024-03-16',
            end_date: '2024-04-15',
            is_active: true,
            auto_renew: false
        },
        {
            id: 3,
            user: { name: 'Mike Johnson', phone: '+91 9876543212' },
            plan: { name: 'Pro Plan', code: 'PRO2024' },
            start_date: '2024-03-17',
            end_date: '2024-04-16',
            is_active: false,
            auto_renew: false
        },
        {
            id: 4,
            user: { name: 'Sarah Wilson', phone: '+91 9876543213' },
            plan: { name: 'Premium Plan', code: 'PREM2024' },
            start_date: '2024-03-18',
            end_date: '2024-04-17',
            is_active: true,
            auto_renew: true
        },
        {
            id: 5,
            user: { name: 'David Brown', phone: '+91 9876543214' },
            plan: { name: 'Basic Plan', code: 'BASIC2024' },
            start_date: '2024-03-19',
            end_date: '2024-04-18',
            is_active: true,
            auto_renew: false
        },
        {
            id: 6,
            user: { name: 'Emma Davis', phone: '+91 9876543215' },
            plan: { name: 'Pro Plan', code: 'PRO2024' },
            start_date: '2024-03-20',
            end_date: '2024-04-19',
            is_active: true,
            auto_renew: true
        },
        {
            id: 7,
            user: { name: 'Alex Turner', phone: '+91 9876543216' },
            plan: { name: 'Premium Plan', code: 'PREM2024' },
            start_date: '2024-03-21',
            end_date: '2024-04-20',
            is_active: false,
            auto_renew: false
        },
        {
            id: 8,
            user: { name: 'Lisa Anderson', phone: '+91 9876543217' },
            plan: { name: 'Basic Plan', code: 'BASIC2024' },
            start_date: '2024-03-22',
            end_date: '2024-04-21',
            is_active: true,
            auto_renew: true
        }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [subscriptions, setSubscriptions] = useState(subscriptionss);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subscriptions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

    return (
        <div className="w-full  bg-black">
            <SubscriptionStats subscriptions={subscriptions} />
            <SubscriptionFilters
                onSearch={(e) => console.log(e.target.value)}
                onStatusChange={(e) => console.log(e.target.value)}
                onDateChange={(e) => console.log(e.target.value)}
            />
            <SubscriptionTable
                currentItems={currentItems}
                currentPage={currentPage}
                totalPages={totalPages}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                totalItems={subscriptions.length}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default SubscriptionsPage;