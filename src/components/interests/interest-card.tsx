"use client";

import { cn } from "~/lib/utils";
import type { Interest } from "~/app/(authenticated)/interests/constants";

interface InterestCardProps {
    interest: Interest;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export function InterestCard({ interest, isSelected, onToggle }: InterestCardProps) {
    const Icon = interest.icon;

    return (
        <button
            type="button"
            onClick={() => onToggle(interest.id)}
            className={cn(
                "relative flex w-full items-center justify-between overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2",
                // Base styles
                interest.color.light,
                interest.color.dark, // Border color
                isSelected ? "ring-2 ring-offset-1 ring-black/20 scale-[1.02] shadow-md" : "opacity-90 hover:opacity-100",
            )}
        >
            <div className="flex flex-col gap-2 z-10 max-w-[70%]">
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                    {interest.label}
                </h3>
                <div className="flex flex-col gap-0.5">
                    {interest.description.map((desc, i) => (
                        <span key={i} className="text-xs text-slate-700 font-medium">
                            {desc}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <Icon className="h-12 w-12 text-slate-900" strokeWidth={1.5} />
            </div>

            {/* Selection Checkmark */}
            {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center animate-in zoom-in duration-200">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </button>
    );
}
