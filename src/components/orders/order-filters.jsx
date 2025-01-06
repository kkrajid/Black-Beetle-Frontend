import React, { useState } from 'react'
import { Search } from 'lucide-react'

const OrderFilters = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('all')
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    applyFilters({ search: e.target.value })
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    applyFilters({ status: e.target.value })
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    const newRange = { ...dateRange, [name]: value }
    setDateRange(newRange)
    applyFilters({
      start_date: newRange.from,
      end_date: newRange.to
    })
  }

  const applyFilters = (newFilters) => {
    const filters = {
      search: searchTerm,
      status: status !== 'all' ? status : null,
      start_date: dateRange.from,
      end_date: dateRange.to,
      ...newFilters
    }
    console.log('Applied filters:', filters)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4  text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-md border  px-8 py-2 active:outline-none focus:outline-none"
          />
        </div>

        <select
          value={status}
          onChange={handleStatusChange}
          className="w-[180px] rounded-md border  px-3 py-2 active:outline-none focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="date"
            name="from"
            value={dateRange.from || ''}
            onChange={handleDateChange}
            className="rounded-md border px-3 py-2 active:outline-none focus:outline-none"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            name="to"
            value={dateRange.to || ''}
            onChange={handleDateChange}
            className="rounded-md border px-3 py-2 active:outline-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderFilters