import { ContactUsSection } from "~/components/competition-page/ContactUsSection";
import { CountdownSection } from "~/components/competition-page/CountdownSection";
import { HeroSection } from "~/components/competition-page/HeroSection";
import { InfoCard } from "~/components/competition-page/InfoCard";
import { PrizesSection } from "~/components/competition-page/PrizesSection";
import { RegisterButton } from "~/components/competition-page/RegisterButton";
import { RegistrationCard } from "~/components/competition-page/RegistrationCard";
import { TimelineSection } from "~/components/competition-page/TimelineSection";
import CompetitionAnnouncementBanner from "~/components/delegate/announcements/CompetitionAnnouncementBanner";

interface CompetitionPageContentProps {
    data: any; // Using any for now to match the implicit type from getPublicCompetitionDetails, ideally should be typed
    competitionId: string;
    isPreview?: boolean;
}

export function CompetitionPageContent({ data, competitionId, isPreview = false }: CompetitionPageContentProps) {
    if (!data) {
        return <div>Competition not found</div>;
    }

    const bannerUrl = data.banner?.id ? `/api/upload?file_id=${data.banner.id}` : null;
    const logoUrl = data.logo?.id ? `/api/upload?file_id=${data.logo.id}` : null;



    // Transform events for timeline
    const timelineEvents = data.rounds
        ?.flatMap((round: any) =>
            round.events
                ?.filter((event: any) => event.addToTimeline)
                .map((event: any) => ({
                    id: event.id,
                    roundName: round.name, // We will show round name instead of competition name
                    eventName: event.name,
                    startDatetime: event.startDate ? new Date(event.startDate) : null,
                    endDatetime: event.endDate ? new Date(event.endDate) : null,
                    status: getEventStatus(event.startDate, event.endDate),
                    competitionName: round.name, // reusing prop for round name as requested
                }))
        )
        .sort((a: any, b: any) => {
            if (!a.startDatetime) return 1;
            if (!b.startDatetime) return -1;
            return a.startDatetime.getTime() - b.startDatetime.getTime();
        }) || [];

    console.log("CompetitionPageContent DEBUG: timelineEvents", timelineEvents);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <HeroSection
                bannerUrl={bannerUrl}
                logoUrl={logoUrl}
                organization={data.organization}
                societyName={data.societyName}
                startDate={data.startDate}
                endDate={data.endDate}
                competitionId={competitionId}
                isBookmarked={data.isBookmarked}
                isRegistered={data.isRegistered}
                isPreview={isPreview}
            />

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                {/* Announcement Banner */}
                <div className="mb-12">
                    <CompetitionAnnouncementBanner
                        competitionId={competitionId}
                        competitionName={data.organization?.name}
                    />
                </div>

                {/* Top Section: Info + InfoCard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-12">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black uppercase mb-4 tracking-tight">
                                {data.organization?.name}
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium mb-8">{data.tagline}</p>

                            <div className="prose prose-lg text-muted-foreground space-y-6 max-w-none">
                                {data.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                ) : (
                                    <>
                                        <p>
                                            Codefest is the ultimate 24-hour hackathon organized by Tec Dev club. We
                                            challenge developers, designers, and visionaries to step away from textbooks
                                            and turn wild ideas into working prototypes. Whether you are a coding
                                            veteran or a first-time hacker, this is your platform to build the future.
                                        </p>
                                        {/* Fallback Static Content */}
                                        <div>
                                            <h3 className="text-foreground font-bold mb-2">Why Participate?</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>
                                                    <strong>Build Real Solutions:</strong> Tackle industry challenges in
                                                    tracks like [List 2-3 main themes, e.g., AI, FinTech].
                                                </li>
                                                <li>
                                                    <strong>Connect & Learn:</strong> Network with industry experts and
                                                    find your future mentors.
                                                </li>
                                                <li>
                                                    <strong>Win Big:</strong> Compete for a prize pool of [Amount] and
                                                    exclusive titles.
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-10">
                            <RegisterButton
                                competitionId={competitionId}
                                registrationDeadline={data.registrationDeadline}
                                className="font-bold text-xl px-8 py-6"
                                isPreview={isPreview}
                                isRegistered={data.isRegistered}
                            />
                        </div>
                    </div>

                    {/* Sidebar Column (Top) */}
                    <div className="lg:col-span-4 space-y-8">
                        <InfoCard
                            socialLinks={data.socialLinks}
                            registrationDeadline={data.registrationDeadline}
                            registeredCount={data.registeredCount}
                        />
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t border-border my-12" />

                <div className="mb-8">
                    <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Registration</h2>
                    <p className="text-lg text-muted-foreground">Sign up in minutes and get started.</p>
                </div>

                {/* Bottom Section: Countdown + RegistrationCard Side-by-Side */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <CountdownSection registrationDeadline={data.registrationDeadline} />
                    </div>
                    <div className="lg:col-span-4">
                        <RegistrationCard
                            competitionId={competitionId}
                            registrationDeadline={data.registrationDeadline}
                            isPreview={isPreview}
                            isRegistered={data.isRegistered}
                            resources={data.resources.map((r: any) => ({
                                id: r.id,
                                label: r.label,
                                type: r.type as "document" | "url",
                                url: r.url,
                                file: r.file ? { id: r.file.id, fileName: r.file.fileName } : null,
                            }))}
                        />
                    </div>
                </div>
            </main>

            <TimelineSection events={timelineEvents} />

            <PrizesSection prizes={data.prizes} />

            <ContactUsSection
                contacts={
                    data.contacts?.map((c: any) => ({
                        id: c.id,
                        name: c.name,
                        role: c.role,
                        email: c.email,
                        phone: c.phone,
                        imageUrl: c.imageId ? `/api/upload?file_id=${c.imageId}` : null,
                    })) || []
                }
            />
        </div>
    );
}

function getEventStatus(startDate: string | Date | null, endDate: string | Date | null): "upcoming" | "active" | "completed" {
    if (!startDate) return "upcoming";
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 6 * 60 * 60 * 1000); // Default 6 hours if no end date

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "active";
    return "completed";
}
