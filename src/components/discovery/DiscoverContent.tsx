"use client";

import {
    Brain,
    Code2,
    Feather,
    Gamepad2,
    Globe2,
    LineChart,
    Mic2,
    MonitorSmartphone,
    Music2,
    Search,
    ShieldCheck,
    User,
    Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FilterSidebar } from "~/components/discovery/FilterSidebar";
import { TopicCard } from "~/components/discovery/TopicCard";
import { Button } from "~/components/ui/button";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";
import { cn } from "~/lib/utils";
import { DEFAULT_FILTERS, filterCompetitions } from "./filterUtils";
import type { FilterState } from "./types";
import competitionsData from "~/components/sample-data/competitions.json";
import topicsData from "~/components/sample-data/topics.json";

// Map icon names to components
const iconMap: Record<string, any> = {
    Brain,
    Code2,
    Gamepad2,
    LineChart,
    Mic2,
    MonitorSmartphone,
    Music2,
    Search,
    ShieldCheck,
    User,
    Wrench,
    Globe2,
    Feather,
    ShapesIcon: ShapesIcon, // Custom icon
};

interface DiscoverContentProps {
    isAuthenticated: boolean;
    initialCompetitions?: any[];
    initialSearchQuery?: string;
    initialKeywords?: string[];
    bookmarkStatuses?: Map<string, boolean>;
    registrationStatuses?: Map<string, boolean>;
    bookmarkCount?: number;
}

