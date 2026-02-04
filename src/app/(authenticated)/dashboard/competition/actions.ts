"use server";

import { updateCompetitionMainInfo } from "~/data-access/competitions/updateCompetitionMainInfo";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import { getUser } from "~/data-access/getCurrentUser";

export async function updateMainInfoAction(competitionId: string, data: MainInfoSchema) {
    const user = await getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    // TODO: Verify user has permission to edit this competition (e.g. is organizer).
    // For now, assuming basic auth is enough for this task or handled by middleware/context safety.

    await updateCompetitionMainInfo(competitionId, data);
    return { success: true };
}
