import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const mockTrades = [
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

const RecentTrades = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return mockTrades.slice(startIndex, startIndex + itemsPerPage);
    };

    const getStatusColor = (status) => ({
        ACTIVE: 'bg-green-500/20 text-green-500',
        PENDING: 'bg-yellow-500/20 text-yellow-500',
        COMPLETED: 'bg-blue-500/20 text-blue-500',
        CANCELLED: 'bg-red-500/20 text-red-500'
    }[status] || 'bg-gray-500/20 text-gray-500');

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
                                <tr key={trade.id} className="[&_tr]:border-b [&_tr]:border-neutral-800 [&_td]:border-neutral-800 last:[&_td]:border-r-0">
                                    <td className="px-6 py-3">
                                        <div>
                                            <div className="text-sm font-medium text-orange-500">{trade.company.stock_index}</div>
                                            <div className="text-sm text-gray-300/60">{trade.company.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-gray-300">{trade.trade_type.name}</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-gray-300">{trade.segment.name}</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trade.status)}`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-neutral-800">
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
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, mockTrades.length)} of {mockTrades.length} trades
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(mockTrades.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(mockTrades.length / itemsPerPage)}
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