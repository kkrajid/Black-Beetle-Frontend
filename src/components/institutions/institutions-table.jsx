import React from 'react';
import { Eye, MoreHorizontal, Building2, Phone, Mail, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const InstitutionsTable = ({
    institutions,
    loading,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange
}) => {
    if (loading) {
        return (
            <Card className="w-full bg-black border-neutral-800">
                <CardContent>
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="text-orange-500">Loading institutions...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!institutions.length) {
        return (
            <Card className="w-full bg-black border-neutral-800">
                <CardContent>
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="text-gray-300/60">No institutions found</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-black border-neutral-800">
            <CardHeader>
                <CardTitle className="text-orange-500">Institutions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Institution</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Code</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Admin</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Contact</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Users</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-orange-500">Status</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-orange-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {institutions.map((institution) => (
                                <tr key={institution.id} className="border-b border-neutral-800 hover:bg-neutral-800">
                                    {/* Institution column */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-5 w-5 text-gray-300/60" />
                                            <div>
                                                <div className="font-medium text-orange-500">{institution.name}</div>
                                                <div className="flex items-center text-sm text-gray-300/60">
                                                    <Globe className="h-4 w-4 mr-1" />
                                                    <a href={institution.website} className="hover:text-orange-500">{new URL(institution.website).hostname}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Code column */}
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs bg-neutral-800 rounded-full text-gray-300">
                                            {institution.code}
                                        </span>
                                    </td>
                                    {/* Admin column */}
                                    <td className="px-4 py-3">
                                        {institution.admin ? (
                                            <div>
                                                <div className="text-orange-500">{institution.admin.name}</div>
                                                <div className="text-sm text-gray-300/60">{institution.admin.email}</div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-300/60">No admin assigned</span>
                                        )}
                                    </td>
                                    {/* Contact column */}
                                    <td className="px-4 py-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Mail className="h-4 w-4 mr-1" />
                                                <span>{institution.contact_email}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Phone className="h-4 w-4 mr-1" />
                                                <span>{institution.contact_phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Users column */}
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-gray-300">
                                            {institution.active_users} / {institution.max_users}
                                        </div>
                                        <div className="mt-1 w-24 bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full"
                                                style={{ width: `${(institution.active_users / institution.max_users) * 100}%` }}
                                            />
                                        </div>
                                    </td>
                                    {/* Status column */}
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            institution.is_active
                                                ? 'bg-green-500/20 text-green-500'
                                                : 'bg-red-500/20 text-red-500'
                                        }`}>
                                            {institution.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    {/* Actions column */}
                                    <td className="px-4 py-3 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-orange-500 hover:text-orange-500/80 hover:bg-neutral-800"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simplified pagination */}
                <div className="flex items-center justify-between mt-4 px-4 py-3 border-t border-neutral-800">
                    <div className="text-sm text-gray-300/60">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={!hasPreviousPage}
                            className="flex items-center justify-center border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={!hasNextPage}
                            className=" flex items-center justify-center border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstitutionsTable;