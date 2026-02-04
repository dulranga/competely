"use client"

export function TimelineSection() {
    const events = [
        { date: "NOV 03", time: "11.00 AM", title: "Registration" },
        { date: "NOV 04", time: "11.30 AM", title: "Introduction" },
        { date: "NOV 04", time: "12.00 PM", title: "Workshop 1" },
        { date: "NOV 20", time: "04.00 PM", title: "Proposal Submission" },
        { date: "NOV 30", time: "08.00 AM", title: "Workshop 2" },
        { date: "DEC 25", time: "10.00 AM", title: "Semi-Finals" },
        { date: "JAN 03", time: "09.00 AM", title: "Workshop 3" },
        { date: "JAN 08", time: "11.00 AM", title: "Grand-Finals" },
    ]

    return (
        <section className="py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Timeline</h2>
                <p className="text-lg text-muted-foreground mb-12">Know what's happening and when.</p>

                <div className="relative">
                    {/* Horizontal Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-foreground -translate-y-1/2 z-0 hidden md:block mt-8"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
                        {events.map((event, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {/* Hexagon/Shape Container */}
                                <div className="w-full aspect-[3/4] bg-background border-2 border-foreground rounded-xl flex flex-col items-center justify-center p-2 text-center shadow-sm relative group hover:-translate-y-2 transition-transform duration-300">

                                    {/* Bottom Arrow/Shape (CSS Hack for the diamond bottom look in visual) */}
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-background border-b-2 border-r-2 border-foreground rotate-45"></div>

                                    <div className="font-bold text-xs uppercase mb-1 text-foreground">{event.title}</div>
                                    <div className="text-xl font-black uppercase leading-none mb-1 text-foreground">
                                        {event.date.split(" ")[0]}
                                        <br />
                                        <span className="text-3xl">{event.date.split(" ")[1]}</span>
                                    </div>
                                    <div className="font-bold text-xs text-muted-foreground">{event.time}</div>
                                </div>

                                {/* Dot on the line */}
                                <div className="w-4 h-4 bg-foreground rounded-full border-4 border-background mt-8 z-20 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
