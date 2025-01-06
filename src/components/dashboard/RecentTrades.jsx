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
        const endIndex = startIndex + itemsPerPage;
        return mockTrades.slice(startIndex, endIndex);
    };

    const getStatusColor = (status) => {
        const colors = {
            ACTIVE: 'bg-green-500/20 text-green-500',
            PENDING: 'bg-yellow-500/20 text-yellow-500',
            COMPLETED: 'bg-blue-500/20 text-blue-500',
            CANCELLED: 'bg-red-500/20 text-red-500'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-500';
    };

    return (
        <Card className="w-full bg-background border-border shadow-[0_0_10px_rgba(215,178,87,0.1)]">
            <CardHeader>
                <CardTitle className="text-primary font-medium">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full bg-background">
                        <thead className="bg-hover [&_th]:border-b [&_th]:border-border last:[&_th]:border-r-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Stock</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Type</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Segment</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Status</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-primary">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentPageData().map((trade) => (
                                <tr key={trade.id} className="[&_tr]:border-b [&_tr]:border-border [&_td]:border-border last:[&_td]:border-r-0">
                                    <td className="px-6 py-3">
                                        <div>
                                            <div className="text-sm font-medium text-primary">{trade.company.stock_index}</div>
                                            <div className="text-sm text-text/60">{trade.company.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-text">{trade.trade_type.name}</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="text-sm text-text">{trade.segment.name}</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trade.status)}`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-hover">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-text/60">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, mockTrades.length)} of {mockTrades.length} trades
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="border-border text-primary hover:bg-hover"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(mockTrades.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(mockTrades.length / itemsPerPage)}
                            className="border-border text-primary hover:bg-hover"
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

