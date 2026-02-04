"use client"

import { useState, useEffect } from "react"

interface HeroSectionProps {
    // Allow passing target date for flexibility, defaulting to the one in the original file
    targetDate?: string;
}

export function HeroSection({ targetDate = "2026-03-15T00:00:00" }: HeroSectionProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const target = new Date(targetDate).getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = target - now

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
    }, [targetDate])

    return (
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
    )
}
