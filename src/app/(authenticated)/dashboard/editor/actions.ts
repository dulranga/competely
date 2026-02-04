"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "~/data-access/competitions/getActiveCompetition";
import { updateCompetition } from "~/data-access/competitions/updateCompetition";
import { createCompetitionSchema } from "~/lib/schemas/competition.schema";

export async function updateCompetitionAction(values: unknown) {
    const validatedFields = createCompetitionSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    try {
        const activeCompetition = await getActiveCompetition();

        if (!activeCompetition) {
            return {
                error: "No active competition found.",
            };
        }

        await updateCompetition(activeCompetition.id, validatedFields.data);
        revalidatePath("/dashboard/editor");
        return { success: "Competition updated successfully!" };
    } catch (error) {
        return {
            error: (error as Error).message || "Failed to update competition",
        };
    }
}
