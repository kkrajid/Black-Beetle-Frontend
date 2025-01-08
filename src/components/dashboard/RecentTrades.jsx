import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';



const RecentTrades = ({ trades = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return trades.slice(startIndex, startIndex + itemsPerPage);
    };

    const getStatusColor = (status) => ({
        ACTIVE: 'bg-green-500/20 text-green-500',
        PENDING: 'bg-yellow-500/20 text-yellow-500',
        COMPLETED: 'bg-blue-500/20 text-blue-500',
        CANCELLED: 'bg-red-500/20 text-red-500'
    }[status] || 'bg-gray-500/20 text-gray-500');

    const totalPages = Math.ceil(trades.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <Card className="w-full bg-black border-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <CardHeader>
                <CardTitle className="text-orange-500 font-medium">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full bg-black">
                        <thead className="bg-neutral-800 [&_th]:border-b [&_th]:border-neutral-700 last:[&_th]:border-r-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Stock</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Segment</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Status</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-orange-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentPageData().map((trade) => (
                                <tr 
                                    key={trade.id} 
                                    className="[&_td]:border-b [&_td]:border-neutral-800 hover:bg-neutral-900/50 transition-colors"
                                >
                                    <td className="px-6 py-3">
                                        <div>
                                            <div className="text-sm font-medium text-orange-500">
                                                {trade.company.stock_index}
                                            </div>
                                            <div className="text-sm text-gray-300/60">
                                                {trade.company.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-gray-300">
                                            {trade.trade_type.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-gray-300">
                                            {trade.segment.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trade.status)}`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="text-orange-500 hover:text-orange-400 hover:bg-neutral-800"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-300/60">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, trades.length)} of{' '}
                        {trades.length} trades
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentTrades;