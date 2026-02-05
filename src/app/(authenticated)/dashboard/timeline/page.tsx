"use client";

import { FC, useEffect, useState } from "react";
import { Plus, Loader2, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import CreateEventModal from "~/components/dashboard/modals/modals/CreateEventModal";
import { Dialog } from "~/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { fetchEventsAction, deleteEventAction } from "~/data-access/competitions/actions/competition-events";
import { fetchRoundsAction, fetchCompetitionAction } from "~/data-access/competitions/actions/competition-rounds";
import { format } from "date-fns";
import { toast } from "sonner";
import { TimelineCard } from "~/components/timeline/TimelineCard";
import { CreateEventSchema } from "~/lib/schemas/timeline.schema";

// Types corresponding to DB logic
interface Event {
    id: string;
    name: string;
    type: string;
    startDate: string | Date | null;
    endDate: string | Date | null;
    description: string | null;
    isSystem: boolean;
}

interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

interface ModalState {
    isOpen: boolean;
    eventId?: string;
    initialData?: CreateEventSchema;
}

const TimelinePage: FC = () => {
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false });
    const [events, setEvents] = useState<Event[]>([]);
    const [currentRound, setCurrentRound] = useState<Round | null>(null);
    const [competition, setCompetition] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const roundIdParam = searchParams.get("roundId");

    useEffect(() => {
        loadData();
    }, [roundIdParam]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch Rounds to determine current round
            // @ts-ignore
            const rounds = await fetchRoundsAction();
            const comp = await fetchCompetitionAction();
            setCompetition(comp);

            let selectedRound = rounds.find((r: any) => r.id === roundIdParam);
            if (!selectedRound && rounds.length > 0) {
                selectedRound = rounds[0];
            }
            setCurrentRound(selectedRound as Round);

            if (selectedRound) {
                // 2. Fetch Events for selected round
                // @ts-ignore
                const roundEvents = await fetchEventsAction(selectedRound.id);

                // If System Round (Registration), sync dates with Competition Global Dates for display
                if (selectedRound.isSystem && comp) {
                    const mappedEvents = roundEvents.map((e: any) => {
                        if (e.isSystem) {
                            return {
                                ...e,
                                startDate: comp.startDate,
                                endDate: comp.endDate
                            };
                        }
                        return e;
                    });
                    // @ts-ignore
                    setEvents(mappedEvents);
                } else {
                    // @ts-ignore
                    setEvents(roundEvents);
                }
            } else {
                setEvents([]);
            }

        } catch (error) {
            console.error("Failed to load timeline data", error);
            toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    const isSystemRound = currentRound?.isSystem;

    const handleCreateClick = () => {
        setModalState({ isOpen: true, eventId: undefined, initialData: undefined });
    };

    const handleEditEvent = (event: Event) => {
        // Map event to schema
        // Note: resources might need mapping if DB structure differs slightly, but assuming mostly compatible
        const initialData: any = {
            name: event.name,
            eventTypeSelect: event.type, // Map back if needed
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

        // If type is not in enum, set to 'other' and set custom
        const isStandardType = ["Workshop", "Submission", "Physical Event", "Online Event"].includes(event.type);
        if (!isStandardType) {
            initialData.eventTypeSelect = "other";
            initialData.eventTypeCustom = event.type;
        }

        setModalState({
            isOpen: true,
            eventId: event.id,
            initialData,
        });
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteEventAction(eventId);
            toast.success("Event deleted");
            loadData();
        } catch (error) {
            console.error("Failed to delete event", error);
            toast.error("Failed to delete event");
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
                            : "Map out the milestones of your competition. Clearly communicate deadlines to all participants."}
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

            <Dialog
                open={modalState.isOpen}
                onOpenChange={(open) => {
                    if (!open) setModalState(prev => ({ ...prev, isOpen: false }));
                }}
            >
                {modalState.isOpen && currentRound && (
                    <CreateEventModal
                        closeModal={() => {
                            setModalState(prev => ({ ...prev, isOpen: false }));
                            loadData(); // Refresh on close
                        }}
                        data={{
                            roundId: currentRound.id,
                            eventId: modalState.eventId,
                            initialData: modalState.initialData
                        }}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default TimelinePage;
