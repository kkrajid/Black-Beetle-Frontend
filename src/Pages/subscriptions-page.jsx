import { useState } from 'react';
import { Search, MoreVertical, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

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
    const [subscriptions] = useState(subscriptionss);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subscriptions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

    const NoDataMessage = () => (
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">No Subscriptions Found</h3>
            <p className="text-sm md:text-base text-gray-500 text-center">There are no subscriptions to display at this time.</p>
        </div>
    );

    return (
        <div className="w-full p-3 md:p-6 bg-gray-50">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                {[
                    { label: 'Total', value: '0', color: 'text-gray-900' },
                    { label: 'Active', value: '0', color: 'text-green-600' },
                    { label: 'Auto Renew', value: '0', color: 'text-blue-600' },
                    { label: 'Expired', value: '0', color: 'text-red-600' }
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                        <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                        <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Search Controls */}
            <div className="bg-white rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search subscriptions..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                    <select className="px-3 md:px-4 py-2 border rounded-lg text-sm">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Expired</option>
                    </select>
                    <input
                        type="date"
                        className="px-3 md:px-4 py-2 border rounded-lg text-sm"
                    />
                </div>
            </div>

            {/* Table/Card View */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {subscriptions.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-sm">User</th>
                                        <th className="text-left p-4 font-medium text-sm">Plan</th>
                                        <th className="text-left p-4 font-medium text-sm">Start Date</th>
                                        <th className="text-left p-4 font-medium text-sm">End Date</th>
                                        <th className="text-left p-4 font-medium text-sm">Status</th>
                                        <th className="text-left p-4 font-medium text-sm">Auto Renew</th>
                                        <th className="text-right p-4 font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(sub => (
                                        <tr key={sub.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <p className="font-medium text-sm">{sub.user.name}</p>
                                                <p className="text-xs text-gray-500">{sub.user.phone}</p>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-medium text-sm">{sub.plan.name}</p>
                                                <p className="text-xs text-gray-500">{sub.plan.code}</p>
                                            </td>
                                            <td className="p-4 text-sm">{sub.start_date}</td>
                                            <td className="p-4 text-sm">{sub.end_date}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {sub.is_active ? 'Active' : 'Expired'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.auto_renew ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {sub.auto_renew ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {currentItems.map(sub => (
                                <div key={sub.id} className="p-4 border-b last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-sm">{sub.user.name}</p>
                                            <p className="text-xs text-gray-500">{sub.user.phone}</p>
                                        </div>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreVertical className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Plan</p>
                                            <p className="text-sm">{sub.plan.name} ({sub.plan.code})</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500">Start Date</p>
                                                <p className="text-sm">{sub.start_date}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">End Date</p>
                                                <p className="text-sm">{sub.end_date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {sub.is_active ? 'Active' : 'Expired'}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.auto_renew ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {sub.auto_renew ? 'Auto Renew' : 'No Auto Renew'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t gap-4">
                            <p className="text-xs md:text-sm text-gray-500 order-2 md:order-1">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, subscriptions.length)} of {subscriptions.length} entries
                            </p>
                            <div className="flex gap-2 order-1 md:order-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                                >
                                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-2 md:px-3 py-1 rounded text-sm ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                                >
                                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <NoDataMessage />
                )}
            </div>
        </div>
    );
};

export default SubscriptionsPage;