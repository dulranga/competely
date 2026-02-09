
import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitionContacts } from "~/db/schema";

export type ContactInput = {
    name: string;
    role: string;
    email: string;
    phone?: string;
    imageId?: string | null;
};

export async function updateCompetitionContacts(
    competitionId: string,
    contacts: ContactInput[]
) {
    return await db.transaction(async (tx) => {
        // 1. Delete existing contacts for this competition
        // This is a simple strategy for managing lists where ID persistence isn't critical for other relations
        await tx
            .delete(competitionContacts)
            .where(eq(competitionContacts.competitionId, competitionId));

        // 2. Insert new contacts if any
        if (contacts.length > 0) {
            await tx.insert(competitionContacts).values(
                contacts.map((contact) => ({
                    competitionId,
                    name: contact.name,
                    role: contact.role,
                    email: contact.email,
                    phone: contact.phone || null,
                    imageId: contact.imageId || null,
                }))
            );
        }

        return { success: true };
    });
}
