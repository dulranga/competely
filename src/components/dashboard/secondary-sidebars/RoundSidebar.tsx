"use client";

import { Plus, Loader2, Check, X } from "lucide-react";
import { FC, useEffect, useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import {
    createRoundAction,
    deleteRoundAction,
    fetchRoundsAction,
    updateRoundAction,
} from "~/data-access/competitions/actions/competition-rounds";
import { RoundItem } from "./RoundItem";
import { Input } from "~/components/ui/input";
import { toast } from "sonner"; // Assuming sonner is used, or replace with appropriate toast

interface Round {
    id: string;
    name: string;
    order: number;
}

const RoundSidebar: FC = () => {
    const [rounds, setRounds] = useState<Round[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newRoundName, setNewRoundName] = useState("");
    const newRoundInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadRounds();
    }, []);

    useEffect(() => {
        if (isCreating && newRoundInputRef.current) {
            newRoundInputRef.current.focus();
        }
    }, [isCreating]);

    const loadRounds = async () => {
        try {
            // @ts-ignore - The action returns inferred Drizzle type which aligns with our interface mostly
            const data = await fetchRoundsAction();
            setRounds(data as any);
        } catch (error) {
            console.error("Failed to load rounds:", error);
            toast.error("Failed to load competition rounds");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateRound = async () => {
        if (!newRoundName.trim()) {
            setIsCreating(false);
            return;
        }

        try {
            await createRoundAction(newRoundName);
            await loadRounds();
            setNewRoundName("");
            setIsCreating(false);
            toast.success("Round created successfully");
        } catch (error) {
            console.error("Failed to create round:", error);
            toast.error("Failed to create round");
        }
    };

    const handleRenameRound = async (id: string, newName: string) => {
        try {
            await updateRoundAction(id, newName);
            setRounds(rounds.map(r => r.id === id ? { ...r, name: newName } : r));
            toast.success("Round renamed");
        } catch (error) {
            console.error("Failed to rename round:", error);
            toast.error("Failed to rename round");
            throw error; // Re-throw to let child component handle error state if needed
        }
    };

    const handleDeleteRound = async (id: string) => {
        try {
            await deleteRoundAction(id);
            setRounds(rounds.filter(r => r.id !== id));
            toast.success("Round deleted");
        } catch (error) {
            console.error("Failed to delete round:", error);
            toast.error("Failed to delete round");
            throw error;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCreateRound();
        } else if (e.key === "Escape") {
            setIsCreating(false);
            setNewRoundName("");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                <span className="text-xs">Loading rounds...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-2 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c0803]/30">
                    Competition Phases
                </h3>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {rounds.map((round) => (
                    <RoundItem
                        key={round.id}
                        round={round}
                        onRename={handleRenameRound}
                        onDelete={handleDeleteRound}
                    />
                ))}

                {isCreating && (
                    <div className="flex items-center gap-2 h-11 px-2 animate-in slide-in-from-bottom-2 fade-in">
                        <Input
                            ref={newRoundInputRef}
                            value={newRoundName}
                            onChange={(e) => setNewRoundName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Round Name..."
                            className="h-8 text-xs font-bold"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={handleCreateRound}
                        >
                            <Check size={14} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => {
                                setIsCreating(false);
                                setNewRoundName("");
                            }}
                        >
                            <X size={14} />
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-[#e8e2de]">
                <Button
                    variant="competely"
                    className="w-full h-11 rounded-xl text-xs uppercase tracking-widest font-black"
                    onClick={() => setIsCreating(true)}
                    disabled={isCreating}
                >
                    <Plus size={16} />
                    Add Round
                </Button>
            </div>
        </div>
    );
};
export default RoundSidebar;
