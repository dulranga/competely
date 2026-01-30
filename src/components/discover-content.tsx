"use client";

import { Brain, Code2, Gamepad2, LineChart, Mic2, MonitorSmartphone, Music2, Search, ShieldCheck, User, Wrench, Globe2, Feather } from "lucide-react";
import { useState } from "react";
import { CompetitionCard } from "~/components/public/CompetitionCard";
import { FilterSidebar } from "~/components/public/FilterSidebar";
import { TopicCard } from "~/components/public/TopicCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { HeaderPublic } from "~/components/ui/header-public";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { cn } from "~/lib/utils";

interface DiscoverContentProps {
    isAuthenticated: boolean;
}

export function DiscoverContent({ isAuthenticated }: DiscoverContentProps) {
    // State to toggle between "Explore Topics" and "Search Results" view
    // In a real app, this would likely be driven by URL search params (?q=...)
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    };

    const handleTopicClick = () => {
        setIsSearching(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            {isAuthenticated ? (
                <HeaderAuthenticated currentPath="/discover" />
            ) : (
                <HeaderPublic />
            )}

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
                                <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1a1a1a]">Explore Topics</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <TopicCard
                                        title="AI & ML"
                                        description={["Artificial Intelligence", "Machine Learning", "Computer Vision"]}
                                        icon={Brain}
                                        colorClass="bg-gradient-to-br from-[#e9a5a5] to-[#e08e8e]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Software Development"
                                        description={["Web Development", "Mobile App Development", "SaaS"]}
                                        icon={Code2}
                                        colorClass="bg-gradient-to-br from-[#a79de9] to-[#9286e0]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Immersive & Interactive Media"
                                        description={["Game Development", "3D Simulation & Design", "VR & AR"]}
                                        icon={Gamepad2}
                                        colorClass="bg-gradient-to-br from-[#7bbbd6] to-[#60a8c9]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Data Science"
                                        description={["Data Analysis", "Data Visualization", "Big Data Systems"]}
                                        icon={LineChart}
                                        colorClass="bg-gradient-to-br from-[#eb6ea5] to-[#e64d8e]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Engineering"
                                        description={["Robotics", "Mechatronics", "Automation Systems"]}
                                        icon={Wrench}
                                        colorClass="bg-gradient-to-br from-[#8ab4d5] to-[#6fa1ca]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="IOT"
                                        description={["Electronics", "Internet of Things", "Industry 4.0 Systems"]}
                                        icon={MonitorSmartphone}
                                        colorClass="bg-gradient-to-br from-[#deb986] to-[#d4a86e]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Entrepreneurship"
                                        description={["Hackathon & Ideathon", "Business Model Design", "Case Study"]}
                                        icon={LineChart} // Reusing LineChart as generic growth icon
                                        colorClass="bg-gradient-to-br from-[#b3ca87] to-[#a2bd70]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Design & Creative Media"
                                        description={["Art & Graphic Design", "Photography", "Videography"]}
                                        icon={ShapesIcon}
                                        colorClass="bg-gradient-to-br from-[#c4c96b] to-[#b6bc57]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Music & Performance Arts"
                                        description={["Vocal & Instrumental", "Dance & Movement Arts", "Theatre"]}
                                        icon={Music2}
                                        colorClass="bg-gradient-to-br from-[#b87661] to-[#a86552]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Cybersecurity"
                                        description={["Ethical Hacking", "Cloud Computing", "Dev Ops"]}
                                        icon={ShieldCheck}
                                        colorClass="bg-gradient-to-br from-[#4d56e6] to-[#3a44d8]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Communication"
                                        description={["Idea Pitching", "Public Speaking", "Debate"]}
                                        icon={Mic2}
                                        colorClass="bg-gradient-to-br from-[#a6a0e6] to-[#9089df]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Social Impact"
                                        description={["SDG Challenges", "Climate Innovation", "Community Dev"]}
                                        icon={Globe2}
                                        colorClass="bg-gradient-to-br from-[#8ecc97] to-[#78c082]"
                                        onClick={handleTopicClick}
                                    />
                                    <TopicCard
                                        title="Media & Academia"
                                        description={["Research", "Creative Writing", "Journalism"]}
                                        icon={Feather}
                                        colorClass="bg-gradient-to-br from-[#ff9b85] to-[#ff8469]"
                                        onClick={handleTopicClick}
                                    />
                                </div>
                            </section>

                            {/* Recent Competitions Section - Only visible to authenticated users */}
                            {isAuthenticated && (
                                <section className="space-y-8 bg-gray-200/50 -mx-4 md:-mx-8 px-4 md:px-8 py-12">
                                    <h2 className="text-3xl font-semibold text-center text-[#1a1a1a]">Recently Visited</h2>
                                    {/* Removed justify-center to fix scrolling issue when content overflow */}
                                    <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-none">
                                        {/* Mock Data for recent items */}
                                        <div className="snap-center shrink-0 pl-1"> {/* Formatting padding */}
                                            <CompetitionCard
                                                status="Ongoing"
                                                title="HackExtreme"
                                                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                            />
                                        </div>
                                        <div className="snap-center shrink-0">
                                            <CompetitionCard
                                                status="Upcoming"
                                                title="Dev Vanguard"
                                                imageUrl="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop"
                                                organizerName="Game dev club"
                                                category="Open Category"
                                                registeredCount={120}
                                                deadline="Registration closed"
                                            />
                                        </div>
                                        <div className="snap-center shrink-0">
                                            <CompetitionCard
                                                status="Ongoing"
                                                title="HackExtreme 2.0"
                                                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                            />
                                        </div>
                                        <div className="snap-center shrink-0">
                                            <CompetitionCard
                                                status="Upcoming"
                                                title="Dev Vanguard 2.0"
                                                imageUrl="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop"
                                                organizerName="Game dev club"
                                                category="Open Category"
                                                registeredCount={120}
                                                deadline="Registration closed"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {/* VIEW 2: SEARCH RESULTS (Filtered View) */}
                    {isSearching && (
                        <div className="flex flex-col lg:flex-row gap-8 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Sidebar */}
                            <aside className="lg:w-64 shrink-0 hidden lg:block">
                                <div className="sticky top-8">
                                    <h3 className="font-bold mb-4 text-xl">Filters</h3>
                                    <FilterSidebar />
                                </div>
                            </aside>

                            {/* Mobile Filter Toggle (Visible only on small screens) */}
                            <div className="lg:hidden mb-4">
                                <Button variant="outline" className="w-full">
                                    Filters
                                </Button>
                            </div>

                            {/* Results Grid */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <CompetitionCard key={i} title="HackExtreme" />
                                    ))}
                                </div>

                                {/* Pagination (Mock) */}
                                <div className="flex justify-center items-center gap-4 mt-12 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">← Previous</span>
                                    <div className="flex gap-2">
                                        <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md">1</span>
                                        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md cursor-pointer">2</span>
                                        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md cursor-pointer">3</span>
                                        <span className="w-8 h-8 flex items-center justify-center">...</span>
                                        <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md cursor-pointer">68</span>
                                    </div>
                                    <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">Next →</span>
                                </div>
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
    )
}
