"use server";

import { headers } from "next/headers";
import { auth } from "~/lib/auth";

export async function updatePassword(currentPassword: string, newPassword: string) {
    const headerParams = await headers();
    try {
        // Attempt to change password using better-auth API
        const result = await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            },
            headers: headerParams,
        });

        return { success: true };
    } catch (error: any) {
        // Better auth errors usually have a message or body
        const errorMessage = error.body?.message || error.message || "Failed to update password";
        return { success: false, error: errorMessage };
    }
}
