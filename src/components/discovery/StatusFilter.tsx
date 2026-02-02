"use client";

import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import type { StatusFilters } from './types';

interface StatusFilterProps {
    statusFilters?: StatusFilters;
    onStatusFiltersChange?: (filters: StatusFilters) => void;
}

const statusItems = [
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "closed", label: "Closed" },
    { id: "registered", label: "Registered" },
    { id: "bookmarked", label: "Bookmarked" }
];

export function StatusFilter({ statusFilters, onStatusFiltersChange }: StatusFilterProps) {
    const [internalStatusFilters, setInternalStatusFilters] = useState<StatusFilters>({
        upcoming: true,
        ongoing: true,
        closed: true,
        registered: true,
        bookmarked: true
    });

    const currentFilters = statusFilters || internalStatusFilters;

    return (
        <div className="space-y-3">
            <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Status</h3>
            <div className="space-y-2.5">
                {statusItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5">
                        <Checkbox
                            id={item.id}
                            className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                            checked={currentFilters[item.id as keyof StatusFilters]}
                            onCheckedChange={(checked) => {
                                const newFilters = { ...currentFilters, [item.id]: !!checked } as StatusFilters;
                                if (onStatusFiltersChange) {
                                    onStatusFiltersChange(newFilters);
                                } else {
                                    setInternalStatusFilters(newFilters);
                                }
                            }}
                        />
                        <Label
                            htmlFor={item.id}
                            className="text-xs font-normal cursor-pointer select-none text-gray-600"
                        >
                            {item.label}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
