"use client";

import { useState } from "react";
import { CompetitionCard, CompetitionStatus } from "~/components/discovery/CompetitionCard";
import { FilterSidebar } from "~/components/discovery/FilterSidebar";
import { Button } from "~/components/ui/button";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { SearchBar } from "~/components/ui/search-bar";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function CompetitionsPage() {
    const [expandedSection, setExpandedSection] = useState<"registered" | "finished" | null>(null);

    // Mock Data for demonstration
    // Defining interface for consistent usage
    interface MockCompetition {
        id: string;
        title: string;
        status: CompetitionStatus;
        imageUrl: string;
        category: string;
        registeredCount: number;
        deadline: string;
        organizerName: string;
    }

    const registeredCompetitions: MockCompetition[] = Array.from({ length: 12 }).map((_, i) => ({
        id: `reg-${i}`,
        title: "Dev Vanguard",
        status: "Registered",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        category: "Open Category",
        registeredCount: 74,
        deadline: "Registration closed",
        organizerName: "Game dev club"
    }));

    const finishedCompetitions: MockCompetition[] = Array.from({ length: 12 }).map((_, i) => ({
        id: `fin-${i}`,
        title: "HackExtreme",
        status: "Finished",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        category: "School Category",
        registeredCount: 74,
        deadline: "Jan 17, 2026 (deadline)",
        organizerName: "Hack dev Club"
    }));

    const toggleSection = (section: "registered" | "finished") => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };

    // Helper to render section content
    const renderSectionContent = (section: "registered" | "finished", data: MockCompetition[]) => {
        const isExpanded = expandedSection === section;

        // If expanded, show all (paginated view logic would go here, showing first page of many)
        // For simplicity in this step, showing a larger list in row variant.
        // If collapsed, show top 3 in grid variant.

        if (isExpanded) {
            return (
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        {data.map((comp) => (
                            <CompetitionCard
                                key={comp.id}
                                {...comp}
                                variant="list"
                                isBookmarked={false}
                            />
                        ))}
                    </div>

                    {/* Pagination - Reuse logic/style from Create Page */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button variant="default" size="icon" className="h-9 w-9 bg-[#1a1b25] hover:bg-[#2c2e3f] text-white font-medium">1</Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">2</Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">3</Button>
                        </div>
                        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            );
        }

        // Collapsed Grid View
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.slice(0, 3).map((comp) => (
                    <CompetitionCard
                        key={comp.id}
                        {...comp}
                        variant="grid"
                        isBookmarked={false}
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

                    {/* Search Bar */}
                    <div className="w-full">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full h-12 pl-12 pr-4 rounded-full border-0 bg-gray-200/50 hover:bg-gray-200/80 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-base text-gray-700 placeholder:text-muted-foreground transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        </div>
                    </div>

                    {/* Section 1: Registered Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Registered Competitions</h2>
                            <Button
                                variant="secondary"
                                className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm"
                                onClick={() => toggleSection("registered")}
                            >
                                {expandedSection === "registered" ? "See Less" : "See More"}
                            </Button>
                        </div>
                        {renderSectionContent("registered", registeredCompetitions)}
                    </section>

                    {/* Section 2: Finished Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Finished Competitions</h2>
                            <Button
                                variant="secondary"
                                className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm"
                                onClick={() => toggleSection("finished")}
                            >
                                {expandedSection === "finished" ? "See Less" : "See More"}
                            </Button>
                        </div>
                        {renderSectionContent("finished", finishedCompetitions)}
                    </section>

                </div>
            </div>

            <FooterBottom />
        </div>
    );
}
