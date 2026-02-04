import { Trophy, Users, Calendar, Code } from "lucide-react"

export function StatsSection() {
    const stats = [
        { icon: Trophy, label: "Prize Pool", value: "$23,000", color: "text-yellow-500" },
        { icon: Users, label: "Participants", value: "500+", color: "text-blue-500" },
        { icon: Calendar, label: "Duration", value: "30 Days", color: "text-green-500" },
        { icon: Code, label: "Projects", value: "200+", color: "text-purple-500" }
    ]

    return (
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
    )
}
