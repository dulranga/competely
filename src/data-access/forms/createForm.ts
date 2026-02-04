import "server-only";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import db from "~/db/client";
import { forms, competitions } from "~/db/schema";
import { auth } from "~/lib/auth";

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
