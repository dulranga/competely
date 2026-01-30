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
        <div className="w-full space-y-8">
            <h2 className="text-3xl font-bold text-center text-[#1a1b25]">Timeline</h2>

            <div className="relative w-full overflow-x-auto pb-12 pt-4 hide-scrollbar">
                {/* 
                   The line connecting the dots needs to be positioned absolutely relative to the container.
                   However, since the items scroll, the line needs to be inside the scroll container.
                   We'll make a flex container that holds everything.
                 */}
                <div className="flex px-4 md:px-8 min-w-max pb-8 relative">
                    {/* Horizontal Line behind dots */}
                    <div className="absolute top-[210px] left-0 w-full h-1 bg-[#2d2d2d] z-0" />

                    {/* 
                            We need to override the active portion of the line.
                            Since we have a mix, it's safer to just let the line be black 
                            and maybe color segments if we want perfection. 
                            For now, strict horizontal black/green line is tricky with flex spacing.
                            Simple approach: Line is gray/black, and we color the 'active' line segments if needed.
                            Actually, viewing the screenshot: The line is Green for active parts, Black for others.
                            I'll simulate this with a gradient or just a base line.
                            Let's strive for the screenshot: Green line until the last green dot.
                         */}
                    <div className="absolute top-[210px] left-0 w-[550px] h-1 bg-[#4ade80] z-0" />


                    {events.map((event, index) => (
                        <div key={event.id} className="relative flex flex-col items-center mr-8 last:mr-0 group">
                            {/* 
                                    Card Shape. 
                                    Using clip-path or borders to make the point at bottom.
                                    Easier implementation: A rectangular div with a rotated square at bottom, masked or z-indexed.
                                */}
                            <div className={cn(
                                "relative w-40 h-44 border-[3px] flex flex-col items-center justify-center text-center p-2 z-10 bg-white transition-transform hover:-translate-y-1 duration-300",
                                event.status === "active" ? "border-[#4ade80]" : "border-[#1a1b25]"
                            )}>
                                <div className="space-y-1">
                                    <h3 className={cn(
                                        "font-bold text-sm leading-tight",
                                        event.status === "active" ? "text-[#4ade80]" : "text-[#1a1b25]"
                                    )}>
                                        {event.title}
                                        <br />
                                        {event.subtitle}
                                    </h3>

                                    <div className={cn(
                                        "flex flex-col items-center",
                                        event.status === "active" ? "text-[#4ade80]" : "text-[#1a1b25]"
                                    )}>
                                        <span className="text-xs font-bold tracking-widest">{event.month}</span>
                                        <span className="text-4xl font-black">{event.day}</span>
                                    </div>

                                    <div className={cn(
                                        "text-sm font-bold pt-1",
                                        event.status === "active" ? "text-[#4ade80]" : "text-[#1a1b25]"
                                    )}>
                                        {event.time}
                                    </div>
                                </div>

                                {/* The Triangle Point at Bottom */}
                                <div className={cn(
                                    "absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-[3px] border-r-[3px] rotate-45 z-10",
                                    event.status === "active" ? "border-[#4ade80]" : "border-[#1a1b25]"
                                )} />
                                {/* Cover top border of triangle to merge with box */}
                                {/* Actually easier to just have the box be white and sit on top? */}
                            </div>

                            {/* Connection Dot */}
                            <div className={cn(
                                "mt-8 w-5 h-5 rounded-full z-10 border-[3px] bg-white",
                                event.status === "active" ? "border-[#4ade80] bg-[#4ade80]" : "border-[#1a1b25] bg-[#1a1b25]"
                            )} />
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
