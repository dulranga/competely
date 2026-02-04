import "server-only";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { formFields } from "~/db/schema";

export async function setFormFields(formId: string, fields: any[]) {
    // Standard approach: delete old and insert new or use a transaction with sync logic
    // For simplicity in a builder, we can delete all existing fields for this form and re-insert them
    // This ensures order and composition are perfectly synced with the frontend state
    await db.transaction(async (tx) => {
        await tx.delete(formFields).where(eq(formFields.formId, formId));

        if (fields.length > 0) {
            await tx.insert(formFields).values(
                fields.map((f, index) => ({
                    id: f.id || crypto.randomUUID(),
                    formId,
                    name: f.name,
                    type: f.type,
                    required: f.required ?? false,
                    order: index,
                    config: f.config || {},
                })),
            );
        }
    });
}
