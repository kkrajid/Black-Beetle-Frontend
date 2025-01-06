import React, { useState } from 'react';
import { Eye, MoreHorizontal, Building2, Phone, Mail, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import InstitutionDetails from './Institution-details';

const InstitutionsTable = ({ 
  institutions = [], 
  loading = false, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}) => {
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const handleViewDetails = (institution) => {
        setSelectedInstitution(institution);
        setDropdownOpen(null);
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-orange-500">Loading institutions...</div>
            </div>
        );
    }

    if (!institutions.length) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-gray-300/60">No institutions found</div>
            </div>
        );
    }

    return (
        <Card className="w-full bg-black border-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <CardHeader>
                <CardTitle className="text-orange-500 font-medium">Institutions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full bg-black">
                        <thead className="bg-neutral-800 [&_th]:border-b [&_th]:border-neutral-800 last:[&_th]:border-r-0">
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
                                <tr key={institution.id} className="[&_tr]:border-b [&_tr]:border-neutral-800 [&_td]:border-neutral-800 last:[&_td]:border-r-0 hover:bg-neutral-800">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-5 w-5 flex-shrink-0 text-gray-300/60" />
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-orange-500 truncate">{institution.name}</div>
                                                <div className="flex items-center space-x-1 text-sm text-gray-300/60">
                                                    <Globe className="h-4 w-4 flex-shrink-0" />
                                                    <a
                                                        href={institution.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-orange-500 truncate"
                                                    >
                                                        {new URL(institution.website).hostname}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-medium bg-neutral-800 rounded-full text-gray-300">
                                            {institution.code}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="min-w-0">
                                            {institution.admin ? (
                                                <>
                                                    <div className="font-medium text-orange-500 truncate">{institution.admin.name}</div>
                                                    <div className="text-sm text-gray-300/60 truncate">{institution.admin.email}</div>
                                                </>
                                            ) : (
                                                <span className="text-gray-300/60">No admin assigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col space-y-1 min-w-0">
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Mail className="h-4 w-4 flex-shrink-0 mr-1" />
                                                <span className="truncate">{institution.contact_email}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-300">
                                                <Phone className="h-4 w-4 flex-shrink-0 mr-1" />
                                                <span className="truncate">{institution.contact_phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-gray-300">
                                            {institution.active_users} / {institution.max_users}
                                        </div>
                                        <div className="mt-1 w-24 bg-neutral-800 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full"
                                                style={{
                                                    width: `${(institution.active_users / institution.max_users) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                institution.is_active
                                                    ? 'bg-green-500/20 text-green-500'
                                                    : 'bg-red-500/20 text-red-500'
                                            }`}
                                        >
                                            {institution.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDropdownOpen(dropdownOpen === institution.id ? null : institution.id)}
                                                className="text-orange-500 hover:text-orange-500/80 hover:bg-neutral-800"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                            {dropdownOpen === institution.id && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black border border-neutral-800 z-10">
                                                    <div className="py-1">
                                                        <button
                                                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800 w-full text-left"
                                                            onClick={() => handleViewDetails(institution)}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-300/60">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>

            {selectedInstitution && (
                <InstitutionDetails
                    institution={selectedInstitution}
                    onClose={() => setSelectedInstitution(null)}
                />
            )}
        </Card>
    );
};

export default InstitutionsTable;