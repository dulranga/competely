"use client";

import { cn } from "~/lib/utils";
import type { Interest } from "~/app/(authenticated)/interests/constants";

interface InterestCardProps {
    interest: Interest;
    isSelected: boolean;
    onToggle: (id: string) => void;
    className?: string; // Allow external override/positioning
}

export function InterestCard({ interest, isSelected, onToggle, className }: InterestCardProps) {
    const Icon = interest.icon;

    return (
        <button
            type="button"
            onClick={() => onToggle(interest.id)}
            className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2",
                // Different layouts for different sizes could be handled here if needed,
                // but flex-col usually works well for adaptive content.
                "h-full min-h-[140px]", // Reduced height slightly since cards are smaller
                interest.color.light,
                interest.color.dark,
                isSelected ? "ring-2 ring-offset-1 ring-black/20 scale-[1.02] shadow-md" : "opacity-90 hover:opacity-100",
                interest.className, // Apply the flex width classes from the constant
                className
            )}
        >
            <div className="flex flex-col gap-2 z-10 w-full mb-2">
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                    {interest.label}
                </h3>
                <div className="flex flex-wrap gap-1">
                    {interest.description.map((desc, i) => (
                        // Show very minimal description or just first item
                        <span key={i} className="text-xs text-slate-700 font-medium opacity-80 leading-snug">
                            {desc}{i < interest.description.length - 1 ? " • " : ""}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end w-full mt-auto z-10">
                <Icon className="h-8 w-8 text-slate-900" strokeWidth={1.5} />
            </div>

            {/* Selection Checkmark */}
            {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center animate-in zoom-in duration-200 z-20 shadow-sm">
                    <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </button>
    );
}
