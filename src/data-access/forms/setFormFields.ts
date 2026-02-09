import "server-only";
import { eq, and, notInArray } from "drizzle-orm";
import db from "~/db/client";
import { formFields } from "~/db/schema";
import { FormFieldType } from "~/consts/forms";

export interface FormFieldInput {
    id?: string;
    name: string;
    type: FormFieldType;
    required: boolean;
    config: Record<string, any>;
}

export async function setFormFields(formId: string, fields: FormFieldInput[]) {
    // We use a transaction to ensure all fields are updated/inserted consistently
    // We update existing fields instead of deleting them to preserve form response data (cascading deletes)
    await db.transaction(async (tx) => {
        const activeIds: string[] = [];

        for (const [index, f] of fields.entries()) {
            const fieldId = f.id || crypto.randomUUID();
            activeIds.push(fieldId);

            await tx
                .insert(formFields)
                .values({
                    id: fieldId,
                    formId,
                    name: f.name,
                    type: f.type,
                    required: f.required ?? false,
                    order: index,
                    config: f.config || {},
                })
                .onConflictDoUpdate({
                    target: formFields.id,
                    set: {
                        name: f.name,
                        type: f.type,
                        required: f.required ?? false,
                        order: index,
                        config: f.config || {},
                    },
                });
        }

        // Remove fields that are no longer part of the form
        if (activeIds.length > 0) {
            await tx.delete(formFields).where(and(eq(formFields.formId, formId), notInArray(formFields.id, activeIds)));
        } else {
            // If the incoming array is empty, we clear all fields for this form
            await tx.delete(formFields).where(eq(formFields.formId, formId));
        }
    });
}
