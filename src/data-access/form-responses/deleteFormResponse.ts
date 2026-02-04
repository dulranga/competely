import "server-only";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import db from "~/db/client";
import { formResponses } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function deleteFormResponse(responseId: string) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        throw new Error("You must be logged in to delete a form response.");
    }

    const response = await db.query.formResponses.findFirst({
        where: eq(formResponses.id, responseId),
    });

    if (!response) {
        throw new Error("Form response not found.");
    }

    if (response.userId !== session.user.id) {
        throw new Error("You can only delete your own responses.");
    }

    await db.delete(formResponses).where(eq(formResponses.id, responseId));

    return { success: true };
}
