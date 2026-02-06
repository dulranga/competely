"use server";

import { revalidatePath } from "next/cache";
import { registerToCompetitionDAL } from "./register-to-competition";

/**
 * Server action to register a user to a competition.
 */
export async function registerToCompetitionAction(competitionId: string) {
    try {
        const result = await registerToCompetitionDAL(competitionId);
        revalidatePath(`/c/${competitionId}`);
        revalidatePath("/dashboard");
        revalidatePath("/bookmarks");
        return result;
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            error: (error as Error).message || "An unexpected error occurred during registration.",
        };
    }
}
