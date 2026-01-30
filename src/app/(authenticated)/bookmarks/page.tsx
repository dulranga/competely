"use client";

import { CompetitionCard } from "~/components/public/CompetitionCard";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Button } from "~/components/ui/button";

export default function BookmarksPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            {/* Header - passing current path to visually highlight 'Bookmarks' */}
            <HeaderAuthenticated currentPath="/bookmarks" />

            <div className="flex-1 max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 space-y-8">
                {/* 
                  The screenshot doesn't explicitly show a page title like "Your Bookmarks", 
                  but it starts immediately with the grid. I'll stick to the grid.
                  If the user wanted a title I could add one, but sticking to screenshot for now.
                */}

                {/* Bookmarks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Populating with mock data similar to reference */}

                    {/* Cards - Row 1 */}
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                    />
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                    />
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                    />
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                    />

                    {/* Cards - Row 2 */}
                    <CompetitionCard
                        title="Dev Vanguard"
                        status="Registered"
                        imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                        category="Open Category"
                        registeredCount={74}
                        deadline="Registration closed"
                        organizerName="Game dev club"
                    />
                    <CompetitionCard
                        title="Dev Vanguard"
                        status="Registered"
                        imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                        category="Open Category"
                        registeredCount={74}
                        deadline="Registration closed"
                        organizerName="Game dev club"
                    />
                    <CompetitionCard
                        title="Dev Vanguard"
                        status="Registered"
                        imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                        category="Open Category"
                        registeredCount={74}
                        deadline="Registration closed"
                        organizerName="Game dev club"
                    />
                    <CompetitionCard
                        title="Dev Vanguard"
                        status="Registered"
                        imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                        category="Open Category"
                        registeredCount={74}
                        deadline="Registration closed"
                        organizerName="Game dev club"
                    />

                    {/* Cards - Row 3 */}
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                    />
                    <CompetitionCard
                        title="HackExtreme"
                        status="Ongoing"
                        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                        deadline="Jan 17, 2026 (deadline)"
                        location="Lyceum College, Nugegoda."
                        registeredCount={74}
                        category="School Category"
                        organizerName="Hack dev Club"
                        isBookmarked={true} // Highlighting active state for verify
                    />
                </div>
            </div>

            <FooterBottom />
        </div>
    );
}
