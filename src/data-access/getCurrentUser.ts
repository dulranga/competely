import "server-only";

import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

/**
 * Retrieves the current user's session using cached authentication.
 * If no session is found, redirects the user to the login page.
 *
 * @returns {Promise<Session>} The authenticated user's session object.
 * @throws Redirects to "/login" if the session is not available.
 */
export const getUserSession = cache(async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/login");
    }

    return session;
});

/**
 * Retrieves the current authenticated user's information from the session.
 *
 * This function uses caching to optimize repeated calls. It asynchronously fetches
 * the user session and returns the user object associated with the session.
 *
 * @returns {Promise<User>} A promise that resolves to the current user's data.
 */
export const getUser = cache(async () => {
    const session = await getUserSession();

    return session.user;
});
