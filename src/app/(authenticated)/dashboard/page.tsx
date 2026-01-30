import { ArrowUpRight, Zap, Target, History } from "lucide-react";

const DashboardPage = async () => {
    return (
        <div className="space-y-16">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Overview</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Welcome to your Competely command center. Monitor your events, manage delegates, and craft
                    unforgettable competition experiences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 text-[#0c0803]">
                    {[
                        { label: "Active Delegates", value: "1,280", trend: "+12%" },
                        { label: "Open Submissions", value: "42", trend: "Hot" },
                        { label: "Days to Final", value: "12", trend: "Normal" },
                    ].map((metric, i) => (
                        <div
                            key={i}
                            className="group aspect-video rounded-[3rem] bg-white border border-[#e8e2de] shadow-sm p-10 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <span className="px-3 py-1 bg-[#bcde8c]/20 text-[#0c0803] text-[10px] font-black uppercase tracking-tighter rounded-full">
                                    {metric.trend}
                                </span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-[#fbf6f3] flex items-center justify-center border border-[#e8e2de] group-hover:scale-110 transition-transform">
                                <span className="font-black text-lg">0{i + 1}</span>
                            </div>
                            <div className="space-y-1 border-t border-[#e8e2de]/40 pt-6 mt-6">
                                <h3 className="font-bold text-[#0c0803]/40 uppercase tracking-widest text-xs">
                                    {metric.label}
                                </h3>
                                <div className="text-5xl font-black tracking-tighter">{metric.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* Quick Actions */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Zap size={24} className="text-[#e5ab7d]" />
                        <h2 className="text-2xl font-black">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { title: "Edit Landing Page", icon: Target, href: "/dashboard/editor" },
                            { title: "View Form Status", icon: ArrowUpRight, href: "/dashboard/forms" },
                        ].map((action, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-[2.5rem] bg-white border border-[#e8e2de] hover:border-[#e5ab7d] hover:shadow-sm transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#fbf6f3] flex items-center justify-center mb-6 group-hover:bg-[#e5ab7d] group-hover:text-white transition-colors">
                                    <action.icon size={20} />
                                </div>
                                <div className="font-bold text-[#0c0803]">{action.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Feed */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <History size={24} className="text-[#6dd594]" />
                        <h2 className="text-2xl font-black">Recent Activity</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { user: "Sarah S.", action: "registered for Stanford IV", time: "2 min ago" },
                            { user: "Alex J.", action: "updated Timeline configuration", time: "1 hr ago" },
                            { user: "System", action: "Automatic backup completed", time: "3 hrs ago" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-6 rounded-3xl bg-white border border-[#e8e2de]/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#bcde8c]/20" />
                                    <div className="text-sm">
                                        <span className="font-black">{item.user}</span>{" "}
                                        <span className="text-[#0c0803]/60">{item.action}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/40">
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