export function DiscoverContent({
    isAuthenticated,
    initialCompetitions = [],
    initialSearchQuery = "",
    initialKeywords = [],
    bookmarkStatuses = new Map(),
    registrationStatuses = new Map(),
    bookmarkCount = 0,
}: DiscoverContentProps) {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(!!initialSearchQuery || (initialKeywords && initialKeywords.length > 0));
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedTopic, setSelectedTopic] = useState<string>("");

    // Pagination state for infinite scroll
    const [visibleCount, setVisibleCount] = useState(12);

    // Filter states - using the default filters as initial values
    const [filters, setFilters] = useState<FilterState>({
        ...DEFAULT_FILTERS,
        keywords: initialKeywords
    });

    // Debug log whenever filters change
    console.log('Current filters state:', filters);

    const handleSearch = () => {
        // Reset visible count on new search
        setVisibleCount(12);

        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set("q", searchQuery.trim());
        }

        if (filters.keywords.length > 0) {
            params.set("keywords", filters.keywords.join((",")));
        }

        const queryString = params.toString();

        if (queryString) {
            setIsSearching(true);
            router.push(`/discover?${queryString}`);
        } else {
            setIsSearching(false);
            router.push("/discover");
        }
    };

    // Helper to update URL with new filters
    const updateFilters = (newFilters: FilterState) => {
        setFilters(newFilters);
        // Reset visible count on filter change
        setVisibleCount(12);

        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set("q", searchQuery.trim());
        }

        if (newFilters.keywords.length > 0) {
            params.set("keywords", newFilters.keywords.join(","));
        }

        const queryString = params.toString();
        if (queryString) {
            router.push(`/discover?${queryString}`);
        } else {
            router.push("/discover");
        }
    };

    const handleTopicClick = (keywords: string[], topicTitle: string) => {
        // Keep search bar clear, only apply keywords to filters
        setSearchQuery("");
        setSelectedTopic(topicTitle);
        setIsSearching(true);
        // Update filter keywords
        updateFilters({ ...filters, keywords });
        // visibleCount is reset inside updateFilters
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Filter competitions using the utility function - use sample data if no real data
    const competitionsToFilter = initialCompetitions.length > 0 ? initialCompetitions : competitionsData;
    const filteredCompetitions = filterCompetitions(competitionsToFilter, filters);

    // Slice competitions for infinite scroll
    const displayedCompetitions = filteredCompetitions.slice(0, visibleCount);

    // Check if there are more competitions to load
    const hasMore = visibleCount < filteredCompetitions.length;

    // Load more competitions
    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    // Ref for the sentinel element (intersection observer target)
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Setup IntersectionObserver for infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // If sentinel is visible and there are more items to load
                if (entries[0]?.isIntersecting && hasMore) {
                    loadMore();
                }
            },
            {
                root: null, // viewport
                rootMargin: "100px", // trigger 100px before reaching bottom
                threshold: 0.1,
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [hasMore, visibleCount]); // Re-run when hasMore or visibleCount changes

    console.log("DiscoverContent state:", {
        filterKeywords: filters.keywords,
        initialCompetitionsCount: initialCompetitions.length,
        usingTestData: initialCompetitions.length === 0,
        filteredCount: filteredCompetitions.length,
    }); // Debug log

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <div className="flex-1 pb-20">
                {/* Search Header - Only visible to authenticated users */}
                {isAuthenticated && (
                    <div className="pt-8 pb-10 px-4">
                        <div className="max-w-3xl mx-auto relative">
                            <div className="relative">
                                <Input
                                    className="w-full h-12 pl-6 pr-12 rounded-full border-0 bg-gray-200/50 hover:bg-gray-200/80 focus-visible:ring-1 focus-visible:ring-primary shadow-inner text-base"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                    onClick={handleSearch}
                                >
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className={cn("max-w-[1400px] mx-auto px-4 md:px-8", !isAuthenticated && "pt-12")}>
                    {/* VIEW 1: EXPLORE TOPICS (Initial State) */}
                    {!isSearching && (
                        <div className="space-y-16 animate-in fade-in duration-500">
                            {/* Topics Grid */}
                            <section className="space-y-8">
                                <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1a1a1a]">
                                    Explore Topics
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {topicsData.map((topic, index) => {
                                        const IconComponent = iconMap[topic.icon] || Search;
                                        return (
                                            <TopicCard
                                                key={index}
                                                title={topic.title}
                                                description={topic.description}
                                                keywords={topic.keywords}
                                                icon={IconComponent}
                                                colorClass={topic.colorClass}
                                                onClick={() => handleTopicClick(topic.keywords || [], topic.title)}
                                            />
                                        );
                                    })}
                                </div>
                            </section>


                        </div>
                    )}

                    {/* VIEW 2: SEARCH RESULTS (Filtered View) */}
                    {isSearching && (
                        <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Sidebar */}
                            <aside className="lg:w-64 shrink-0 hidden lg:block">
                                <div className="sticky top-8">
                                    <h3 className="font-bold mb-4 text-xl">Filters</h3>
                                    <FilterSidebar
                                        registeredRange={filters.registeredRange}
                                        onRegisteredRangeChange={(range) =>
                                            updateFilters({ ...filters, registeredRange: range })
                                        }
                                        keywords={filters.keywords}
                                        onKeywordsChange={(keywords) => {
                                            console.log("Keywords changed in sidebar:", keywords);
                                            updateFilters({ ...filters, keywords });
                                        }}
                                        statusFilters={filters.statusFilters}
                                        onStatusFiltersChange={(statusFilters) =>
                                            updateFilters({ ...filters, statusFilters })
                                        }
                                        categories={filters.categories}
                                        onCategoriesChange={(categories) => updateFilters({ ...filters, categories })}
                                        modes={filters.modes}
                                        onModesChange={(modes) => updateFilters({ ...filters, modes })}
                                    />
                                </div>
                            </aside>

                            {/* Mobile Filter Toggle (Visible only on small screens) */}
                            <div className="lg:hidden mb-4">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            Filters
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                                        <SheetTitle className="sr-only">Filters</SheetTitle>
                                        <SheetDescription className="sr-only">Filter competitions</SheetDescription>
                                        <div className="mt-6">
                                            <FilterSidebar
                                                className="w-full border-0 shadow-none p-0"
                                                registeredRange={filters.registeredRange}
                                                onRegisteredRangeChange={(range) =>
                                                    updateFilters({ ...filters, registeredRange: range })
                                                }
                                                keywords={filters.keywords}
                                                onKeywordsChange={(keywords) => {
                                                    console.log("Keywords changed in mobile sidebar:", keywords);
                                                    updateFilters({ ...filters, keywords });
                                                }}
                                                statusFilters={filters.statusFilters}
                                                onStatusFiltersChange={(statusFilters) =>
                                                    updateFilters({ ...filters, statusFilters })
                                                }
                                                categories={filters.categories}
                                                onCategoriesChange={(categories) =>
                                                    updateFilters({ ...filters, categories })
                                                }
                                                modes={filters.modes}
                                                onModesChange={(modes) => updateFilters({ ...filters, modes })}
                                            />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            {/* Results Grid */}
                            <div className="flex-1">
                                {displayedCompetitions.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                            {displayedCompetitions.map((comp) => (
                                                <CompetitionCard
                                                    key={comp.id}
                                                    {...mapCompetitionToCardProps(
                                                        comp,
                                                        bookmarkStatuses.get(comp.id) || false,
                                                        registrationStatuses.get(comp.id) || false,
                                                    )}
                                                    onClick={() => router.push(`/c/${comp.id}`)}
                                                />
                                            ))}
                                        </div>

                                        {/* Infinite Scroll Sentinel */}
                                        <div ref={sentinelRef} className="h-4" />

                                        {/* Loading Indicator */}
                                        {hasMore && (
                                            <div className="flex justify-center items-center py-8">
                                                <div className="text-sm text-muted-foreground">Loading more...</div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-xl text-muted-foreground">
                                            No competitions found{" "}
                                            {selectedTopic
                                                ? `for "${selectedTopic}"`
                                                : searchQuery
                                                    ? `matching "${searchQuery}"`
                                                    : ""}
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedTopic("");
                                                setIsSearching(false);
                                                router.push("/discover");
                                            }}
                                            className="mt-4"
                                        >
                                            Clear search
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FooterBottom />
        </div>
    );
}

// Custom Icon for 'Design' since standard Shapes might not match perfectly
function ShapesIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <circle cx="17.5" cy="17.5" r="3.5" />
        </svg>
    );
}
