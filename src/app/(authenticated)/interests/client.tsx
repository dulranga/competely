"use client";

import { useState } from "react";
import { INTERESTS } from "./constants";
import { InterestCard } from "~/components/interests/interest-card";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function InterestsClient() {
    const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

    const toggleInterest = (id: string) => {
        const newSelected = new Set(selectedInterests);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedInterests(newSelected);
    };

    const handleContinue = () => {
        if (selectedInterests.size === 0) {
            toast.error("Please select at least one interest to continue.");
            return;
        }

        // Mock action
        console.log("Selected interests:", Array.from(selectedInterests));
        toast.success("Interests saved! (Mock)");
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-6 md:p-12 animate-in fade-in duration-500">
            <div className="w-full max-w-7xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-slate-900">
                        What are your Interests?
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Select the topics that excite you the most.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {INTERESTS.map((interest) => (
                        <InterestCard
                            key={interest.id}
                            interest={interest}
                            isSelected={selectedInterests.has(interest.id)}
                            onToggle={toggleInterest}
                        />
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-4 flex justify-center md:relative md:bg-transparent md:border-none md:p-0 mt-8 mb-8 z-50">
                    <Button
                        size="lg"
                        onClick={handleContinue}
                        className="group text-lg px-8 py-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105"
                    >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
