import "server-only";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import db from "~/db/client";
import { formResponses, formResponseAnswers } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function updateFormResponse(data: {
    responseId: string;
    answers: Record<string, unknown>; // fieldId -> value
}) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        throw new Error("You must be logged in to update a form response.");
    }

    return await db.transaction(async (tx) => {
        const response = await tx.query.formResponses.findFirst({
            where: eq(formResponses.id, data.responseId),
        });

        if (!response) {
            throw new Error("Form response not found.");
        }

        if (response.userId !== session.user.id) {
            throw new Error("You can only update your own responses.");
        }

        await tx.delete(formResponseAnswers).where(eq(formResponseAnswers.responseId, data.responseId));

        const answers = Object.entries(data.answers).map(([fieldId, value]) => ({
            responseId: data.responseId,
            fieldId,
            value,
        }));

        if (answers.length > 0) {
            await tx.insert(formResponseAnswers).values(answers);
        }

        const [updatedResponse] = await tx
            .update(formResponses)
            .set({ updatedAt: new Date() })
            .where(eq(formResponses.id, data.responseId))
            .returning();

        return updatedResponse;
    });
}
