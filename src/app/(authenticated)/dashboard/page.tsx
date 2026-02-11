import { ArrowUpRight, Zap, Target, History, Award, Clock, BarChart3, FileText, Users, Eye } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
    return (
        <div className="space-y-12 max-w-6xl">
            <div className="grid gap-3">
                <h1 className="text-3xl font-black tracking-tight text-[#0c0803]">Overview</h1>
                <p className="text-[#0c0803]/50 text-base max-w-xl leading-relaxed">
                    Welcome to your Competely command center. Monitor your events, manage delegates, and craft
                    unforgettable competition experiences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 text-[#0c0803]">
                    {[
                        {
                            title: "Editor",
                            description: "Customize your competition's landing page and public contents.",
                            icon: Award,
                            href: "/dashboard/editor"
                        },
                        {
                            title: "Timeline",
                            description: "Manage competition rounds, events, and scheduling.",
                            icon: Clock,
                            href: "/dashboard/timeline"
                        },
                        {
                            title: "Analytics",
                            description: "Track delegate performance and submission statistics.",
                            icon: BarChart3,
                            href: "/dashboard/analytics"
                        },
                        {
                            title: "Form Builder",
                            description: "Create and manage registration forms and portals.",
                            icon: FileText,
                            href: "/dashboard/forms"
                        },
                        {
                            title: "Users",
                            description: "Manage delegates, admins, and user permissions.",
                            icon: Users,
                            href: "/dashboard/users"
                        },
                        {
                            title: "Preview",
                            description: "View your competition page as it appears to the public.",
                            icon: Eye,
                            href: "/dashboard/preview"
                        },
                    ].map((module, i) => (
                        <Link
                            key={i}
                            href={module.href}
                            className="group rounded-3xl bg-white border border-[#e8e2de]/60 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-[#e5ab7d]/30 transition-all duration-300 relative overflow-hidden h-48"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#fbf6f3] flex items-center justify-center border border-[#e8e2de]/40 group-hover:bg-[#e5ab7d] group-hover:text-white transition-colors duration-300">
                                    <module.icon size={22} className="text-[#0c0803] group-hover:text-white transition-colors" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-transparent border border-[#e8e2de]/40 flex items-center justify-center -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={14} className="text-[#0c0803]/40" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-black text-lg text-[#0c0803] tracking-tight">
                                    {module.title}
                                </h3>
                                <p className="text-[#0c0803]/50 text-xs font-medium leading-relaxed">
                                    {module.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 text-[#0c0803]">
                    {[
                        { label: "Active Delegates", value: "1,280", trend: "+12%" },
                        { label: "Open Submissions", value: "42", trend: "Hot" },
                        { label: "Days to Final", value: "12", trend: "Normal" },
                    ].map((metric, i) => (
                        <div
                            key={i}
                            className="group rounded-3xl bg-white border border-[#e8e2de]/60 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-[#e5ab7d]/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-5">
                                <span className="px-2 py-0.5 bg-[#fbf6f3] text-[#0c0803]/60 text-[8px] font-black uppercase tracking-tighter rounded-full border border-[#e8e2de]/40">
                                    {metric.trend}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#fbf6f3] flex items-center justify-center border border-[#e8e2de]/40 group-hover:scale-105 transition-transform">
                                <span className="font-black text-xs opacity-20">0{i + 1}</span>
                            </div>
                            <div className="space-y-0.5 border-t border-[#e8e2de]/20 pt-4 mt-4">
                                <h3 className="font-bold text-[#0c0803]/40 uppercase tracking-widest text-[9px]">
                                    {metric.label}
                                </h3>
                                <div className="text-3xl font-black tracking-tighter">{metric.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
                */}
            </div>

            {/* 
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap size={18} className="text-[#e5ab7d]" />
                        <h2 className="text-xl font-black">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { title: "Edit Landing Page", icon: Target, href: "/dashboard/editor" },
                            { title: "View Form Status", icon: ArrowUpRight, href: "/dashboard/forms" },
                        ].map((action, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-white border border-[#e8e2de]/60 hover:border-[#e5ab7d] hover:shadow-sm transition-all cursor-pointer group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#fbf6f3] flex items-center justify-center mb-4 group-hover:bg-[#e5ab7d] group-hover:text-white transition-colors">
                                    <action.icon size={18} />
                                </div>
                                <div className="font-bold text-sm text-[#0c0803]">{action.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <History size={18} className="text-[#6dd594]" />
                        <h2 className="text-xl font-black">Recent Activity</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { user: "Sarah S.", action: "registered for Stanford IV", time: "2 min ago" },
                            { user: "Alex J.", action: "updated Timeline configuration", time: "1 hr ago" },
                            { user: "System", action: "Automatic backup completed", time: "3 hrs ago" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e8e2de]/40"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#fbf6f3]" />
                                    <div className="text-xs">
                                        <span className="font-black">{item.user}</span>{" "}
                                        <span className="text-[#0c0803]/50">{item.action}</span>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#0c0803]/30">
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> 
            */}
        </div>
    );
};

export default DashboardPage;
