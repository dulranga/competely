"use client"

import { useState, useEffect } from "react"

interface CountdownSectionProps {
    registrationDeadline?: Date | null;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

type DisplayMode = "days" | "hours" | "minutes";

function calculateTimeLeft(deadline: Date | null | undefined): TimeLeft {
    if (!deadline) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

function getDisplayMode(timeLeft: TimeLeft): DisplayMode {
    if (timeLeft.days > 0) return "days";
    if (timeLeft.hours > 0) return "hours";
    return "minutes";
}

function formatDigit(num: number): [string, string] {
    const str = num.toString().padStart(2, "0");
    return [str[0], str[1]];
}

export function CountdownSection({ registrationDeadline }: CountdownSectionProps) {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(registrationDeadline));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(registrationDeadline));
        }, 1000);

        return () => clearInterval(timer);
    }, [registrationDeadline]);

    const displayMode = getDisplayMode(timeLeft);

    // Determine which values and labels to show based on mode
    let primaryValue: number;
    let secondaryValue: number;
    let primaryLabel: string;
    let secondaryLabel: string;

    switch (displayMode) {
        case "days":
            primaryValue = timeLeft.days;
            secondaryValue = timeLeft.hours;
            primaryLabel = "Days";
            secondaryLabel = "Hours";
            break;
        case "hours":
            primaryValue = timeLeft.hours;
            secondaryValue = timeLeft.minutes;
            primaryLabel = "Hours";
            secondaryLabel = "Minutes";
            break;
        case "minutes":
            primaryValue = timeLeft.minutes;
            secondaryValue = timeLeft.seconds;
            primaryLabel = "Minutes";
            secondaryLabel = "Seconds";
            break;
    }

    const [primaryTens, primaryOnes] = formatDigit(primaryValue);
    const [secondaryTens, secondaryOnes] = formatDigit(secondaryValue);

    return (
        <div className="py-8">
            <div className="flex items-center gap-4 md:gap-8">
                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {primaryTens}
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {primaryOnes}
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">{primaryLabel}</p>
                </div>

                <div className="text-6xl md:text-8xl font-black pb-12 text-foreground">:</div>

                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {secondaryTens}
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {secondaryOnes}
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">{secondaryLabel}</p>
                </div>
            </div>
        </div>
    )
}
