"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, List } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "~/lib/utils";
import "react-day-picker/style.css";
import { TimelineCard } from "./TimelineCard";

export interface TimelineEventDef {
    id: string;
    competitionName: string;
    roundName?: string;
    eventName: string;
    description?: string;
    startDatetime: Date;
    endDatetime?: Date;
    type: string;
    status: "completed" | "active" | "upcoming" | string;
    location?: string;
}

interface VerticalTimelineProps {
    events: TimelineEventDef[];
}

export function VerticalTimeline({ events }: VerticalTimelineProps) {
    const [view, setView] = useState<"timeline" | "calendar">("timeline");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(),
    );

    // Get events for a specific date
    const getEventsForDate = (date: Date) => {
        return events.filter((event) => {
            const eventDate = event.startDatetime;
            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Modifiers for the calendar to highlight dates with events
    const eventDates = events.map((event) => event.startDatetime);
    const modifiers = {
        hasEvent: eventDates,
    };

    const modifiersStyles = {
        hasEvent: {
            fontWeight: "bold",
            textDecoration: "underline",
            color: "var(--primary)",
        },
    };

    const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-[#1a1b25] tracking-tight">
                        Your Personal Timeline
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Track all deadlines and important dates from your registered
                        competitions.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setView("timeline")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                            view === "timeline"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black",
                        )}
                    >
                        <List className="w-4 h-4" />
                        Timeline
                    </button>
                    <button
                        type="button"
                        onClick={() => setView("calendar")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                            view === "calendar"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black",
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                        Calendar
                    </button>
                </div>
            </div>

            {/* Content Switcher */}
            {view === "timeline" ? (
                /* Timeline View */
                <div className="relative mt-16">
                    {/* Vertical Line */}
                    <div className="absolute left-[50px] md:left-[80px] top-4 bottom-4 w-0.5 bg-gray-200" />

                    <div className="space-y-12">
                        {events.map((event) => {
                            const isCritical = event.type.toLowerCase().includes("deadline");
                            const isActive = event.status === "active";

                            return (
                                <div
                                    key={event.id}
                                    className="relative flex items-start gap-8 md:gap-12"
                                >
                                    {/* Date Node (Left) */}
                                    <div className="shrink-0 z-10">
                                        <div
                                            className={cn(
                                                "w-[100px] h-[100px] md:w-[160px] md:h-28 rounded-3xl bg-white border border-border/40 shadow-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group",
                                                isActive
                                                    ? "border-primary/20 ring-4 ring-primary/5"
                                                    : "",
                                            )}
                                        >
                                            <CalendarIcon
                                                className={cn(
                                                    "h-6 w-6 mb-1",
                                                    isCritical
                                                        ? "text-red-500"
                                                        : "text-amber-500",
                                                )}
                                            />
                                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest text-center px-2">
                                                {format(event.startDatetime, "MMM dd")}
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                {format(event.startDatetime, "yyyy")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Card (Right) */}
                                    <div className="flex-1 pt-2">
                                        <TimelineCard
                                            variant="delegate"
                                            data={{
                                                competitionName: event.competitionName,
                                                roundName: event.roundName,
                                                eventName: event.eventName,
                                                type: event.type,
                                                status: event.status,
                                                startDatetime: event.startDatetime,
                                                endDatetime: event.endDatetime,
                                                location: event.location,
                                                description: event.description,
                                            }}
                                            className={cn(
                                                isActive ? "border-l-[6px] border-l-primary shadow-lg" : ""
                                            )}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* Calendar View */
                <div className="flex flex-col md:flex-row gap-8 mt-8 fade-in">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shrink-0 h-fit mx-auto md:mx-0">
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}
                            className="bg-white"
                            classNames={{
                                today: `text-primary font-bold`,
                            }}
                        />
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" />
                                {selectedDate
                                    ? format(selectedDate, "MMMM d, yyyy")
                                    : "Select a date"}
                            </h3>
                            <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                                {selectedEvents.length} Events
                            </span>
                        </div>

                        {selectedEvents.length > 0 ? (
                            <div className="space-y-4">
                                {selectedEvents.map((event) => (
                                    <TimelineCard
                                        key={event.id}
                                        variant="calendar"
                                        data={{
                                            competitionName: event.competitionName,
                                            roundName: event.roundName,
                                            eventName: event.eventName,
                                            type: event.type,
                                            status: event.status,
                                            startDatetime: event.startDatetime,
                                            endDatetime: event.endDatetime,
                                            location: event.location,
                                            description: event.description,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
                                <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
                                <p>No events scheduled for this day</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
