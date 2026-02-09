"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "~/data-access/competitions/getActiveCompetition";
import { updateCompetition } from "~/data-access/competitions/updateCompetition";
import { createCompetitionSchema } from "~/lib/schemas/competition.schema";

export async function updateCompetitionAction(values: unknown) {
    console.log("UpdateCompetitionAction received values:", values); // Debug log
    const validatedFields = createCompetitionSchema.safeParse(values);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        const errorMessages = Object.entries(fieldErrors)
            .map(([field, errors]) => `${field}: ${errors?.join(", ")}`)
            .join("; ");

        console.error("Validation errors:", validatedFields.error.format());

        return {
            error: `Invalid fields: ${errorMessages}`,
            fieldErrors: fieldErrors,
        };
    }

    console.log("Validated data:", validatedFields.data); // Debug log

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
