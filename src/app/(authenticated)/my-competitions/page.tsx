import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MyCompetitionsClient } from "./client";
import { auth } from "~/lib/auth";
import { getRegisteredCompetitions } from "~/data-access/delegate/my-competitions";

export default async function CompetitionsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const { user } = session;
    const allRegisteredCompetitions = await getRegisteredCompetitions(user.id);

    // Filter competitions into Active (Registered) and Finished
    // Active: End date is in the future or not set (ongoing/upcoming)
    // Finished: End date is in the past
    const now = new Date();

    const registeredCompetitions = allRegisteredCompetitions.filter(comp => {
        if (!comp.endDate) return true; // If no end date, assume active
        return new Date(comp.endDate) > now;
    });

    const finishedCompetitions = allRegisteredCompetitions.filter(comp => {
        if (!comp.endDate) return false;
        return new Date(comp.endDate) <= now;
    });

    return (
        <MyCompetitionsClient
            registeredCompetitions={registeredCompetitions}
            finishedCompetitions={finishedCompetitions}
        />
    );
}
