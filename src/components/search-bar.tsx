import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
    return (
        <div className=" p-8">
            <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <input className=" flex-grow bg-transparent outline-none" placeholder="Search" />
                <Search />
            </div>
        </div>
    )
}