"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, Megaphone } from "lucide-react";
import {
    getAllUserAnnouncementsAction,
    getAnnouncementsByCompetitionAction,
} from "~/data-access/announcements/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";

interface AnnouncementsModalProps {
    isOpen: boolean;
    onClose: () => void;
    competitionId?: string;
}

export default function AnnouncementsModal({ isOpen, onClose, competitionId }: AnnouncementsModalProps) {
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: competitionId ? ["competition-announcements", competitionId] : ["all-announcements"],
        queryFn: () =>
            competitionId ? getAnnouncementsByCompetitionAction(competitionId) : getAllUserAnnouncementsAction(),
        enabled: isOpen,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col p-0 gap-0 overflow-hidden rounded-[32px] border-[#e8e2de]">
                <DialogHeader className="p-8 border-b border-[#f3f0ee] bg-[#fbf6f3]">
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight text-[#0c0803] flex items-center gap-3">
                        <Megaphone className="text-primary" size={28} />
                        Announcements
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 px-8 py-2">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-sm font-bold uppercase tracking-widest text-[#0c0803]/40">
                                Loading announcements...
                            </p>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Megaphone className="h-16 w-16 text-[#0c0803]/5 mb-4" />
                            <p className="text-xl font-bold text-[#0c0803]/40 uppercase tracking-widest">
                                No announcements yet
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-10 py-8">
                            {announcements.map((ann) => (
                                <div key={ann.id} className="group flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                                                {ann.competitionName}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c0803]/40">
                                                • {ann.roundName}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#0c0803]/40 uppercase tracking-widest">
                                            {format(new Date(ann.createdAt), "MMM d, yyyy")}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0c0803] group-hover:text-primary transition-colors">
                                        {ann.title}
                                    </h3>
                                    <p className="text-[#0c0803]/70 text-base leading-relaxed whitespace-pre-wrap">
                                        {ann.content}
                                    </p>
                                    <div className="h-px w-full bg-[#f3f0ee] mt-4" />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
