import React, { useState, useCallback } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useMemo } from 'react';

export function InstitutionFilters({ onSearch, onStatusFilter, searchTerm: externalSearchTerm, statusFilter }) {
    // Local state to handle immediate input changes
    const [localSearchTerm, setLocalSearchTerm] = useState(externalSearchTerm);

    // Debounced search handler
    const debouncedSearch = useCallback(
        useMemo(
            () => {
                let timeoutId;
                return (value) => {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        onSearch(value);
                    }, 500); // 500ms delay
                };
            },
            [onSearch]
        ),
        []
    );

    // Handle input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value); // Update local state immediately
        debouncedSearch(value); // Trigger debounced search
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 rounded-lg">
            {/* Left side - Search */}
            <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300/60" />
                    <Input
                        value={localSearchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name, code or email..."
                        className="pl-10 pr-4 py-2 bg-black text-gray-300 border border-neutral-700"
                    />
                </div>
                
                {/* Status Filter Buttons */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-black rounded-lg p-1 border border-neutral-800">
                        <Button
                            onClick={() => onStatusFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                statusFilter === 'all' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-transparent text-gray-300 hover:text-orange-500'
                            }`}
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => onStatusFilter('active')}
                            className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                statusFilter === 'active' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-transparent text-gray-300 hover:text-orange-500'
                            }`}
                        >
                            Active
                        </Button>
                        <Button
                            onClick={() => onStatusFilter('inactive')}
                            className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                statusFilter === 'inactive' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-transparent text-gray-300 hover:text-orange-500'
                            }`}
                        >
                            Inactive
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right side - Filter icon */}
            <div className="flex items-center">
                <Button
                    variant="outline"
                    size="icon"
                    className="border-neutral-800 text-orange-500 hover:bg-neutral-800"
                >
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}