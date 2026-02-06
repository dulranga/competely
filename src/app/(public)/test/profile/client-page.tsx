"use client";

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { TechBorder } from "~/components/ui/tech-border";
import { Trophy, Star, Award, Code, ExternalLink, Github, Globe, Mail, Target, ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

export function ProfileClient() {
    const [activeTab, setActiveTab] = useState<"overview" | "history" | "portfolio">("overview");

    return (
        <>
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
        </>
    );
}
