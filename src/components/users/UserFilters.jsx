import React from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function UserFilters({ onSearchChange, onUserTypeChange, onStatusChange }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-black  rounded-sm border border-[#D7B257]/20 shadow-[0_0_10px_rgba(215,178,87,0.1)]">
      <div className="flex flex-1 items-center space-x-2 ">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D7B257]" />
          <Input
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 bg-black text-[#D7B257] border-[#D7B257]/20 focus:border-[#D7B257] focus:ring-[#D7B257]/20 placeholder-[#D7B257]/50"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {/* <Button 
          variant="outline" 
          className="flex items-center bg-black text-[#D7B257] border-[#D7B257]/20 hover:bg-[#D7B257]/20 hover:text-[#D7B257]"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button> */}
      </div>
      <div className="flex space-x-2">
        <Select 
          defaultValue="all" 
          className="w-40 bg-black text-[#D7B257] border-[#D7B257]/20 focus:border-[#D7B257] focus:ring-[#D7B257]/20" 
          onChange={(e) => onUserTypeChange(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="B2B_ADMIN">B2B Admins</option>
          <option value="B2B_USER">B2B Users</option>
          <option value="B2C">B2C Users</option>
        </Select>
        <Select 
          defaultValue="all" 
          className="w-40 bg-black text-[#D7B257] border-[#D7B257]/20 focus:border-[#D7B257] focus:ring-[#D7B257]/20" 
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </Select>
      </div>
    </div>
  )
}

