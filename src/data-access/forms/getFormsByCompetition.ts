import "server-only";
import { eq, asc } from "drizzle-orm";
import db from "~/db/client";
import { forms, formFields } from "~/db/schema";

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
