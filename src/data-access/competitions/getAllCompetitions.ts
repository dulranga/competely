import "server-only";

import { desc, eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations, files } from "~/db/schema";

/**
 * Fetches all published competitions with their organization and banner details
 * 
 * @returns List of competitions with tagline, organization, and banner information
 */
export async function getAllCompetitions() {
    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name,
            tagline: competitions.tagline,
            organizerName: organizations.name,
            category: competitions.category,
            hashtags: competitions.hashtags,
            status: competitions.status,
            deadline: competitions.registrationDeadline,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            bannerId: competitions.bannerId,
            imageUrl: competitions.bannerId,
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.bannerId, files.id))
        .orderBy(desc(competitions.createdAt));

    return results;
}
