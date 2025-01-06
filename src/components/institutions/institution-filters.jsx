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
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/60" />
                    <Input
                        placeholder="Search institutions..."
                        className="pl-10 pr-4 py-2 bg-background text-text border-border focus:border-primary focus:ring-primary"
                    />
                </div>
                {/* <Button variant="outline" className="flex items-center border-border text-primary hover:bg-hover">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button> */}
            </div>
            <div className="flex space-x-2">
                {/* <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] border-border text-text bg-background">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                        <SelectItem value="all" className="text-text hover:bg-hover">All Status</SelectItem>
                        <SelectItem value="active" className="text-text hover:bg-hover">Active</SelectItem>
                        <SelectItem value="inactive" className="text-text hover:bg-hover">Inactive</SelectItem>
                    </SelectContent>
                </Select> */}
                <Select defaultValue="all" className="w-40">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>
            </div>
        </div>
    )
}

