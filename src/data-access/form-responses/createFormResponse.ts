import "server-only";
import { headers } from "next/headers";
import db from "~/db/client";
import { formResponses, formResponseAnswers } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function createFormResponse(data: {
    formId: string;
    answers: Record<string, unknown>; // fieldId -> value
}) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        throw new Error("You must be logged in to submit a form.");
    }

    return await db.transaction(async (tx) => {
        const [response] = await tx
            .insert(formResponses)
            .values({
                formId: data.formId,
                userId: session.user.id,
            })
            .returning();

        if (!response) {
            throw new Error("Failed to create form response.");
        }

        const answers = Object.entries(data.answers).map(([fieldId, value]) => ({
            responseId: response.id,
            fieldId,
            value,
        }));

        if (answers.length > 0) {
            await tx.insert(formResponseAnswers).values(answers);
        }

        return response;
    });
}
