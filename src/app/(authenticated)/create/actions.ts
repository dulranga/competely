"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { createCompetition } from "~/data-access/competitions/createCompetition";
import { createCompetitionSchema } from "~/lib/schemas/competition.schema";

export async function createCompetitionAction(values: unknown) {
    const validatedFields = createCompetitionSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    try {
        const organization = await createCompetition(validatedFields.data);
        revalidatePath("/create");
        return { success: "Competition created!", id: organization.id };
    } catch (error) {
        return {
            error: (error as Error).message || "Failed to create competition",
        };
    }
}
