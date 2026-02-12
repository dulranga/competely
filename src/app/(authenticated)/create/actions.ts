"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { createCompetition } from "~/data-access/competitions/createCompetition";
import { createCompetitionSchema } from "~/lib/schemas/competition.schema";

import { getUserSession } from "~/data-access/getCurrentUser";
import { notifyCompetitionCreated } from "~/data-access/delegate/notification-templates";

export async function createCompetitionAction(values: unknown) {
    const validatedFields = createCompetitionSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    try {
        const session = await getUserSession();
        const { organization, competition } = await createCompetition(validatedFields.data);

        // Send notification
        const competitionName = competition.societyName || organization.name || "Competition";
        await notifyCompetitionCreated(session.user.id, competition.id, competitionName);

        revalidatePath("/create");
        return { success: "Competition created!", id: organization.id };
    } catch (error) {
        return {
            error: (error as Error).message || "Failed to create competition",
        };
    }
}

export async function joinCompetitionAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const competitionCode = formData.get("competitionCode") as string;

    if (!name || !email || !password || !competitionCode) {
        return { error: "All fields are required" };
    }

    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock implementation - failing if code is "INVALID"
    if (competitionCode === "INVALID") {
        return { error: "Invalid competition code" };
    }

    return { success: "Request sent successfully! waiting for approval." };
}
