"use client";

import { useState, useTransition } from "react";
import { INTERESTS } from "./constants";
import { InterestCard } from "~/components/interests/interest-card";
import { Button } from "~/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { saveInterestsAction } from "./actions";

export function InterestsClient() {
    const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
    const [isPending, startTransition] = useTransition();

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
        if (selectedInterests.size < 3) {
            toast.error("Please select at least 3 interests to continue.");
            return;
        }

        startTransition(async () => {
            try {
                await saveInterestsAction(Array.from(selectedInterests));
                toast.success("Interests saved successfully!");
            } catch (error) {
                console.error(error);
                toast.error("Failed to save interests. Please try again.");
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-6 md:p-12 animate-in fade-in duration-500 pb-32">
            <div className="w-full max-w-7xl space-y-8">
                <div className="text-center space-y-2 mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900">
                        What are your Interests?
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                        Select the topics that excite you the most to curate your journey.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    {INTERESTS.map((interest) => (
                        <InterestCard
                            key={interest.id}
                            interest={interest}
                            isSelected={selectedInterests.has(interest.id)}
                            onToggle={toggleInterest}
                            className="w-full"
                        />
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-4 flex justify-center md:relative md:bg-transparent md:border-none md:p-0 mt-8 mb-8 z-50">
                    <Button
                        size="lg"
                        onClick={handleContinue}
                        disabled={isPending}
                        className="group text-lg px-8 py-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                Saving...
                                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            </>
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
