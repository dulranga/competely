"use client"

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

const prizeData = [
    { name: "1st Place", value: 10000, color: "#e5ab7d" }, // Primary
    { name: "2nd Place", value: 5000, color: "#bcde8c" },  // Secondary
    { name: "3rd Place", value: 2500, color: "#6dd594" },  // Accent
    { name: "Best AI", value: 1500, color: "#d4a373" },
    { name: "Best Design", value: 1000, color: "#a3b18a" }
]

export function PrizesSection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Prize Pool</h2>
                <p className="text-lg text-muted-foreground mb-12">Total Prize Pool: <span className="font-bold text-primary">$20,000</span></p>

                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm animate-fade-in flex flex-col h-[600px] relative">
                    {/* Corner accents similar to Timeline if desired, but keeping it clean for now */}

                    <h3 className="text-2xl font-black text-foreground mb-10 text-center uppercase tracking-tight">Distribution</h3>

                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={prizeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)' }}
                                    contentStyle={{
                                        backgroundColor: 'var(--popover)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        color: 'var(--popover-foreground)'
                                    }}
                                    itemStyle={{ color: 'var(--popover-foreground)', fontWeight: 600 }}
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
            </div>
        </section>
    )
}
