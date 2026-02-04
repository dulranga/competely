import "server-only";
import { eq, asc } from "drizzle-orm";
import db from "~/db/client";
import { formFields } from "~/db/schema";

export async function getFormFieldsByFormId(formId: string) {
    return await db.query.formFields.findMany({
        where: eq(formFields.formId, formId),
        orderBy: [asc(formFields.order)],
    });
}
