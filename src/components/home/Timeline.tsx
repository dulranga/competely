"use client";

import { cn } from "~/lib/utils";

interface TimelineEvent {
    id: string;
    title: string;
    subtitle: string;
    month: string;
    day: string;
    time: string;
    status: "active" | "upcoming";
}

const events: TimelineEvent[] = [
    {
        id: "1",
        title: "Competition 1",
        subtitle: "Registration",
        month: "NOV",
        day: "03",
        time: "11.00 AM",
        status: "active",
    },
    {
        id: "2",
        title: "Competition 1",
        subtitle: "Workshop",
        month: "NOV",
        day: "04",
        time: "11.30 AM",
        status: "active",
    },
    {
        id: "3",
        title: "Competition 2",
        subtitle: "Registration",
        month: "NOV",
        day: "04",
        time: "12.00 PM",
        status: "active",
    },
    {
        id: "4",
        title: "Competition 3",
        subtitle: "Semi-Finals",
        month: "NOV",
        day: "20",
        time: "04.00 PM",
        status: "active",
    },
    {
        id: "5",
        title: "Competition 1",
        subtitle: "Round 1",
        month: "NOV",
        day: "30",
        time: "08.00 AM",
        status: "upcoming",
    },
    {
        id: "6",
        title: "Competition 2",
        subtitle: "Workshop",
        month: "DEC",
        day: "25",
        time: "10.00 AM",
        status: "upcoming",
    },
    {
        id: "7",
        title: "Competition 1",
        subtitle: "Finals",
        month: "JAN",
        day: "03",
        time: "09.00 AM",
        status: "upcoming",
    },
    {
        id: "8",
        title: "Competition 1", // Assuming text cutoff in screenshot
        subtitle: "Finals",
        month: "JAN",
        day: "08",
        time: "11.00 AM",
        status: "upcoming",
    },
];

export function Timeline() {
    return (
        <div className="w-full">
            <div className="relative w-full overflow-x-auto pb-12 pt-8 hide-scrollbar">
                <div className="flex px-4 md:px-8 min-w-max pb-8 relative pt-4">
                    {/* Horizontal Line */}
                    <div className="absolute top-[180px] left-0 w-full h-1 bg-gray-200 z-0" />
                    {/* Active Line Segment (Approximate for demo) */}
                    <div className="absolute top-[180px] left-0 w-[600px] h-1 bg-green-500 z-0" />

                    {events.map((event, index) => (
                        <div key={event.id} className="relative flex flex-col items-center mr-12 last:mr-0 group w-48">

                            {/* Content Card */}
                            <div className={cn(
                                "relative w-full bg-white rounded-2xl p-4 border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 mb-8 text-center group-hover:border-primary/20",
                                event.status === "active" ? "ring-2 ring-green-500/20" : ""
                            )}>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-border/40" /> {/* Arrow */}

                                <div className={cn(
                                    "text-xs font-bold tracking-widest uppercase mb-1",
                                    event.status === "active" ? "text-green-600" : "text-muted-foreground"
                                )}>
                                    {event.month} {event.day}
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight mb-1">
                                    {event.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {event.subtitle}
                                </p>
                                <div className="mt-3 px-2 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 inline-block">
                                    {event.time}
                                </div>
                            </div>

                            {/* Dot on Line */}
                            <div className={cn(
                                "z-10 w-6 h-6 rounded-full border-4 bg-white transition-all duration-300",
                                event.status === "active" ? "border-green-500 scale-125" : "border-gray-300 group-hover:border-primary"
                            )} />

                            {/* Status Label below line? */}
                            <div className={cn(
                                "mt-4 text-[10px] font-bold tracking-widest uppercase transition-colors",
                                event.status === "active" ? "text-green-600" : "text-gray-400"
                            )}>
                                {event.status === "active" ? "Active" : "Upcoming"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
