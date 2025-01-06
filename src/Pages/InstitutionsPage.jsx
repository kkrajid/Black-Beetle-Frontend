import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions, fetchInstitutionStats, fetchInstitutionUsers } from '../utils/api/institutions';
import InstitutionStats from '../components/institutions/institution-stats';
import { InstitutionFilters } from '../components/institutions/institution-filters';
import InstitutionsTable from '../components/institutions/institutions-table';
// import {InstitutionStats} from './institutions/institution-stats';
// import { InstitutionFilters } from './institutions/institution-filters';
// import InstitutionsTable from './institutions/institutions-table';

const InstitutionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    
    // Fetch institutions with react-query
    const { data: institutionsData, isLoading: institutionsLoading } = useQuery({
        queryKey: ['institutions', searchTerm, statusFilter, currentPage],
        queryFn: () => fetchInstitutions({
          search: searchTerm,
          is_active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
          page: currentPage
        })
      });

    // Fetch stats with react-query
    const { data: statsData, isLoading: statsLoading } = useQuery({
        queryKey: ['institutionStats'],
        queryFn: fetchInstitutionStats
      });

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-4">
            {!statsLoading && statsData && <InstitutionStats stats={statsData} />}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <InstitutionFilters 
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                    />
                </div>
                <InstitutionsTable 
                    institutions={institutionsData || []}
                    loading={institutionsLoading}
                    currentPage={currentPage}
                    totalPages={Math.ceil((institutionsData?.count || 0) / 10)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default InstitutionsPage;