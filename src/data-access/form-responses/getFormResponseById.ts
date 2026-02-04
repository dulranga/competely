import "server-only";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { formResponses } from "~/db/schema";

export async function getFormResponseById(responseId: string) {
    return await db.query.formResponses.findFirst({
        where: eq(formResponses.id, responseId),
        with: {
            answers: {
                with: {
                    field: true,
                },
            },
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            form: {
                columns: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
        },
    });
}
