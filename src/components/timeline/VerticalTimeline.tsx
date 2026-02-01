"use client";

import { format, parse } from "date-fns";
import { Calendar as CalendarIcon, Clock, List } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "~/lib/utils";
import "react-day-picker/style.css"; // Ensure this is available or use custom styles

interface TimelineEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    type: "MAJOR" | "MILESTONE" | "CRITICAL";
    status: "completed" | "active" | "upcoming";
}

import timelineEvents from "~/components/sample-data/timeline.json";

const events: TimelineEvent[] = timelineEvents.map(event => ({
    ...event,
    type: event.type as "MAJOR" | "MILESTONE" | "CRITICAL",
    status: event.status as "completed" | "active" | "upcoming"
}));

const typeStyles: Record<string, string> = {
    MAJOR: "bg-gray-100 text-gray-600",
    MILESTONE: "bg-gray-100 text-gray-600",
    CRITICAL: "bg-red-100 text-red-600",
};

export function VerticalTimeline() {
    const [view, setView] = useState<"timeline" | "calendar">("timeline");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(),
    );

    // Helper to parse event dates
    const getEventDate = (dateStr: string) =>
        parse(dateStr, "MMM dd, yyyy", new Date());

    // Get events for a specific date
    const getEventsForDate = (date: Date) => {
        return events.filter((event) => {
            const eventDate = getEventDate(event.date);
            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Modifiers for the calendar to highlight dates with events
    const eventDates = events.map((event) => getEventDate(event.date));
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
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="relative flex items-start gap-8 md:gap-12"
                            >
                                {/* Date Node (Left) */}
                                <div className="shrink-0 z-10">
                                    <div
                                        className={cn(
                                            "w-[100px] h-[100px] md:w-[160px] md:h-28 rounded-3xl bg-white border border-border/40 shadow-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group",
                                            event.status === "active"
                                                ? "border-primary/20 ring-4 ring-primary/5"
                                                : "",
                                        )}
                                    >
                                        <CalendarIcon
                                            className={cn(
                                                "h-6 w-6 mb-1",
                                                event.type === "CRITICAL"
                                                    ? "text-red-500"
                                                    : "text-amber-500",
                                            )}
                                        />
                                        <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest text-center px-2">
                                            {event.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Card (Right) */}
                                <div className="flex-1 pt-2">
                                    <div
                                        className={cn(
                                            "bg-white rounded-[2rem] p-6 md:p-8 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 w-full group",
                                            event.status === "active"
                                                ? "border-l-[6px] border-l-primary shadow-lg"
                                                : "",
                                        )}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                                    typeStyles[event.type] || "bg-gray-100 text-gray-600",
                                                )}
                                            >
                                                {event.type}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#1a1b25] mb-2 group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                    <div
                                        key={event.id}
                                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg text-gray-900">
                                                {event.title}
                                            </h4>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                    typeStyles[event.type],
                                                )}
                                            >
                                                {event.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{event.description}</p>
                                        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarIcon className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                    </div>
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
