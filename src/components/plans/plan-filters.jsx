import { Search } from 'lucide-react'

export function PlanFilters({ onFilterChange }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search plans..."
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-8 p-2 border rounded-md"
          />
        </div>
        <select 
          onChange={(e) => onFilterChange({ duration: e.target.value })}
          className="w-[180px] p-2 border rounded-md"
        >
          <option value="">Duration</option>
          <option value="30">30 Days</option>
        </select>
      </div>
    </div>
  )
}