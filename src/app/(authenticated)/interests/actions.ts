"use server";

import { getUserSession } from "~/data-access/getCurrentUser";
import { createUserInterests } from "~/data-access/save-interests";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Server Action to save the user's selected interests.
 * 
 * @param interests - Array of selected interest IDs.
 */
export async function saveInterestsAction(interests: string[]) {
    // 1. Authenticate
    const session = await getUserSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // 2. Validate input (basic check)
    if (!interests || !Array.isArray(interests) || interests.length < 3) {
        // While the client checks this, the server must also enforce it.
        throw new Error("Please select at least 3 interests.");
    }

    // 3. Save to DB
    await createUserInterests(session.user.id, interests);

    // 4. Revalidate/Redirect
    // Assuming the next step is the Dashboard or home
    revalidatePath("/create");
    redirect("/create");
}
