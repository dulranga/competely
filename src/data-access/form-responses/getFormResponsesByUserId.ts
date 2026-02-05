import "server-only";
import { desc, eq } from "drizzle-orm";
import db from "~/db/client";
import { formResponses } from "~/db/schema";

export async function getFormResponsesByUserId(userId: string) {
    return await db.query.formResponses.findMany({
        where: eq(formResponses.userId, userId),
        orderBy: [desc(formResponses.submittedAt)],
        with: {
            form: {
                columns: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
            answers: {
                with: {
                    field: true,
                },
            },
        },
    });
}
