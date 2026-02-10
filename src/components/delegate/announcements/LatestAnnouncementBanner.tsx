"use client";

import { useQuery } from "@tanstack/react-query";
import { Megaphone, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getLatestAnnouncementAction } from "~/data-access/announcements/actions";
import AnnouncementsModal from "./AnnouncementsModal";
import { cn } from "~/lib/utils";

export default function LatestAnnouncementBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: latestAnnouncement, isLoading } = useQuery({
        queryKey: ["latest-announcement"],
        queryFn: () => getLatestAnnouncementAction(),
    });

    if (isLoading || !latestAnnouncement) return null;

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full group relative overflow-hidden bg-white border border-[#e8e2de] rounded-[24px] p-6 transition-all hover:shadow-lg hover:border-primary active:scale-[0.99] flex items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6 overflow-hidden">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Megaphone size={24} />
                    </div>
                    <div className="flex flex-col items-start overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Latest Announcement
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c0803]/30">
                                • {latestAnnouncement.competitionName}
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-[#0c0803] truncate w-full text-left">
                            {latestAnnouncement.title}
                        </h4>
                    </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2 text-[#0c0803]/40 group-hover:text-primary transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">View All</span>
                    <ChevronRight size={20} />
                </div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>

            <AnnouncementsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
