"use client"

import { useState } from "react"
import { Trophy, Clock, Users2, Award, BookOpen } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

export function CompetitionTabs() {
    const [activeTab, setActiveTab] = useState("overview")

    const highlights = [
        { icon: Clock, text: "30-day intensive coding challenge" },
        { icon: Users2, text: "Mentorship from industry experts" },
        { icon: Award, text: "Networking opportunities" },
        { icon: BookOpen, text: "Real-world project experience" },
        { icon: Trophy, text: "Certificate of participation" }
    ]

    const timelineEvents = [
        { date: "Feb 15, 2026", title: "Registration Opens", description: "Sign up your team and complete your profile." },
        { date: "Mar 10, 2026", title: "Registration Closes", description: "Last day to register. Team formation deadline." },
        { date: "Mar 15, 2026", title: "Opening Ceremony", description: "Kick-off event, theme announcement, and keynote." },
        { date: "Mar 15 - Apr 15", title: "Hacking Period", description: "30 days of intense coding, workshops, and mentorship." },
        { date: "Apr 20, 2026", title: "Demo Day", description: "Top 10 teams present their solutions to the judges." },
        { date: "Apr 25, 2026", title: "Winners Announced", description: "Closing ceremony and prize distribution." }
    ]

    const prizeData = [
        { name: "1st Place", value: 10000, color: "#e5ab7d" }, // Primary
        { name: "2nd Place", value: 5000, color: "#bcde8c" },  // Secondary
        { name: "3rd Place", value: 2500, color: "#6dd594" },  // Accent
        { name: "Best AI", value: 1500, color: "#d4a373" },
        { name: "Best Design", value: 1000, color: "#a3b18a" }
    ]

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-[#e8e2de]/30 rounded-full p-1.5">
                        {["overview", "timeline", "prizes"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 ${activeTab === tab
                                    ? "bg-white text-[#0c0803] shadow-sm"
                                    : "text-[#0c0803]/50 hover:text-[#0c0803]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === "overview" && (
                        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                            {/* About Card */}
                            <div className="bg-white rounded-3xl p-10 border border-[#e8e2de] shadow-sm">
                                <h3 className="text-2xl font-black text-[#0c0803] mb-6">About the Competition</h3>
                                <p className="text-[#0c0803]/70 mb-8 leading-relaxed text-lg">
                                    CodeFest 2026 brings together the brightest minds in technology for an intensive 30-day coding challenge.
                                    Participants will work on innovative projects across multiple domains.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Web Development", "AI/ML", "Mobile Apps", "Blockchain"].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-[#fbf6f3] text-[#0c0803] border border-[#e8e2de] rounded-xl text-xs font-bold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights Card */}
                            <div className="bg-white rounded-3xl p-10 border border-[#e8e2de] shadow-sm">
                                <h3 className="text-2xl font-black text-[#0c0803] mb-8">Highlights</h3>
                                <div className="space-y-6">
                                    {highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-[#bcde8c]/20 text-[#0c0803]">
                                                <highlight.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[#0c0803]/70 font-medium pt-1">{highlight.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "timeline" && (
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#e8e2de] shadow-sm animate-fade-in">
                            <h3 className="text-2xl font-black text-[#0c0803] mb-10 text-center">Competition Schedule</h3>
                            <div className="relative border-l-2 border-primary/30 ml-3 md:ml-6 space-y-10">
                                {timelineEvents.map((event, index) => (
                                    <div key={index} className="relative pl-8 md:pl-12 group">
                                        {/* Dot */}
                                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-secondary group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                            <span className="text-sm font-bold text-primary uppercase tracking-wider">{event.date}</span>
                                            <h4 className="text-lg font-bold text-[#0c0803]">{event.title}</h4>
                                        </div>
                                        <p className="text-[#0c0803]/60 max-w-2xl">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "prizes" && (
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#e8e2de] shadow-sm animate-fade-in flex flex-col h-[600px]">
                            <h3 className="text-2xl font-black text-[#0c0803] mb-2 text-center">Prize Pool Distribution</h3>
                            <p className="text-[#0c0803]/50 text-center mb-10">Total Prize Pool: <span className="font-bold text-primary">$20,000</span></p>

                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={prizeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e2de" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#0c0803', fontSize: 12, fontWeight: 600 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#0c0803', fontSize: 12 }}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#fbf6f3' }}
                                            contentStyle={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: '12px',
                                                border: '1px solid #e8e2de',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                            itemStyle={{ color: '#0c0803', fontWeight: 600 }}
                                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Prize']}
                                        />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60} animationDuration={1500}>
                                            {prizeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
