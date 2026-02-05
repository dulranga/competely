import "server-only";
import { eq, asc } from "drizzle-orm";
import db from "~/db/client";
import { forms, formFields } from "~/db/schema";

export async function getFormById(id: string) {
    return await db.query.forms.findFirst({
        where: eq(forms.id, id),
        with: {
            fields: {
                orderBy: [asc(formFields.order)],
            },
        },
    });
}
