import React, { useState, useEffect } from 'react';
import { UserStats } from '../components/users/UserStats';
import { UsersTable } from '../components/users/UsersTable';
import { UserFilters } from '../components/users/UserFilters';
import AddAdminDialog from '../components/users/AddAdminDialog';
import { fetchUsers, fetchUserStats, updateUserAction } from '../utils/api/institutions';
import { toast } from 'react-hot-toast';
import UsersLoading from '../components/users/users-loading';

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userType, setUserType] = useState('all');
    const [status, setStatus] = useState('all');
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updatingUsers, setUpdatingUsers] = useState({});

    const [loading, setLoading] = useState(true);



    // Fetch user statistics
    const loadStats = async () => {
        try {
            const data = await fetchUserStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
            toast.error('Failed to load user statistics');
        }
    };

    // Fetch users data
    const loadUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUsers(currentPage, searchTerm, userType, status);
            setUsers(data.results);
            setTotalPages(Math.ceil(data.count / 5));
        } catch (error) {
            setError('Failed to fetch users. Please try again later.');
            toast.error('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user action toggles (active/verified status)
    const handleToggle = async (userId, action) => {
        setUpdatingUsers(prev => ({ ...prev, [userId]: true }));

        try {
            const response = await updateUserAction(userId, action);
            if (response.status === 'success') {
                setUsers(users.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            is_active: action === 'toggle_active' ? response.is_active : user.is_active,
                            is_verified: action === 'toggle_verified' ? response.is_verified : user.is_verified
                        };
                    }
                    return user;
                }));

                const actionType = action === 'toggle_active' ? 'status' : 'verification';
                const newState = action === 'toggle_active' ? response.is_active : response.is_verified;
                toast.success(`User ${actionType} ${newState ? 'enabled' : 'disabled'} successfully`);

                // Refresh both users and stats after successful toggle
                loadUsers();
                loadStats();
            }
        } catch (error) {
            toast.error('Failed to update user. Please try again.');
        } finally {
            setUpdatingUsers(prev => ({ ...prev, [userId]: false }));
        }
    };

    // Load initial data
    useEffect(() => {
        loadStats();
        setTimeout(() => setLoading(false), 1500);
    }, []);

    // Reload users when filters or pagination changes
    useEffect(() => {
        loadUsers();
    }, [currentPage, searchTerm, userType, status]);

    // Handle successful admin creation
    const handleAdminCreated = () => {
        loadUsers();
        loadStats();
        toast.success('Admin created successfully');
    };

    if (loading) return <UsersLoading />;

    return (
        <div className="flex flex-col gap-4">
            <UserStats stats={stats} />
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <UserFilters
                        onSearchChange={setSearchTerm}
                        onUserTypeChange={setUserType}
                        onStatusChange={setStatus}
                    />
                    <AddAdminDialog onSuccess={handleAdminCreated} />
                </div>
                <UsersTable
                    users={users}
                    isLoading={isLoading}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    updatingUsers={updatingUsers}
                    onPageChange={setCurrentPage}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    );
};

export default UsersPage;