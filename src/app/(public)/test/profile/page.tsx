import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TechBorder } from "~/components/ui/tech-border";
import { AnimatedBackground } from "~/components/ui/animated-background";
import { MapPin, Trophy, Star, Award, Code, ExternalLink, Github, Globe, Mail, Target, ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { getUserProfile } from "~/data-access/get-profile";
import { ProfileClient } from "./client-page";

export default async function ProfilePage() {
    const user = await getUserProfile();

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
                                            {
                                                user.image ? (
                                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-4xl font-black text-white bg-[#0c0803] w-full h-full flex items-center justify-center">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )
                                            }
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
                                            <h1 className="text-3xl font-black text-[#0c0803] tracking-tight">{user.name}</h1>
                                            <div className="flex items-center gap-3 text-[#0c0803]/60 mt-1">
                                                <Badge variant="secondary" className="bg-[#e5ab7d]/10 text-[#e5ab7d] border-[#e5ab7d]/20">
                                                    {user.role || "Member"}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs font-medium">
                                                    <Mail size={14} />
                                                    <span>{user.email}</span>
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
                        <ProfileClient />
                    </div>
                </div>
            </div>
        </div>
    );
}
