"use client"

import { useState, useEffect } from "react"
import { Trophy, Users, Calendar, Code, Clock, Users2, Award, BookOpen } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function CodeFest2026() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date("2026-03-15T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { icon: Trophy, label: "Prize Pool", value: "$23,000", color: "text-yellow-500" },
    { icon: Users, label: "Participants", value: "500+", color: "text-blue-500" },
    { icon: Calendar, label: "Duration", value: "30 Days", color: "text-green-500" },
    { icon: Code, label: "Projects", value: "200+", color: "text-purple-500" }
  ]

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
  ];

  const prizeData = [
    { name: "1st Place", value: 10000, color: "#e5ab7d" }, // Primary
    { name: "2nd Place", value: 5000, color: "#bcde8c" },  // Secondary
    { name: "3rd Place", value: 2500, color: "#6dd594" },  // Accent
    { name: "Best AI", value: 1500, color: "#d4a373" },
    { name: "Best Design", value: 1000, color: "#a3b18a" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-primary shadow-xl border border-primary/20">
            {/* Background Texture/Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            {/* Soft Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

            <div className="relative z-10 px-8 py-20 text-center text-primary-foreground">
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-[#0c0803]">
                CodeFest 2026
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-[#0c0803]/80 max-w-3xl mx-auto font-medium leading-relaxed">
                The ultimate coding competition where innovation meets excellence
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="backdrop-blur-sm bg-gradient-to-br from-white/40 to-secondary/20 rounded-2xl p-4 min-w-[90px] border border-white/40 shadow-sm">
                    <div className="text-3xl font-black text-[#0c0803]">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-[#0c0803]/70 uppercase tracking-widest font-bold">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button className="px-8 py-4 bg-[#0c0803] text-[#fbf6f3] font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#0c0803]/90 transform hover:-translate-y-1 transition-all duration-300">
                  Learn More
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-white/50 text-[#0c0803] font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e2de] hover:border-primary/50 hover:shadow-md transition-all duration-300 text-center group">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-background mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-black text-[#0c0803] mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-[#0c0803]/50 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-[#0c0803] rounded-3xl p-16 text-center text-[#fbf6f3] shadow-2xl">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready to Start Coding?</h2>
              <p className="text-xl text-[#fbf6f3]/70 mb-10 max-w-2xl mx-auto font-medium">
                Join hundreds of developers in the most exciting coding competition of 2026.
              </p>
              <button className="px-10 py-5 bg-primary text-[#0c0803] font-bold rounded-2xl shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 text-lg">
                Register Your Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}