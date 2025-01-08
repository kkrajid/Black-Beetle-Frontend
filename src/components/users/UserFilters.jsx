import React from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function UserFilters({ onSearchChange, onUserTypeChange, onStatusChange }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-black border border-neutral-800 rounded-sm p-3 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <Input
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full bg-black text-gray-300 border border-neutral-800 rounded-sm focus:outline-none  active:outline-none placeholder-gray-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Select
          defaultValue="all"
          className="w-full sm:w-40 bg-black text-gray-300 border border-neutral-800 rounded-sm focus:outline-none active:outline-none"
          onChange={(e) => onUserTypeChange(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="B2B_ADMIN">B2B Admins</option>
          <option value="B2B_USER">B2B Users</option>
          <option value="B2C">B2C Users</option>
        </Select>
        <Select
          defaultValue="all"
          className="w-full sm:w-40 bg-black text-gray-300 border border-neutral-800 rounded-sm focus:outline-none active:outline-none "
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option  value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </Select>
        <Button
          className="flex items-center justify-center px-3 py-2 bg-neutral-800 text-gray-300 rounded-sm focus:outline-none active:outline-none transition-colors duration-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>
  )
}

