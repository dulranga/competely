import { FC } from "react";

const AnalyticsPage: FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Analytics</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Track your competition's reach and growth. Gain insights into registration trends and delegate
                    demographics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "Total Views", value: "24,801", sub: "+12% this week" },
                    { label: "Unique Visitors", value: "8,940", sub: "+5% this week" },
                    { label: "Conversion Rate", value: "14.2%", sub: "-2% this week" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="rounded-[3rem] bg-white border border-[#e8e2de] p-10 space-y-4 hover:shadow-xl transition-shadow"
                    >
                        <div className="text-sm font-black uppercase text-[#0c0803]/40 tracking-widest">
                            {stat.label}
                        </div>
                        <div className="text-5xl font-black">{stat.value}</div>
                        <div className="text-sm font-bold text-[#6dd594] bg-[#6dd594]/10 inline-block px-3 py-1 rounded-full uppercase italic">
                            {stat.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* Demo Chart Area */}
            <div className="rounded-[3.5rem] bg-[#0c0803] p-12 min-h-[400px] flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10 flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-white text-2xl font-black">Registration Growth</h3>
                        <p className="text-white/40 font-bold uppercase text-xs tracking-widest">
                            January 2025 - January 2026
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <div className="w-3 h-3 rounded-full bg-[#e5ab7d]" /> Real-time
                        </div>
                    </div>
                </div>

                {/* Decorative Grid/Graph Mock */}
                <div className="absolute inset-0 opacity-10 flex items-end px-12 pb-24 gap-4">
                    {[40, 60, 45, 80, 55, 90, 70, 100, 85, 110].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 bg-gradient-to-t from-white to-transparent rounded-t-2xl transition-all duration-500 group-hover:scale-y-105"
                        />
                    ))}
                </div>

                <div className="relative z-10 text-white/20 font-black text-8xl pointer-events-none select-none italic text-right -mr-4 -mb-8">
                    GROWTH.
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
