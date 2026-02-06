"use client";

import { useState } from "react";
import { Plus, Calendar, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useModal } from "~/components/dashboard/modals/modal-provider";
import type { CreateEventModalData } from "~/components/dashboard/modals/modals/CreateEventModal";
import { deleteEventAction } from "~/data-access/competitions/actions/competition-events";
import { format } from "date-fns";
import { toast } from "sonner";
import { TimelineCard } from "~/components/timeline/TimelineCard";
import { CreateEventSchema } from "~/lib/schemas/timeline.schema";
import { useRouter } from "next/navigation";

// Types corresponding to DB logic
interface Event {
    id: string;
    name: string;
    type: string;
    startDate: string | Date | null;
    endDate: string | Date | null;
    description: string | null;
    isSystem: boolean;
    // ... other fields
}

interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

interface TimelineClientProps {
    events: Event[];
    currentRound: Round | null;
    competition: any; // Type strictly if possible, using any for now to match previous code
}

export function TimelineClient({ events, currentRound, competition }: TimelineClientProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { openModal } = useModal();
    const router = useRouter();

    const isSystemRound = currentRound?.isSystem;

    const openEventModal = (modalData: CreateEventModalData) => {
        openModal("createEvent", {
            ...modalData,
            onSuccess: () => {
                modalData.onSuccess?.();
                router.refresh();
            },
        });
    };

    const handleCreateClick = () => {
        if (!currentRound) {
            return;
        }

        openEventModal({
            roundId: currentRound.id,
        });
    };

    const handleEditEvent = (event: Event) => {
        if (!currentRound) {
            return;
        }

        const initialData: CreateEventSchema = {
            name: event.name,
            // @ts-ignore
            eventTypeSelect: event.type,
            description: event.description || "",
            startDate: event.startDate ? new Date(event.startDate) : undefined,
            endDate: event.endDate ? new Date(event.endDate) : undefined,
            // @ts-ignore
            notificationEnabled: event.notificationEnabled ?? true,
            // @ts-ignore
            addToTimeline: event.addToTimeline ?? true,
            // @ts-ignore
            resources: event.resources || [],
        };

        const isStandardType = ["Workshop", "Submission", "Physical Event", "Online Event"].includes(event.type);
        if (!isStandardType) {
            initialData.eventTypeSelect = "other";
            initialData.eventTypeCustom = event.type;
        }

        openEventModal({
            roundId: currentRound.id,
            eventId: event.id,
            initialData,
        });
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setIsDeleting(true);
        try {
            await deleteEventAction(eventId);
            toast.success("Event deleted");
            router.refresh();
        } catch (error) {
            console.error("Failed to delete event", error);
            toast.error("Failed to delete event");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div className="grid gap-4">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">
                        {currentRound ? currentRound.name : "Event Timeline"}
                    </h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        {isSystemRound
                            ? "Configure the main registration period for your competition."
                            : "Map out the events of your competition. Clearly communicate deadlines to all participants."}
                    </p>
                </div>

                {!isSystemRound && (
                    <Button
                        onClick={handleCreateClick}
                        className="h-16 px-8 rounded-3xl bg-[#0c0803] hover:bg-black text-white font-black text-lg gap-3"
                    >
                        <Plus size={24} /> Add Event
                    </Button>
                )}
            </div>

            <div className="relative pt-8">
                {/* Timeline Line */}
                <div className="absolute left-[3.5rem] top-0 bottom-0 w-1 bg-[#e8e2de] rounded-full" />

                <div className="space-y-8">
                    {/* Loading Overlay during Delete */}
                    {isDeleting && (
                        <div className="absolute inset-0 bg-white/50 z-50 flex items-start justify-center pt-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    )}

                    {events.length === 0 && (
                        <div className="pl-20 text-gray-400 italic">No events found for this phase.</div>
                    )}

                    {events.map((event, i) => (
                        <div key={event.id || i} className="flex gap-10 items-start group">
                            {/* Date Bubble */}
                            <div className="relative z-10 w-28 h-28 shrink-0 rounded-[2rem] bg-white border border-[#e8e2de] shadow-sm flex flex-col items-center justify-center p-4 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:border-[#e5ab7d]">
                                <Calendar size={28} className="text-[#e5ab7d] mb-1" />
                                <span className="text-[10px] font-black uppercase text-[#0c0803]/40 tracking-tighter text-center">
                                    {event.startDate ? format(new Date(event.startDate), "MMM d, yyyy") : "TBD"}
                                </span>
                            </div>

                            {/* Card */}
                            <TimelineCard
                                variant="event"
                                className="flex-1"
                                data={{
                                    eventName: event.name,
                                    type: event.type,
                                    description: event.description,
                                    startDatetime: event.startDate || undefined,
                                    endDatetime: event.endDate || undefined,
                                    // @ts-ignore
                                    notificationEnabled: event.notificationEnabled,
                                    // @ts-ignore
                                    addToTimeline: event.addToTimeline,
                                    // @ts-ignore
                                    resources: event.resources,
                                }}
                                onEdit={() => handleEditEvent(event)}
                                onDelete={!event.isSystem ? () => handleDeleteEvent(event.id) : undefined}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
