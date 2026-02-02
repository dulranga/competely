"use client";

import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

interface DateTimePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    disabledRange?: { before: Date };
}

export function DateTimePicker({ value, onChange, disabledRange }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) {
            onChange?.(undefined);
            return;
        }

        // Preserve time if it exists in current value
        const newDate = new Date(selectedDate);
        if (value) {
            newDate.setHours(value.getHours());
            newDate.setMinutes(value.getMinutes());
        } else {
            // Default to 12:00 if no previous time
            newDate.setHours(12);
            newDate.setMinutes(0);
        }
        onChange?.(newDate);
    };

    const handleTimeChange = (type: "hour" | "minute", timeValue: string) => {
        if (!value) return;
        const newDate = new Date(value);

        if (type === "hour") {
            newDate.setHours(parseInt(timeValue));
        } else if (type === "minute") {
            newDate.setMinutes(parseInt(timeValue));
        }
        onChange?.(newDate);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal h-12 rounded-xl bg-input-background border-input hover:bg-accent/40",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {value ? format(value, "PPP HH:mm") : <span>Pick a date & time</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                <div className="flex divide-x divide-border/50">
                    <div className="p-3">
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={handleDateSelect}
                            disabled={disabledRange}
                            initialFocus
                        />
                    </div>
                    <div className="p-4 flex flex-col gap-4 bg-muted/20 min-w-[150px]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span>Select Time</span>
                        </div>

                        <div className="flex gap-2 h-[200px]">
                            <ScrollArea className="h-full w-16 rounded-md border bg-background">
                                <div className="p-1 gap-1 flex flex-col">
                                    {hours.map((hour) => (
                                        <Button
                                            key={hour}
                                            variant={value && value.getHours() === hour ? "default" : "ghost"}
                                            size="sm"
                                            className="w-full shrink-0"
                                            onClick={() => handleTimeChange("hour", hour.toString())}
                                            disabled={!value}
                                            type="button"
                                        >
                                            {hour.toString().padStart(2, "0")}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                            <ScrollArea className="h-full w-16 rounded-md border bg-background">
                                <div className="p-1 gap-1 flex flex-col">
                                    {minutes.map((minute) => (
                                        <Button
                                            key={minute}
                                            variant={value && value.getMinutes() === minute ? "default" : "ghost"}
                                            size="sm"
                                            className="w-full shrink-0"
                                            onClick={() => handleTimeChange("minute", minute.toString())}
                                            disabled={!value}
                                            type="button"
                                        >
                                            {minute.toString().padStart(2, "0")}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
