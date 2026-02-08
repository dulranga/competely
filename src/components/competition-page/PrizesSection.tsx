"use client"
//random

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

export interface Prize {
    id: string;
    title: string;
    description: string | null;
    cashPrize: number;
}

interface PrizesSectionProps {
    prizes?: Prize[];
}

export function PrizesSection({ prizes = [] }: PrizesSectionProps) {
    if (!prizes || prizes.length === 0) {
        return null;
    }

    // Sort prizes by value (highest first)
    const sortedPrizes = [...prizes].sort((a, b) => b.cashPrize - a.cashPrize);

    // Calculate total prize pool
    const totalPool = sortedPrizes.reduce((sum, prize) => sum + prize.cashPrize, 0);

    // Define colors for ranks
    const colors = ["#e5ab7d", "#bcde8c", "#6dd594", "#d4a373", "#a3b18a"];

    // Map to chart data
    const chartData = sortedPrizes.map((prize, index) => ({
        name: prize.title,
        value: prize.cashPrize,
        color: colors[index % colors.length]
    }));

    return (
        <section className="py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Prize Pool</h2>
                <p className="text-lg text-muted-foreground mb-12">Total Prize Pool: <span className="font-bold text-primary">${totalPool.toLocaleString()}</span></p>

                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm animate-fade-in flex flex-col h-[600px] relative">
                    {/* Corner accents similar to Timeline if desired, but keeping it clean for now */}

                    <h3 className="text-2xl font-black text-foreground mb-10 text-center uppercase tracking-tight">Distribution</h3>

                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                                    {chartData.map((entry, index) => (
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
