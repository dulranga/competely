"use client";

import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { VerticalTimeline } from "~/components/timeline/VerticalTimeline";

export default function TimelinePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <HeaderAuthenticated currentPath="/home" />

            <div className="flex-1 w-full bg-[#fbf6f3]">
                <VerticalTimeline />
            </div>

            <FooterBottom />
        </div>
    );
}
