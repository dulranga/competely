"use client"

import Image from "next/image"
import { StatusBadge } from "~/components/StatusBadge"

interface HeroSectionProps {
    bannerUrl?: string | null;
    logoUrl?: string | null;
    societyName?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    organization?: {
        name: string;
    } | null;
}

export function HeroSection({ bannerUrl, logoUrl, societyName, startDate, endDate, organization }: HeroSectionProps) {
    // Default fallback image if no banner is provided
    const bgImage = bannerUrl ?? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

    // Organization details
    const orgName = societyName || organization?.name || "Tec Dev club";
    // Use uploaded logo if available, otherwise generated avatar
    const orgLogoUrl = logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(orgName)}&background=0D8ABC&color=fff&size=128`;


    return (
        <section className="relative w-full h-[300px] md:h-[400px] bg-muted">
            {/* Background Image - Pure, no gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20">
                <StatusBadge startDate={startDate} endDate={endDate} />
            </div>

            {/* Logo Overlay - Positioned to overlap the bottom edge */}
            <div className="relative w-full h-full max-w-7xl mx-auto z-20 pointer-events-none">
                <div className="absolute -bottom-16 right-4 md:right-10 pointer-events-auto">
                    <div className="text-center flex flex-col items-center">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-background rounded-full flex items-center justify-center p-1 border border-border shadow-xl">
                            {/* Logo Image */}
                            <div className="w-full h-full relative flex items-center justify-center bg-background rounded-full overflow-hidden">
                                <Image
                                    src={orgLogoUrl}
                                    alt={orgName}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-xs md:text-sm font-medium text-muted-foreground hidden md:block">{orgName}</p>
                        {/* Placeholder for university or extra info if available, hardcoded for now or hidden if empty */}
                        {/* <p className="text-[10px] text-muted-foreground hidden md:block">University</p> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
