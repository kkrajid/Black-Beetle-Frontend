import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions,fetchInstitutionStats } from '../utils/api/institutions';
import InstitutionStats from '../components/institutions/institution-stats';
import { InstitutionFilters } from '../components/institutions/institution-filters';
import InstitutionsTable from '../components/institutions/institutions-table';

const InstitutionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const { 
        data: institutionsData, 
        isLoading: institutionsLoading,
        error: institutionsError
    } = useQuery({
        queryKey: ['institutions', searchTerm, statusFilter, currentPage],
        queryFn: () => fetchInstitutions({
            search: searchTerm,
            is_active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
            page: currentPage,
            page_size: 5
        }),
        keepPreviousData: true
    });

    const { 
        data: statsData, 
        isLoading: statsLoading,
        error: statsError 
    } = useQuery({
        queryKey: ['institutionStats'],
        queryFn: fetchInstitutionStats,
        refetchOnWindowFocus: false // Don't refetch stats when window regains focus
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    if (institutionsError) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-red-500">Error loading data</div>
            </div>
        );
    }

    const totalPages = institutionsData?.count ? Math.ceil(institutionsData.count / 3) : 0;

    return (
        <div className="flex flex-col gap-1">
            <div className="grid gap-4">
                {!statsLoading && statsData && <InstitutionStats stats={statsData} />}
            </div>

            <div className="space-y-1">
                <InstitutionFilters
                    onSearch={setSearchTerm}
                    onStatusFilter={setStatusFilter}
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                />

                <InstitutionsTable
                    institutions={institutionsData?.results || []}
                    loading={institutionsLoading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNextPage={!!institutionsData?.next}
                    hasPreviousPage={!!institutionsData?.previous}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default InstitutionsPage;