import React, { useState } from 'react';
import { UserStats } from '../components/users/UserStats';
import { UsersTable } from '../components/users/UsersTable';
import { UserFilters } from '../components/users/UserFilters';
import AddAdminDialog from '../components/users/AddAdminDialog';


const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [userType, setUserType] = useState('all')
    const [status, setStatus] = useState('all')

    return (
        <div className="flex flex-col gap-4">

            <UserStats />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <UserFilters 
                        onSearchChange={setSearchTerm}
                        onUserTypeChange={setUserType}
                        onStatusChange={setStatus}
                    />
                    <AddAdminDialog />
                </div>
                <UsersTable 
                    searchTerm={searchTerm}
                    userType={userType}
                    status={status}
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* <VerificationRequests />
        <RecentActivity /> */}
            </div>
        </div>
    );
}

export default UsersPage;
