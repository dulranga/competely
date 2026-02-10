import "server-only";

import { desc, eq, sql, gt, and } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations, files, members } from "~/db/schema";

export interface TrendingCompetition {
    id: string;
    title: string;
    organizerName: string;
    description: string | null;
    bannerId: string | null;
    imageUrl: string | null;
    startDate: Date | null;
    endDate: Date | null;
    registeredCount: number;
    deadline: Date | null;
    category: string | null;
    status: "draft" | "published" | "archived"; // Update based on enum if needed
}

/**
 * Fetches trending competitions based on registration count.
 * Filters for active competitions (end date in the future).
 * 
 * @returns List of top 10 competitions order by registered delegate count.
 */
export async function getTrendingCompetitions() {
    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name, // Following existing pattern where org name is title
            organizerName: organizations.name,
            description: competitions.shortDescription,
            bannerId: competitions.bannerId,
            imageUrl: competitions.posterId, // details usually use poster
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            deadline: competitions.registrationDeadline,
            category: competitions.category,
            status: competitions.status,
            registeredCount: sql<number>`(
                SELECT count(${members.id})
                FROM ${members}
                WHERE ${members.organizationId} = ${competitions.organizationId}
                AND ${members.role} = 'delegate'
            )`.mapWith(Number),
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.posterId, files.id))
        .where(
            and(
                gt(competitions.endDate, new Date())
            )
        )
        .orderBy(sql`(
            SELECT count(${members.id})
            FROM ${members}
            WHERE ${members.organizationId} = ${competitions.organizationId}
            AND ${members.role} = 'delegate'
        ) DESC`)
        .limit(10);

    return results;
}
