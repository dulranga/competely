import "server-only";

import { eq, asc } from "drizzle-orm";
import { headers } from "next/headers";
import db from "~/db/client";
import { forms, formFields, competitions } from "~/db/schema";
import { auth } from "~/lib/auth";

export async function getFormsByCompetition(competitionId: string) {
    return await db.query.forms.findMany({
        where: eq(forms.competitionId, competitionId),
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

export async function createForm(data: { name: string; description?: string }) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.session.activeOrganizationId) {
        throw new Error("No active organization selected. Please select a competition first.");
    }

    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.organizationId, session.session.activeOrganizationId),
    });

    if (!competition) {
        throw new Error("Competition not found for the active organization.");
    }

    const [form] = await db
        .insert(forms)
        .values({
            competitionId: competition.id,
            name: data.name,
            description: data.description,
        })
        .returning();
    return form;
}

export async function updateForm(id: string, data: { name?: string; description?: string; published?: boolean }) {
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
