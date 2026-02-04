import "server-only";
import { and, eq } from "drizzle-orm";
import db from "~/db/client";
import { formResponses } from "~/db/schema";

export async function getUserFormResponse(userId: string, formId: string) {
    return await db.query.formResponses.findFirst({
        where: and(eq(formResponses.userId, userId), eq(formResponses.formId, formId)),
        with: {
            answers: {
                with: {
                    field: true,
                },
            },
        },
    });
}
