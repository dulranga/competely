import "server-only";

import { eq, asc } from "drizzle-orm";
import db from "~/db/client";
import { forms, formFields } from "~/db/schema";

export async function getFormsByUser(userId: string) {
    return await db.query.forms.findMany({
        where: eq(forms.userId, userId),
        with: {
            fields: {
                orderBy: [asc(formFields.order)],
            },
        },
    });
}

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

export async function createForm(userId: string, data: { name: string; description?: string }) {
    const [form] = await db
        .insert(forms)
        .values({
            userId,
            name: data.name,
            description: data.description,
        })
        .returning();
    return form;
}

export async function updateForm(id: string, data: { name?: string; description?: string }) {
    const [updated] = await db
        .update(forms)
        .set({
            ...data,
            updatedAt: new Date(),
        })
        .where(eq(forms.id, id))
        .returning();
    return updated;
}

export async function deleteForm(id: string) {
    await db.delete(forms).where(eq(forms.id, id));
}

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
