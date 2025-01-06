import React from 'react';
import { MoreHorizontal, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const SubscriptionTable = ({ currentItems, currentPage, totalPages, indexOfFirstItem, indexOfLastItem, totalItems, onPageChange }) => {
  const NoDataMessage = () => (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="rounded-full bg-neutral-800 w-12 h-12 flex items-center justify-center mb-4">
        <Calendar className="h-6 w-6 text-orange-500" />
      </div>
      <h3 className="text-lg font-medium text-orange-500 mb-1">No Subscriptions Found</h3>
      <p className="text-sm text-gray-300/60 text-center">There are no subscriptions to display at this time.</p>
    </div>
  );

  if (!currentItems?.length) return <NoDataMessage />;

  return (
    <Card className="w-full bg-black border-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <CardHeader>
        <CardTitle className="text-orange-500 font-medium">Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-800 [&_th]:border-b [&_th]:border-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">User</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Start Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">End Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-orange-500">Auto Renew</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-orange-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(sub => (
                <tr key={sub.id} className="[&_tr]:border-b [&_tr]:border-neutral-800 [&_td]:border-neutral-800 last:[&_td]:border-r-0">
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-orange-500">{sub.user.name}</div>
                    <div className="text-sm text-gray-300/60">{sub.user.phone}</div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-orange-500">{sub.plan.name}</div>
                    <div className="text-sm text-gray-300/60">{sub.plan.code}</div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-300">{sub.start_date}</td>
                  <td className="px-6 py-3 text-sm text-gray-300">{sub.end_date}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      sub.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {sub.is_active ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      sub.auto_renew ? 'bg-orange-500/20 text-orange-500' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {sub.auto_renew ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-orange-500 hover:text-orange-400 hover:bg-neutral-800 p-2 rounded">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-300/60">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="border border-neutral-800 text-orange-500 hover:bg-neutral-800 px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === index + 1 
                    ? 'bg-orange-500 text-white' 
                    : 'border border-neutral-800 text-orange-500 hover:bg-neutral-800'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border border-neutral-800 text-orange-500 hover:bg-neutral-800 px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTable;