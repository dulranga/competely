"use server";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "../get-active-competition";
import { publishCompetition } from "../publishCompetition";

import { notifyCompetitionPublished } from "~/data-access/delegate/notification-templates";
import { getUserSession } from "~/data-access/getCurrentUser";

export async function publishCompetitionAction() {
    const competition = await getActiveCompetition();

    if (!competition) {
        throw new Error("No active competition found to publish.");
    }

    const result = await publishCompetition(competition.id);

    if (!result) {
        throw new Error("Failed to publish competition.");
    }

    // Send notification
    const session = await getUserSession();
    // competition.organization comes from getActiveCompetition now
    const competitionName = competition.societyName || competition.organization?.name || "Competition";

    // Note: If we really need organization name fallback, we'd need to fetch org.
    // But for publishing, the competition usually has a set name/societyName by now.
    await notifyCompetitionPublished(session.user.id, competition.id, competitionName);

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/competition/${competition.id}`);

    return { success: true };
}
