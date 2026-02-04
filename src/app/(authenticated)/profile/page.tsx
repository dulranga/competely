"use client";

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TechBorder } from "~/components/ui/tech-border";
import { AnimatedBackground } from "~/components/ui/animated-background";
import { MapPin, Trophy, Star, Award, Code, ExternalLink, Github, Globe, Mail, Target, ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"overview" | "history" | "portfolio">("overview");

    return (
        <div className="relative min-h-screen pb-20">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[#fbf6f3] -z-20" />
            <AnimatedBackground className="fixed -z-10 opacity-60" />

            <div className="container mx-auto px-4 pt-8">
                {/* Profile Header Card */}
                <div className="relative mb-8">
                    <TechBorder className="rounded-3xl bg-white/80 backdrop-blur-md border border-[#e8e2de] shadow-sm overflow-hidden">
                        {/* Cover Image / Gradient */}
                        <div className="h-48 w-full bg-gradient-to-r from-[#e5ab7d]/20 via-[#e5ab7d]/10 to-[#6dd594]/10 relative">
                            <div className="absolute inset-0 bg-[radial-gradient(#e5ab7d_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                        </div>

                        <div className="px-8 pb-8">
                            <div className="flex flex-col md:flex-row items-end md:items-center -mt-16 gap-6 relative">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        <div className="w-full h-full rounded-xl bg-[#0c0803] flex items-center justify-center overflow-hidden relative">
                                            {/* Fallback avatar if no image */}
                                            <span className="text-4xl font-black text-white">JD</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#6dd594] text-[#0c0803] text-xs font-black px-2 py-1 rounded-md border-2 border-white shadow-sm">
                                        PRO
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 pt-2 md:pt-16">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-black text-[#0c0803] tracking-tight">John Doe</h1>
                                            <div className="flex items-center gap-3 text-[#0c0803]/60 mt-1">
                                                <Badge variant="secondary" className="bg-[#e5ab7d]/10 text-[#e5ab7d] border-[#e5ab7d]/20">
                                                    Full Stack Developer
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs font-medium">
                                                    <MapPin size={14} />
                                                    <span>San Francisco, CA</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                                                <Github size={16} />
                                                GitHub
                                            </Button>
                                            <Button size="sm" className="bg-[#0c0803] text-white hover:bg-[#0c0803]/80">
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio & Socials */}
                            <div className="mt-6 flex flex-col md:flex-row justify-between gap-8 border-t border-[#e8e2de] pt-6">
                                <p className="max-w-2xl text-[#0c0803]/70 leading-relaxed">
                                    Passionate developer building tools for the future. Competitive programmer by night, 
                                    frontend wizard by day. Always learning, always building.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-[#0c0803]/40 hover:text-[#e5ab7d] transition-colors"><Globe size={20} /></a>
                                    <a href="#" className="text-[#0c0803]/40 hover:text-[#e5ab7d] transition-colors"><Mail size={20} /></a>
                                    <a href="#" className="text-[#0c0803]/40 hover:text-[#e5ab7d] transition-colors"><Github size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </TechBorder>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Stats & Skills */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl border border-[#e8e2de] p-6 shadow-sm">
                            <h3 className="font-bold text-[#0c0803] mb-4 flex items-center gap-2">
                                <Trophy size={18} className="text-[#e5ab7d]" />
                                Performance
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#fbf6f3] p-4 rounded-xl border border-[#e8e2de]/50">
                                    <div className="text-2xl font-black text-[#0c0803]">12</div>
                                    <div className="text-[10px] uppercase font-bold text-[#0c0803]/40 tracking-wider">Wins</div>
                                </div>
                                <div className="bg-[#fbf6f3] p-4 rounded-xl border border-[#e8e2de]/50">
                                    <div className="text-2xl font-black text-[#0c0803]">Top 5%</div>
                                    <div className="text-[10px] uppercase font-bold text-[#0c0803]/40 tracking-wider">Rank</div>
                                </div>
                                <div className="bg-[#fbf6f3] p-4 rounded-xl border border-[#e8e2de]/50">
                                    <div className="text-2xl font-black text-[#0c0803]">2.4 k</div>
                                    <div className="text-[10px] uppercase font-bold text-[#0c0803]/40 tracking-wider">Points</div>
                                </div>
                                <div className="bg-[#fbf6f3] p-4 rounded-xl border border-[#e8e2de]/50">
                                    <div className="text-2xl font-black text-[#0c0803]">48</div>
                                    <div className="text-[10px] uppercase font-bold text-[#0c0803]/40 tracking-wider">Events</div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Card */}
                        <div className="bg-white rounded-2xl border border-[#e8e2de] p-6 shadow-sm">
                            <h3 className="font-bold text-[#0c0803] mb-4 flex items-center gap-2">
                                <Code size={18} className="text-[#6dd594]" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["React", "TypeScript", "Node.js", "TailwindCSS", "Next.js", "GraphQL", "Rust"].map((skill) => (
                                    <Badge key={skill} variant="outline" className="bg-transparent border-[#e8e2de] text-[#0c0803]/70 hover:border-[#e5ab7d] hover:text-[#e5ab7d] transition-colors cursor-default">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="lg:col-span-8">
                        {/* Tabs Navigation */}
                        <div className="flex items-center gap-1 mb-6 bg-white/50 p-1 rounded-xl border border-[#e8e2de] w-fit">
                            {[
                                { id: "overview", label: "Overview" },
                                { id: "history", label: "Competition History" },
                                { id: "portfolio", label: "Portfolio" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300",
                                        activeTab === tab.id
                                            ? "bg-[#0c0803] text-white shadow-md"
                                            : "text-[#0c0803]/50 hover:text-[#0c0803] hover:bg-white/80"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="space-y-6">
                            {/* Recent Activity (Overview Tab) */}
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#0c0803]">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {[
                                            { title: "Submitted project for Stanford IV", date: "2 days ago", icon: Target, color: "text-[#e5ab7d]", bg: "bg-[#e5ab7d]/10" },
                                            { title: "Reached Top 100 in Global Rankings", date: "1 week ago", icon: Trophy, color: "text-[#6dd594]", bg: "bg-[#6dd594]/10" },
                                            { title: "Joined 'AI for Good' Hackathon", date: "2 weeks ago", icon: Star, color: "text-blue-500", bg: "bg-blue-500/10" },
                                        ].map((item, i) => (
                                            <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#e8e2de] hover:border-[#e5ab7d]/50 hover:shadow-sm transition-all">
                                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg, item.color)}>
                                                    <item.icon size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-[#0c0803]">{item.title}</h4>
                                                    <p className="text-xs text-[#0c0803]/40 font-medium uppercase tracking-wide">{item.date}</p>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight size={16} className="text-[#0c0803]/30" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Competition History Tab - Placeholder */}
                            {activeTab === "history" && (
                                <div className="bg-white rounded-2xl border border-[#e8e2de] p-12 text-center">
                                    <Award size={48} className="mx-auto text-[#0c0803]/10 mb-4" />
                                    <h3 className="font-bold text-[#0c0803] mb-2">Competition History</h3>
                                    <p className="text-[#0c0803]/50 max-w-sm mx-auto">
                                        Detailed history of participated events and outcomes.
                                    </p>
                                </div>
                            )}

                             {/* Portfolio Tab - Placeholder */}
                             {activeTab === "portfolio" && (
                                <div className="bg-white rounded-2xl border border-[#e8e2de] p-12 text-center">
                                    <ExternalLink size={48} className="mx-auto text-[#0c0803]/10 mb-4" />
                                    <h3 className="font-bold text-[#0c0803] mb-2">Project Portfolio</h3>
                                    <p className="text-[#0c0803]/50 max-w-sm mx-auto">
                                        Showcase of submissions and winning projects.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
