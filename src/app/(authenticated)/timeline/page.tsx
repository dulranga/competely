import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { VerticalTimeline } from "~/components/timeline/VerticalTimeline";
import { auth } from "~/lib/auth";
import { getDelegateTimeline } from "~/data-access/delegate/timeline";

export default async function TimelinePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const { user } = session;

    const timelineEvents = await getDelegateTimeline(user);

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <div className="flex-1 w-full bg-[#fbf6f3]">
                <VerticalTimeline events={timelineEvents} />
            </div>

            <FooterBottom />
        </div>
    );
}
