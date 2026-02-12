"use client";

import { useRouter } from "next/navigation";

import { useState, useMemo } from "react";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FilterSidebar } from "~/components/discovery/FilterSidebar";
import { Button } from "~/components/ui/button";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";
import LatestAnnouncementBanner from "~/components/delegate/announcements/LatestAnnouncementBanner";

interface MyCompetitionsClientProps {
    registeredCompetitions: any[];
    finishedCompetitions: any[];
}

export function MyCompetitionsClient({ registeredCompetitions, finishedCompetitions }: MyCompetitionsClientProps) {
    const router = useRouter();
    const [expandedSection, setExpandedSection] = useState<"registered" | "finished" | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter competitions based on search query
    const filteredRegisteredCompetitions = useMemo(() => {
        if (!searchQuery.trim()) return registeredCompetitions;
        const query = searchQuery.toLowerCase();
        return registeredCompetitions.filter(
            (comp) =>
                (comp.title?.toLowerCase() || "").includes(query) ||
                (comp.organizerName?.toLowerCase() || "").includes(query),
        );
    }, [searchQuery, registeredCompetitions]);

    const filteredFinishedCompetitions = useMemo(() => {
        if (!searchQuery.trim()) return finishedCompetitions;
        const query = searchQuery.toLowerCase();
        return finishedCompetitions.filter(
            (comp) =>
                (comp.title?.toLowerCase() || "").includes(query) ||
                (comp.organizerName?.toLowerCase() || "").includes(query),
        );
    }, [searchQuery, finishedCompetitions]);

    const toggleSection = (section: "registered" | "finished") => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };

    // Helper to render section content
    const renderSectionContent = (section: "registered" | "finished", data: any[]) => {
        const isExpanded = expandedSection === section;

        if (isExpanded) {
            return (
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        {data.map((comp) => (
                            <CompetitionCard
                                key={comp.id}
                                {...mapCompetitionToCardProps(comp, comp.isBookmarked, comp.isRegistered)}
                                variant="list"
                                onClick={() => router.push(`/c/${comp.id}`)}
                            />
                        ))}
                    </div>

                    {/* Pagination - to be implemented properly, currently visual only */}
                    {data.length > 5 && (
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="h-9 w-9 bg-[#1a1b25] hover:bg-[#2c2e3f] text-white font-medium"
                                >
                                    1
                                </Button>
                            </div>
                            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            );
        }

        // Collapsed Grid View
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.slice(0, 3).map((comp) => (
                    <CompetitionCard
                        key={comp.id}
                        {...mapCompetitionToCardProps(comp, comp.isBookmarked, comp.isRegistered)}
                        variant="grid"
                        onClick={() => router.push(`/c/${comp.id}`)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            {/* Main Layout */}
            <div className="flex-1 flex max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 gap-8">
                {/* Left Sidebar - Persistent on desktop */}
                <aside className="w-64 shrink-0 hidden lg:block">
                    <div className="sticky top-8">
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Right Content */}
                <div className="flex-1 space-y-10">
                    {/* Announcements */}
                    <LatestAnnouncementBanner />

                    {/* Search Bar */}
                    <div className="w-full">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-full border-0 bg-gray-200/50 hover:bg-gray-200/80 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-base text-gray-700 placeholder:text-muted-foreground transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        </div>
                    </div>

                    {/* Section 1: Registered Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
                                Registered Competitions
                                {searchQuery && ` (${filteredRegisteredCompetitions.length})`}
                            </h2>
                            <Button
                                variant="secondary"
                                className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm"
                                onClick={() => toggleSection("registered")}
                            >
                                {expandedSection === "registered" ? "See Less" : "See More"}
                            </Button>
                        </div>
                        {filteredRegisteredCompetitions.length > 0 ? (
                            renderSectionContent("registered", filteredRegisteredCompetitions)
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                {searchQuery
                                    ? `No registered competitions found matching "${searchQuery}"`
                                    : "You haven't registered for any competitions yet."}
                            </div>
                        )}
                    </section>

                    {/* Section 2: Finished Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
                                Finished Competitions
                                {searchQuery && ` (${filteredFinishedCompetitions.length})`}
                            </h2>
                            <Button
                                variant="secondary"
                                className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm"
                                onClick={() => toggleSection("finished")}
                            >
                                {expandedSection === "finished" ? "See Less" : "See More"}
                            </Button>
                        </div>
                        {filteredFinishedCompetitions.length > 0 ? (
                            renderSectionContent("finished", filteredFinishedCompetitions)
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                {searchQuery
                                    ? `No finished competitions found matching "${searchQuery}"`
                                    : "No finished competitions found."}
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <FooterBottom />
        </div>
    );
}
