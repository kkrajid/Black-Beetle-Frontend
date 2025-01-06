import { Search, Filter } from 'lucide-react'
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/Select"

export function InstitutionFilters() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300/60" />
                    <Input
                        placeholder="Search institutions..."
                        className="pl-10 pr-4 py-2 bg-black text-gray-300 border-neutral-800 focus:border-orange-500 focus:ring-orange-500"
                    />
                </div>
            </div>
            <div className="flex space-x-2">
                <Select defaultValue="all" className="w-40 bg-black text-gray-300 border-neutral-800 rounded-md focus:border-orange-500 focus:ring-orange-500">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>
            </div>
        </div>
    )
}