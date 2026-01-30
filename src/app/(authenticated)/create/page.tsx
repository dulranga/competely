"use client";

import { useState } from "react";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { MyCompetitionCard, CompetitionRole } from "~/components/create/MyCompetitionCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { LayoutGrid, List, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { cn } from "~/lib/utils";

// Mock Data
const myCompetitions = [
    { id: 1, name: "Competition Name", role: "Role", imageUrl: "/api/placeholder/400/400" }, // Placeholder logic handled by component or passed url
    // For realistic images, using Unsplash
    {
        id: 1,
        name: "Cyber Sentinel 2026",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "AI Visionary Hack",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Game Jam Pro",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Design Sprint X",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Code Master 2026",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Data Science Cup",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Robotics Challenge",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "IoT Innovation",
        role: "Owner",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
] as const;

export default function CreatePage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <HeaderAuthenticated currentPath="/create" />

            <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 space-y-10">

                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    {/* Search - Gray Style */}
                    <div className="relative w-full md:max-w-xl">
                        <Input
                            className="w-full h-11 pl-11 pr-4 rounded-lg border-0 bg-gray-200/60 focus:bg-white transition-colors placeholder:text-muted-foreground"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none bg-[#1a1b25] hover:bg-[#2c2e3f] text-white">
                            New Competition
                        </Button>
                        <Button className="flex-1 md:flex-none bg-[#1a1b25] hover:bg-[#2c2e3f] text-white">
                            Join
                        </Button>
                    </div>
                </div>

                {/* Content Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-3xl font-bold text-[#1a1b25]">
                        My Competitions
                    </h1>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8 hover:bg-transparent", viewMode === "grid" ? "text-foreground" : "text-muted-foreground")}
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-8 w-8 hover:bg-transparent", viewMode === "list" ? "text-foreground" : "text-muted-foreground")}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Content Grid/List */}
                {/* 
                    Using a container background similar to screenshot 
                    Screenshot shows a large beige-ish card container wrapping the grid?
                    Actually it looks like the page background is white/beige and there is a large card container 
                    around the grid. I'll add a subtle background container.
                */}
                <div className="bg-[#fcf8f6] rounded-3xl p-6 md:p-10 min-h-[500px]">
                    <div className={cn(
                        viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "flex flex-col gap-4"
                    )}>
                        {myCompetitions.map((comp) => (
                            <MyCompetitionCard
                                key={comp.id}
                                name={comp.name}
                                role={comp.role as CompetitionRole}
                                imageUrl={comp.imageUrl}
                                variant={viewMode}
                            />
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 pt-4 pb-12">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="default" size="icon" className="h-9 w-9 bg-[#1a1b25] hover:bg-[#2c2e3f] text-white font-medium">1</Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">2</Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">3</Button>
                        <span className="text-muted-foreground px-2">...</span>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">7</Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-gray-100 font-medium">8</Button>
                    </div>
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

            </main>
            <FooterBottom />
        </div>
    );
}
