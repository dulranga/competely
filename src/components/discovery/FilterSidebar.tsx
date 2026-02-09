"use client";

import { cn } from "~/lib/utils";
import { KeywordsFilter } from "./KeywordsFilter";
import { StatusFilter } from "./StatusFilter";
import { RegisteredSlider } from "./RegisteredSlider";
import { CategoryFilter } from "./CategoryFilter";
//import { ModeFilter } from "./ModeFilter";
import type { StatusFilters, Categories, Modes } from './types';

interface FilterSidebarProps {
    className?: string;
    registeredRange?: [number, number];
    onRegisteredRangeChange?: (range: [number, number]) => void;
    keywords?: string[];
    onKeywordsChange?: (keywords: string[]) => void;
    statusFilters?: StatusFilters;
    onStatusFiltersChange?: (filters: StatusFilters) => void;
    categories?: Categories;
    onCategoriesChange?: (categories: Categories) => void;
    modes?: Modes;
    onModesChange?: (modes: Modes) => void;
}

export function FilterSidebar({
    className,
    registeredRange,
    onRegisteredRangeChange,
    keywords,
    onKeywordsChange,
    statusFilters,
    onStatusFiltersChange,
    categories,
    onCategoriesChange,
    modes,
    onModesChange
}: FilterSidebarProps) {
    return (
        <div className={cn("w-64 shrink-0 bg-white rounded-xl shadow-sm border border-border/40 p-5 space-y-7", className)}>
            <KeywordsFilter
                keywords={keywords}
                onKeywordsChange={onKeywordsChange}
            />

            <StatusFilter
                statusFilters={statusFilters}
                onStatusFiltersChange={onStatusFiltersChange}
            />

            <RegisteredSlider
                registeredRange={registeredRange}
                onRegisteredRangeChange={onRegisteredRangeChange}
            />

            <CategoryFilter
                categories={categories}
                onCategoriesChange={onCategoriesChange}
            />

            {/* <ModeFilter
                modes={modes}
                onModesChange={onModesChange}
            /> */}
        </div>
    );
}
