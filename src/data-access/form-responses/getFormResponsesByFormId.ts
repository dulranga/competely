import "server-only";
import { desc, eq } from "drizzle-orm";
import db from "~/db/client";
import { formResponses } from "~/db/schema";

export async function getFormResponsesByFormId(formId: string) {
    return await db.query.formResponses.findMany({
        where: eq(formResponses.formId, formId),
        orderBy: [desc(formResponses.submittedAt)],
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
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
