
import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitionContacts } from "~/db/schema";

export async function getCompetitionContacts(competitionId: string) {
    const contacts = await db.query.competitionContacts.findMany({
        where: eq(competitionContacts.competitionId, competitionId),
        with: {
            image: true,
        },
    });

    return contacts.map((c) => ({
        id: c.id,
        name: c.name,
        role: c.role,
        email: c.email,
        phone: c.phone || "",
        imageId: c.imageId,
        imageUrl: c.image ? getFileUrlById(c.image.id) : null,
    }));
}

import { getFileUrlById } from "~/lib/utils";
