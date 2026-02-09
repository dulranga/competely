"use client";

import { Check, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useModal } from "~/components/dashboard/modals/modal-provider";

import { Round } from "./RoundSidebar"; // Import Round interface

interface RoundItemProps {
    round: Round;
    isSelected?: boolean;
    onSelect?: () => void;
    onRename: (id: string, newName: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export const RoundItem: FC<RoundItemProps> = ({ round, isSelected, onSelect, onRename, onDelete }) => {
    const { openModal } = useModal();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(round.name);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = async () => {
        if (!editName.trim() || editName === round.name) {
            setIsEditing(false);
            setEditName(round.name);
            return;
        }

        setIsSubmitting(true);
        try {
            await onRename(round.id, editName);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to rename round", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await onDelete(round.id);
        } catch (error) {
            console.error("Failed to delete round", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setEditName(round.name);
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 h-11 px-2">
                <Input
                    ref={inputRef}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                    className="h-8 text-xs font-bold"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-green-600 hovered:text-green-700 hover:bg-green-50"
                    onClick={handleSave}
                    disabled={isSubmitting}
                >
                    <Check size={14} />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => {
                        setIsEditing(false);
                        setEditName(round.name);
                    }}
                    disabled={isSubmitting}
                >
                    <X size={14} />
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className={`group flex items-center gap-1 w-full ${isSelected ? "bg-black/5 rounded-xl" : ""}`}>
                <Button
                    variant="ghost"
                    onClick={onSelect}
                    className={`flex-1 justify-start h-11 rounded-xl border transition-all duration-200 active:scale-[0.98] px-4 font-bold text-xs truncate shadow-sm ${
                        isSelected
                            ? "bg-[#0c0803] text-white border-[#0c0803] hover:bg-[#0c0803]/90 hover:text-white"
                            : "bg-white border-[#e8e2de] text-[#0c0803]/80 hover:text-[#0c0803] hover:bg-white hover:border-[#0c0803]/20 hover:shadow-md"
                    }`}
                >
                    {round.name}
                </Button>

                {!round.isSystem && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreVertical size={14} className="text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                <Pencil className="mr-2 h-3.5 w-3.5" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    openModal("confirm", {
                                        title: "Delete Round",
                                        description: `Are you sure you want to delete "${round.name}"? This action cannot be undone and will delete all events associated with this round.`,
                                        variant: "destructive",
                                        confirmLabel: "Delete Round",
                                        onConfirm: handleDelete,
                                    })
                                }
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <Trash2 className="mr-2 h-3.5 w-3.5" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </>
    );
};
