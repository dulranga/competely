"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    onSearch?: (query: string) => void;
    redirectToDiscover?: boolean;
}

export function SearchBar({ 
    placeholder = "Search competitions...", 
    className,
    onSearch,
    redirectToDiscover = false 
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            if (onSearch) {
                onSearch(query);
            }
            if (redirectToDiscover) {
                // In a real app, check auth status and redirect accordingly
                router.push(`/discover?q=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("relative", className)}>
            <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-12 pl-12 pr-4 rounded-lg border border-input bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>
        </form>
    );
}
