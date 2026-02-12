import "server-only";

import { headers } from "next/headers";
import db from "~/db/client";
import { competitions } from "~/db/schema";
import { auth } from "~/lib/auth";
import type { CreateCompetitionSchema } from "~/lib/schemas/competition.schema";
import { slugify } from "~/lib/utils";
import { checkSlugExists } from "../checkSlugExists";

export async function createCompetition(data: CreateCompetitionSchema) {
    const slugBasis = slugify(data.name);

    let slug = slugBasis;
    const isTaken = await checkSlugExists(slug);

    if (isTaken) {
        slug = `${slugBasis}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const response = await auth.api.createOrganization({
        body: {
            name: data.name,
            slug: slug,
        },
        headers: await headers(),
    });

    if (!response) {
        throw new Error("Failed to create organization");
    }

    const [competition] = await db.insert(competitions).values({
        organizationId: response.id,
        tagline: data.tagline,
        shortDescription: data.shortDescription,
        societyName: data.societyName,
        category: data.category,
        hashtags: data.hashtags,
        bannerId: data.bannerId,
        posterId: data.posterId,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationDeadline: data.registrationDeadline,
        status: "draft",
    }).returning();

    return { organization: response, competition };
}
