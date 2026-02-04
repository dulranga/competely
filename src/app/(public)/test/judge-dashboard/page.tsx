"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle2, Clock, Calendar, ChevronRight, User, Hash } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useJudge, SubmissionStatus } from "./judge-context";

export default function JudgeDashboardPage() {
    const { submissions } = useJudge();
    const [activeTab, setActiveTab] = useState<SubmissionStatus>("to_review");

    const filteredSubmissions = submissions.filter((sub) => sub.status === activeTab);

    // Stats calculation
    const toReviewCount = submissions.filter(s => s.status === "to_review").length;
    const reviewedCount = submissions.filter(s => s.status === "finished").length;
    const finishedScores = submissions.filter(s => s.status === "finished" && s.score !== null).map(s => s.score as number);
    const averageScore = finishedScores.length > 0
        ? (finishedScores.reduce((a, b) => a + b, 0) / finishedScores.length).toFixed(1)
        : "N/A";

    return (
        <div className="min-h-screen bg-[#fbf6f3] text-[#0c0803] font-sans">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-[#e8e2de] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Judge Dashboard</h1>
                        <p className="text-sm text-[#0c0803]/50 font-medium mt-1">
                            Stanford IV 2026 • Evaluate Submissions
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#fbf6f3] rounded-xl border border-[#e8e2de]">
                            <User size={16} className="text-[#0c0803]/50" />
                            <span className="text-sm font-bold">Dr. Alan Grant</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-10 space-y-10">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-[#e8e2de] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#0c0803]/60 text-sm uppercase tracking-wider">Pending</h3>
                            <Clock size={20} className="text-[#e5ab7d]" />
                        </div>
                        <div className="text-4xl font-black text-[#0c0803]">{toReviewCount}</div>
                        <p className="text-sm text-[#0c0803]/40 mt-2 font-medium">Submissions to review</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-[#e8e2de] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#0c0803]/60 text-sm uppercase tracking-wider">Completed</h3>
                            <CheckCircle2 size={20} className="text-[#6dd594]" />
                        </div>
                        <div className="text-4xl font-black text-[#0c0803]">{reviewedCount}</div>
                        <p className="text-sm text-[#0c0803]/40 mt-2 font-medium">Evaluations finished</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-[#e8e2de] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#0c0803]/60 text-sm uppercase tracking-wider">Average Score</h3>
                            <Hash size={20} className="text-blue-500" />
                        </div>
                        <div className="text-4xl font-black text-[#0c0803]">{averageScore}</div>
                        <p className="text-sm text-[#0c0803]/40 mt-2 font-medium">Across all finished</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-[2rem] border border-[#e8e2de] shadow-sm overflow-hidden min-h-[600px]">
                    {/* Tabs & Filters */}
                    <div className="px-8 py-6 border-b border-[#e8e2de] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex p-1 bg-[#fbf6f3] rounded-xl border border-[#e8e2de]/50">
                            {[
                                { id: "to_review", label: "To Review" },
                                { id: "reviewed", label: "Reviewed" },
                                { id: "finished", label: "Finished" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                                        activeTab === tab.id
                                            ? "bg-[#0c0803] text-white shadow-md"
                                            : "text-[#0c0803]/50 hover:text-[#0c0803] hover:bg-white/50"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0c0803]/30" size={16} />
                                <input
                                    placeholder="Search team or project..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#fbf6f3] border border-[#e8e2de] rounded-xl text-sm font-medium focus:outline-none focus:border-[#e5ab7d] transition-colors"
                                />
                            </div>
                            <button className="p-2.5 bg-[#fbf6f3] border border-[#e8e2de] rounded-xl text-[#0c0803]/60 hover:bg-[#e5ab7d]/10 hover:text-[#e5ab7d] transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Submission List */}
                    <div className="divide-y divide-[#e8e2de]">
                        {filteredSubmissions.length > 0 ? (
                            filteredSubmissions.map((sub) => (
                                <Link
                                    href={`/test/judge-dashboard/${sub.id}`}
                                    key={sub.id}
                                    className="group flex items-center gap-6 px-8 py-6 hover:bg-[#fbf6f3]/50 transition-colors cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-[#0c0803] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                                        {sub.teamName.charAt(0)}
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                        <div className="md:col-span-5">
                                            <h3 className="text-lg font-bold text-[#0c0803] mb-1 group-hover:text-[#e5ab7d] transition-colors">
                                                {sub.projectTitle}
                                            </h3>
                                            <p className="text-sm text-[#0c0803]/50 font-medium flex items-center gap-2">
                                                <User size={14} /> {sub.teamName}
                                            </p>
                                        </div>

                                        <div className="md:col-span-3">
                                            <span className="px-3 py-1 bg-[#fbf6f3] border border-[#e8e2de] rounded-lg text-xs font-bold text-[#0c0803]/60 uppercase tracking-wide">
                                                {sub.track}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2 text-sm text-[#0c0803]/40 font-medium">
                                            {sub.submittedAt}
                                        </div>

                                        <div className="md:col-span-2 flex justify-end">
                                            {sub.status === "finished" ? (
                                                <div className="flex items-center gap-2 text-[#6dd594] font-bold text-sm bg-[#6dd594]/10 px-4 py-2 rounded-xl">
                                                    Score: {sub.score}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-[#e5ab7d] font-bold text-sm bg-[#e5ab7d]/10 px-4 py-2 rounded-xl">
                                                    {sub.status === "reviewed" ? "Continue" : "Evaluate"} <ChevronRight size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                <div className="w-20 h-20 bg-[#fbf6f3] rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 size={32} className="text-[#0c0803]/30" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c0803]">All caught up!</h3>
                                <p className="text-[#0c0803]/50">No submissions found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
