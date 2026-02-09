"use server";

import "server-only";

import { stringify } from "csv-stringify/sync";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitionEvents, formFields } from "~/db/schema";
import logger from "~/lib/logger";
import { getAllFormResponsesByFormId } from "../form-responses/getFormResponsesByFormId";
import { getUser } from "../getCurrentUser";

export async function getFormSubmissionsCSVByEventId(eventId: string) {
    const user = await getUser();
    try {
        if (!user) {
            throw new Error("User not found");
        }

        const [event] = await db.select().from(competitionEvents).where(eq(competitionEvents.id, eventId)).limit(1);

        if (!event) {
            throw new Error("Event not found");
        }

        if (!event.formId) {
            throw new Error("No form associated with this event");
        }

        const formId = event.formId;

        const [submissions, fields] = await Promise.all([
            getAllFormResponsesByFormId(formId),
            db.select().from(formFields).where(eq(formFields.formId, formId)).orderBy(formFields.order),
        ]);

        const csvData = submissions.data.map((resp) => {
            const row: Record<string, any> = {
                "User Name": resp.user.name,
                "User Email": resp.user.email,
                "Submitted At": resp.submittedAt.toISOString(),
            };

            for (const field of fields) {
                const answer = resp.answers.find((a) => a.fieldId === field.id);
                const header = `${field.name}(${field.type})`;
                let value = answer?.value ?? "";

                if (Array.isArray(value)) {
                    value = value.join(", ");
                } else if (typeof value === "object" && value !== null) {
                    value = JSON.stringify(value);
                }

                row[header] = value;
            }

            return row;
        });

        const csv = stringify(csvData, {
            header: true,
            columns: ["User Name", "User Email", "Submitted At", ...fields.map((f) => `${f.name}(${f.type})`)],
        });

        return new File([csv], `export_submissions_${event.name}.csv`, {
            type: "text/csv",
        });
    } catch (error) {
        logger.error("Failed to export leads:", error);
        throw new Error("Failed to export leads");
    }
}
