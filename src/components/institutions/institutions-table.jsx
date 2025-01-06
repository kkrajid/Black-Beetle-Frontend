import React, { useState } from 'react';
import { Eye, MoreHorizontal, Building2, Phone, Mail, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import InstitutionDetails from './Institution-details';





const InstitutionsTable= ({ 
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
                <div className="text-primary">Loading institutions...</div>
            </div>
        );
    }

    if (!institutions.length) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-text/60">No institutions found</div>
            </div>
        );
    }

    return (
        <Card className="w-full bg-background border-border shadow-[0_0_10px_rgba(215,178,87,0.1)]">
            <CardHeader>
                <CardTitle className="text-primary font-medium">Institutions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full bg-background">
                        <thead className="bg-hover [&_th]:border-b [&_th]:border-border last:[&_th]:border-r-0">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Institution</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Code</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Admin</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Contact</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Users</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-primary">Status</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-primary">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {institutions.map((institution) => (
                                <tr key={institution.id} className="[&_tr]:border-b [&_tr]:border-border [&_td]:border-border last:[&_td]:border-r-0 hover:bg-hover">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-5 w-5 flex-shrink-0 text-text/60" />
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-primary truncate">{institution.name}</div>
                                                <div className="flex items-center space-x-1 text-sm text-text/60">
                                                    <Globe className="h-4 w-4 flex-shrink-0" />
                                                    <a
                                                        href={institution.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-primary truncate"
                                                    >
                                                        {new URL(institution.website).hostname}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-medium bg-hover rounded-full text-text">
                                            {institution.code}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="min-w-0">
                                            {institution.admin ? (
                                                <>
                                                    <div className="font-medium text-primary truncate">{institution.admin.name}</div>
                                                    <div className="text-sm text-text/60 truncate">{institution.admin.email}</div>
                                                </>
                                            ) : (
                                                <span className="text-text/60">No admin assigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col space-y-1 min-w-0">
                                            <div className="flex items-center text-sm text-text">
                                                <Mail className="h-4 w-4 flex-shrink-0 mr-1" />
                                                <span className="truncate">{institution.contact_email}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-text">
                                                <Phone className="h-4 w-4 flex-shrink-0 mr-1" />
                                                <span className="truncate">{institution.contact_phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-text">
                                            {institution.active_users} / {institution.max_users}
                                        </div>
                                        <div className="mt-1 w-24 bg-hover rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
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
                                                className="text-primary hover:text-primary/80 hover:bg-hover"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                            {dropdownOpen === institution.id && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border z-10">
                                                    <div className="py-1">
                                                        <button
                                                            className="flex items-center px-4 py-2 text-sm text-text hover:bg-hover w-full text-left"
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
                    <div className="text-sm text-text/60">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="border-border text-primary hover:bg-hover"
                        >
                            {/* <ChevronLeft className="h-4 w-4 mr-1" /> */}
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="border-border text-primary hover:bg-hover"
                        >
                            Next
                            {/* <ChevronRight className="h-4 w-4 ml-1" /> */}
                        </Button>
                    </div>
                </div>
            </CardContent>

            {/* Details Modal */}
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

