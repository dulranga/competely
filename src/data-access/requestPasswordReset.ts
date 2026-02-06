"use server";

import "server-only";

import { auth } from "~/lib/auth";

export async function requestPasswordReset(email: string, redirectUrl: string) {
    const res = await auth.api.requestPasswordReset({
        body: {
            email,
            redirectTo: redirectUrl,
        },
    });

    if (res.status) {
        return { success: true, message: "Password reset requested successfully" };
    }

    return { success: false, message: res.message || "Failed to request password reset" };
}
