"use client"

import { useState, useEffect } from "react"

interface CountdownSectionProps {
    registrationDeadline?: Date | null;
}

function calculateTimeLeft(deadline: Date | null | undefined): { days: number; hours: number } {
    if (!deadline) {
        return { days: 0, hours: 0 };
    }

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours };
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

    const [dayTens, dayOnes] = formatDigit(timeLeft.days);
    const [hourTens, hourOnes] = formatDigit(timeLeft.hours);

    return (
        <div className="py-8">
            <div className="flex items-center gap-4 md:gap-8">
                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {dayTens}
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {dayOnes}
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">Days</p>
                </div>

                <div className="text-6xl md:text-8xl font-black pb-12 text-foreground">:</div>

                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {hourTens}
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            {hourOnes}
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">Hours</p>
                </div>
            </div>
        </div>
    )
}
