import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { accessControl, roles } from "./access-control/ac-system";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        adminClient({
            ac: accessControl,
            roles: roles,
        }),
    ],
});
