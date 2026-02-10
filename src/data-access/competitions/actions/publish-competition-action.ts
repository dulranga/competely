"use server";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "../get-active-competition";
import { publishCompetition } from "../publishCompetition";

export async function publishCompetitionAction() {
    const competition = await getActiveCompetition();

    if (!competition) {
        throw new Error("No active competition found to publish.");
    }

    const result = await publishCompetition(competition.id);

    if (!result) {
        throw new Error("Failed to publish competition.");
    }

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/competition/${competition.id}`);

    return { success: true };
}
