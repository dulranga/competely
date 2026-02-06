import "server-only";

import { cache } from "react";
import db from "~/db/client";
import { getUserSession } from "./getCurrentUser";

/**
 * Retrieves the full profile of the currently authenticated user.
 * 
 * This function:
 * 1. Gets the current session to identify the user.
 * 2. Fetches the user's full record from the database.
 * 
 * @returns {Promise<User>} The authenticated user's profile.
 * @throws Will propagate the redirect from getUserSession if not authenticated.
 */
export const getUserProfile = cache(async () => {
    const session = await getUserSession();

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, session.user.id),
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
});
