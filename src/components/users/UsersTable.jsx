import React, { useState, useEffect } from 'react'
import { Eye, MoreHorizontal, Shield, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { fetchUsers, updateUserAction } from '../../utils/api'
import { toast } from 'react-hot-toast'

export function UsersTable({ searchTerm, userType, status }) {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updatingUsers, setUpdatingUsers] = useState({})

  const loadUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchUsers(currentPage, searchTerm, userType, status)
      setUsers(data.results)
      setTotalPages(Math.ceil(data.count / 5))
    } catch (error) {
      setError('Failed to fetch users. Please try again later.')
      toast.error('Failed to fetch users')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [currentPage, searchTerm, userType, status])

  const handleToggle = async (userId, action) => {
    setUpdatingUsers(prev => ({ ...prev, [userId]: true }))
    
    try {
      const response = await updateUserAction(userId, action)
      console.log('Toggle response:', response)
      
      if (response.status === 'success') {
        setUsers(users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              is_active: action === 'toggle_active' ? response.is_active : user.is_active,
              is_verified: action === 'toggle_verified' ? response.is_verified : user.is_verified
            }
          }
          return user
        }))
        
        const actionType = action === 'toggle_active' ? 'status' : 'verification'
        const newState = action === 'toggle_active' ? response.is_active : response.is_verified
        toast.success(`User ${actionType} ${newState ? 'enabled' : 'disabled'} successfully`)
        
        loadUsers()
      }
    } catch (error) {
      console.error('Toggle error:', error)
      toast.error(`Failed to update user. Please try again.`)
    } finally {
      setUpdatingUsers(prev => ({ ...prev, [userId]: false }))
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-green-500/20 text-green-500',
      INACTIVE: 'bg-red-500/20 text-red-500',
      VERIFIED: 'bg-blue-500/20 text-blue-500',
      UNVERIFIED: 'bg-yellow-500/20 text-yellow-500'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-500'
  }

  if (isLoading) {
    return <div className="text-primary">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!users || users.length === 0) {
    return <div className="text-text/60">No users found.</div>
  }

  return (
    <Card className="w-full bg-background border-border shadow-[0_0_10px_rgba(215,178,87,0.1)]">
      <CardHeader>
        <CardTitle className="text-primary font-medium">Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full bg-background">
            <thead className="bg-hover [&_th]:border-b [&_th]:border-border last:[&_th]:border-r-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Institution</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Verification</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-primary">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const {
                  id = '',
                  first_name = '',
                  last_name = '',
                  email = '',
                  user_type = '',
                  phone_number = '',
                  is_verified = false,
                  is_active = false,
                  institution = null
                } = user;

                const fullName = `${first_name} ${last_name}`.trim();
                const institutionName = institution?.name || 'N/A';
                const isUpdating = updatingUsers[id] || false;

                return (
                  <tr key={id} className={`[&_tr]:border-b [&_tr]:border-border [&_td]:border-border last:[&_td]:border-r-0 ${isUpdating ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {user_type === "B2B_ADMIN" ? (
                          <Shield className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-text/60" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-primary">{fullName}</div>
                          <div className="text-sm text-text/60">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user_type)}`}>
                        {user_type ? user_type.replace("_", " ") : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-text">{institutionName}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-text">{phone_number}</span>
                    </td>
                    <td className="px-6 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={is_verified}
                          disabled={isUpdating}
                          onChange={() => handleToggle(id, 'toggle_verified')}
                        />
                        <div className={`w-11 h-6 bg-hover peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/50 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}></div>
                      </label>
                    </td>
                    <td className="px-6 py-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={is_active}
                          disabled={isUpdating}
                          onChange={() => handleToggle(id, 'toggle_active')}
                        />
                        <div className={`w-11 h-6 bg-hover peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/50 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}></div>
                      </label>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-hover">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-text/60">
            Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, users.length)} of {users.length} users
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-border text-primary hover:bg-hover"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

