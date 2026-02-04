import { FC } from "react";
import { Globe, Users, Trophy, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";

/**
 * PreviewPage provides a mockup of how the competition will look to delegates.
 * It's stylized as a professional "Landing Page" builder output.
 */
const PreviewPage: FC = () => {
    return (
        <div className="space-y-12 pb-20">
            {/* Control Bar */}
            <div className="flex items-center justify-between">
                <div className="grid gap-2">
                    <h1 className="text-4xl font-black text-[#0c0803]">Site Preview</h1>
                    <div className="flex items-center gap-3 text-sm text-[#0c0803]/40">
                        <span className="flex items-center gap-1 font-bold text-[#6dd594]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6dd594] animate-pulse" /> Live
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Globe size={14} /> competely.com/stanford-iv-2025
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="h-12 px-6 rounded-2xl border border-[#e8e2de] text-[#0c0803]/60 font-bold hover:bg-white transition-colors">
                        Edit Link
                    </button>
                    <button className="h-12 px-6 rounded-2xl bg-[#0c0803] text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                        View Public Site <ExternalLink size={16} />
                    </button>
                </div>
            </div>

            {/* Mockup Container */}
            <div className="rounded-[4rem] bg-white border border-[#e8e2de] shadow-xl overflow-hidden min-h-[800px] flex flex-col">
                {/* Browser Header */}
                <div className="h-14 bg-[#fbf6f3] border-b border-[#e8e2de] flex items-center px-8 gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 max-w-xl mx-auto h-8 bg-white rounded-lg border border-[#e8e2de] flex items-center px-4 gap-2 text-[10px] text-[#0c0803]/40">
                        <MapPin size={10} /> competely.com/stanford-iv-2025
                    </div>
                </div>

                {/* Hero Mockup */}
                <div className="flex-1 bg-[#fbf6f3] p-12 lg:p-24 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#e5ab7d]/20 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#bcde8c]/20 blur-[120px] rounded-full" />
                    </div>

                    <div className="relative z-10 max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8e2de] shadow-sm text-xs font-black uppercase tracking-widest text-[#0c0803]/60">
                            <Trophy size={14} className="text-[#e5ab7d]" /> Oct 12-14 • CA, USA
                        </div>

                        <h2 className="text-7xl font-black text-[#0c0803] leading-[0.9]">
                            Stanford invitational{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5ab7d] to-[#bcde8c]">
                                2025
                            </span>
                        </h2>

                        <p className="text-xl text-[#0c0803]/60 font-medium">
                            Join the premier collegiate competition for debate and public speaking. Three days of
                            intense rounds, workshops, and networking.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <div className="h-16 px-10 rounded-2xl bg-[#0c0803] text-white font-black text-lg flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform">
                                Register Now <ArrowRight size={20} />
                            </div>
                            <div className="h-16 px-10 rounded-2xl bg-white border-2 border-[#e8e2de] text-[#0c0803] font-black text-lg flex items-center cursor-pointer hover:bg-[#fbf6f3] transition-colors">
                                View Tournament Guide
                            </div>
                        </div>

                        {/* Quick Metrics */}
                        <div className="grid grid-cols-3 gap-8 pt-20 border-t border-[#e8e2de]/50">
                            {[
                                { icon: Users, label: "Delegates", val: "400+" },
                                { icon: Trophy, label: "Prize Pool", val: "$15,000" },
                                { icon: Calendar, label: "Rounds", val: "12" },
                            ].map((m, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <m.icon size={24} className="text-[#0c0803]/20" />
                                    <div className="text-2xl font-black text-[#0c0803]">{m.val}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/40">
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
