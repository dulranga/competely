"use client";

import { FC, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import CreateEventModal from "~/components/dashboard/modals/modals/CreateEventModal";
import { Dialog } from "~/components/ui/dialog";

const TimelinePage: FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const events = [
        { title: "Registration Opens", date: "Oct 15, 2025", type: "Major" },
        { title: "Case Launch", date: "Nov 02, 2025", type: "Milestone" },
        { title: "Submission Deadline", date: "Nov 20, 2025", type: "Critical" },
        { title: "Grand Finale", date: "Jan 12, 2026", type: "Major" },
    ];

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div className="grid gap-4">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Event Timeline</h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        Map out the milestones of your competition. Clearly communicate deadlines to all participants.
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="h-16 px-8 rounded-3xl bg-[#0c0803] hover:bg-black text-white font-black text-lg gap-3"
                >
                    <Plus size={24} /> Add Event
                </Button>
            </div>

            <div className="relative pt-8">
                {/* Timeline Line */}
                <div className="absolute left-[3.5rem] top-0 bottom-0 w-1 bg-[#e8e2de] rounded-full" />

                <div className="space-y-12">
                    {events.map((event, i) => (
                        <div key={i} className="flex gap-10 items-center group">
                            <div className="relative z-10 w-28 h-28 rounded-[2rem] bg-white border border-[#e8e2de] shadow-sm flex flex-col items-center justify-center p-4 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:border-[#e5ab7d]">
                                <Calendar size={28} className="text-[#e5ab7d] mb-1" />
                                <span className="text-[10px] font-black uppercase text-[#0c0803]/40 tracking-tighter">
                                    {event.date}
                                </span>
                            </div>

                            <div className="flex-1 bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-[#e8e2de]/50 group-hover:bg-white transition-colors cursor-pointer">
                                <div className="flex items-center gap-4 mb-2 text-[#0c0803]/40">
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#fbf6f3] px-3 py-1 rounded-full border border-[#e8e2de]">
                                        {event.type}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-[#0c0803]">{event.title}</h3>
                                <p className="text-[#0c0803]/60 mt-1">
                                    Participants must complete this step by the specified date.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                {isCreateModalOpen && (
                    <CreateEventModal
                        closeModal={() => setIsCreateModalOpen(false)}
                        data={{ roundId: "mock-round-id" }}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default TimelinePage;
