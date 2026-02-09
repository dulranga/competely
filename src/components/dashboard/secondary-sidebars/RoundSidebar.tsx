"use client";

import { Plus, Loader2, Check, X } from "lucide-react";
import { FC, useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import {
    createRoundAction,
    deleteRoundAction,
    fetchRoundsAction,
    updateRoundAction,
} from "~/data-access/competitions/actions/competition-rounds";
import { RoundItem } from "./RoundItem";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

type RoundSidebarProps = {
    getRedirectUrl: (roundId: string) => string;
};
const RoundSidebar: FC<RoundSidebarProps> = ({ getRedirectUrl }) => {
    const queryClient = useQueryClient();
    const [isCreatingInput, setIsCreatingInput] = useState(false);
    const [newRoundName, setNewRoundName] = useState("");
    const newRoundInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRoundId = searchParams.get("roundId");

    const {
        data: rounds = [],
        isLoading,
        error: roundsError,
    } = useQuery({
        queryKey: ["timeline", "rounds"],
        queryFn: () => fetchRoundsAction(),
    });

    useEffect(() => {
        if (isCreatingInput && newRoundInputRef.current) {
            newRoundInputRef.current.focus();
        }
    }, [isCreatingInput]);

    useEffect(() => {
        if (roundsError) {
            console.error("Failed to load rounds:", roundsError);
            toast.error("Failed to load competition rounds");
        }
    }, [roundsError]);

    const createRoundMutation = useMutation({
        mutationFn: (name: string) => createRoundAction(name),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["timeline", "rounds"] });
            toast.success("Round created successfully");
        },
        onError: (error) => {
            console.error("Failed to create round:", error);
            toast.error("Failed to create round");
        },
    });

    const renameRoundMutation = useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => updateRoundAction(id, name),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["timeline", "rounds"] });
            toast.success("Round renamed");
        },
        onError: (error) => {
            console.error("Failed to rename round:", error);
            toast.error("Failed to rename round");
        },
    });

    const deleteRoundMutation = useMutation({
        mutationFn: (id: string) => deleteRoundAction(id),
        onSuccess: async (_, id) => {
            await queryClient.invalidateQueries({ queryKey: ["timeline", "rounds"] });
            toast.success("Round deleted");

            if (currentRoundId === id) {
                const fallbackRound = rounds.find((round) => round.id !== id);
                if (fallbackRound) {
                    router.push(`/dashboard/timeline?roundId=${fallbackRound.id}`);
                }
            }
        },
        onError: (error) => {
            console.error("Failed to delete round:", error);
            toast.error("Failed to delete round");
        },
    });

    const handleCreateRound = async () => {
        if (!newRoundName.trim()) {
            setIsCreatingInput(false);
            return;
        }

        await createRoundMutation.mutateAsync(newRoundName.trim());
        setNewRoundName("");
        setIsCreatingInput(false);
    };

    const handleRenameRound = async (id: string, newName: string) => {
        await renameRoundMutation.mutateAsync({ id, name: newName });
    };

    const handleDeleteRound = async (id: string) => {
        await deleteRoundMutation.mutateAsync(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCreateRound();
        } else if (e.key === "Escape") {
            setIsCreatingInput(false);
            setNewRoundName("");
        }
    };

    const handleSelectRound = (roundId: string) => {
        router.push(getRedirectUrl(roundId));
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                <span className="text-xs">Loading rounds...</span>
            </div>
        );
    }

    if (roundsError) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-destructive text-sm px-4 text-center">
                Unable to load competition phases. Please refresh and try again.
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
                        isSelected={currentRoundId === round.id}
                        onSelect={() => handleSelectRound(round.id)}
                        onRename={handleRenameRound}
                        onDelete={handleDeleteRound}
                    />
                ))}

                {isCreatingInput && (
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
                            disabled={createRoundMutation.isPending}
                        >
                            <Check size={14} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => {
                                setIsCreatingInput(false);
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
                    onClick={() => setIsCreatingInput(true)}
                    disabled={isCreatingInput}
                >
                    <Plus size={16} />
                    Add Round
                </Button>
            </div>
        </div>
    );
};
export default RoundSidebar;
