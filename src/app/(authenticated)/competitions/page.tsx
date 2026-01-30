"use client";

import { CompetitionCard } from "~/components/public/CompetitionCard";
import { FilterSidebar } from "~/components/public/FilterSidebar";
import { Button } from "~/components/ui/button";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { SearchBar } from "~/components/ui/search-bar";

export default function CompetitionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            {/* Header */}
            <HeaderAuthenticated currentPath="/competitions" />

            {/* Main Layout */}
            <div className="flex-1 flex max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 gap-8">

                {/* Left Sidebar - Persistent on desktop */}
                <aside className="w-64 shrink-0 hidden lg:block">
                    <div className="sticky top-8">
                        {/* 
                            Passing className to override default shadows/borders if needed to match screenshot exactly, 
                            but screenshot shows white card style which sidebar already has.
                        */}
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Right Content */}
                <div className="flex-1 space-y-10">

                    {/* Search Bar - Top Centered relative to content */}
                    {/* Using a max-width container to restrict it a bit like in screenshot if needed, or full width */}
                    <div className="w-full">
                        {/* SearchBar component has internal max-width logic or styles. 
                             Screenshot shows a gray rounded bar. Existing SearchBar is white/transparent with border.
                             I might need to style it to gray.
                         */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full h-12 pl-12 pr-4 rounded-full border-0 bg-gray-200/50 hover:bg-gray-200/80 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-base text-gray-700 placeholder:text-muted-foreground transition-all"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                    </div>

                    {/* Section 1: Registered Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Registered Competitions</h2>
                            <Button variant="secondary" className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm">
                                See More
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Attempting to emulate "Registered" badge style by passing status. 
                                 The screenshot shows a green badge "Registered". 
                                 CompetitionCard supports status text.
                             */}
                            <CompetitionCard
                                title="Dev Vanguard"
                                status="Registered"
                                imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                                category="Open Category"
                                registeredCount={74}
                                deadline="Registration closed"
                                organizerName="Game dev club"
                                isBookmarked={false}
                            />
                            <CompetitionCard
                                title="Dev Vanguard"
                                status="Registered"
                                imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                                category="Open Category"
                                registeredCount={74}
                                deadline="Registration closed"
                                organizerName="Game dev club"
                                isBookmarked={false}
                            />
                            <CompetitionCard
                                title="Dev Vanguard"
                                status="Registered"
                                imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                                category="Open Category"
                                registeredCount={74}
                                deadline="Registration closed"
                                organizerName="Game dev club"
                                isBookmarked={false}
                            />
                        </div>
                    </section>

                    {/* Section 2: Finished Competitions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Finished Competitions</h2>
                            <Button variant="secondary" className="bg-[#5a6270] text-white hover:bg-[#484f5b] h-9 px-4 text-sm font-medium rounded-md shadow-sm">
                                See More
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CompetitionCard
                                title="HackExtreme"
                                status="Finished" // Or "Ended"
                                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                category="School Category"
                                registeredCount={74}
                                deadline="Jan 17, 2026 (deadline)"
                                organizerName="Hack dev Club"
                                isBookmarked={false}
                            />
                            <CompetitionCard
                                title="HackExtreme"
                                status="Finished"
                                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                category="School Category"
                                registeredCount={74}
                                deadline="Jan 17, 2026 (deadline)"
                                organizerName="Hack dev Club"
                                isBookmarked={false}
                            />
                            <CompetitionCard
                                title="HackExtreme"
                                status="Finished"
                                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                category="School Category"
                                registeredCount={74}
                                deadline="Jan 17, 2026 (deadline)"
                                organizerName="Hack dev Club"
                                isBookmarked={false}
                            />
                        </div>
                    </section>

                </div>
            </div>

            <FooterBottom />
        </div>
    );
}
