"use client"

import { MapPin, FileText, Clock, Users, Globe } from "lucide-react"
import { Card } from "~/components/ui/card"
import { SOCIAL_PLATFORMS } from "~/components/dashboard/editor/maininformationsection/constants"

interface SocialLink {
    platform: string;
    url: string;
}

interface InfoCardProps {
    socialLinks?: SocialLink[];
    registrationDeadline?: Date | null;
    registeredCount?: number;
}

function formatRegistrationDeadline(date: Date | null | undefined): string {
    if (!date) return "TBA";
    const dateStr = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return `${dateStr} - ${timeStr}`;
}

export function InfoCard({ socialLinks = [], registrationDeadline, registeredCount = 0 }: InfoCardProps) {
    return (
        <Card className="rounded-3xl border-border shadow-sm p-8">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-gray-400" />
                <span>Info</span>
            </h3>
            <p className="text-gray-500 text-sm mb-6 pl-9">
                See more details about this competition
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">BMICH</span>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <FileText className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Guidelines</span>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Registration Deadline - {formatRegistrationDeadline(registrationDeadline)}</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                    <Users className="w-5 h-5 text-gray-700 mt-1" />
                    <div>
                        <span className="text-gray-900 font-semibold block">Participants - {registeredCount}</span>
                    </div>
                </div>

                {socialLinks.length > 0 && (
                    <div className="pt-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Follow us</p>
                        <div className="flex gap-3 flex-wrap">
                            {socialLinks.map((link, index) => {
                                const platformInfo = SOCIAL_PLATFORMS.find(p => p.value === link.platform);
                                const Icon = platformInfo ? platformInfo.icon : Globe;

                                return (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:scale-110 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
