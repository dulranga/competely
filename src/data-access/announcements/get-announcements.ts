import "server-only";
import { and, desc, eq } from "drizzle-orm";
import db from "~/db/client";
import { announcements, bookmarks, competitionRounds, competitions, organizations } from "~/db/schema";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

export async function getAnnouncementsByRoundDAL(roundId: string) {
    return await db.query.announcements.findMany({
        where: eq(announcements.roundId, roundId),
        orderBy: [desc(announcements.createdAt)],
    });
}

export async function getLatestAnnouncementForUserDAL() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) return null;

    const result = await db
        .select({
            id: announcements.id,
            title: announcements.title,
            content: announcements.content,
            createdAt: announcements.createdAt,
            roundName: competitionRounds.name,
            competitionName: organizations.name,
        })
        .from(announcements)
        .innerJoin(competitionRounds, eq(announcements.roundId, competitionRounds.id))
        .innerJoin(competitions, eq(competitionRounds.competitionId, competitions.id))
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .innerJoin(bookmarks, eq(competitions.id, bookmarks.competitionId))
        .where(and(eq(bookmarks.userId, session.user.id), eq(bookmarks.isRegistered, true)))
        .orderBy(desc(announcements.createdAt))
        .limit(1);

    return result[0] || null;
}

export async function getAllUserAnnouncementsDAL() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) return [];

    return await db
        .select({
            id: announcements.id,
            title: announcements.title,
            content: announcements.content,
            createdAt: announcements.createdAt,
            roundName: competitionRounds.name,
            competitionName: organizations.name,
        })
        .from(announcements)
        .innerJoin(competitionRounds, eq(announcements.roundId, competitionRounds.id))
        .innerJoin(competitions, eq(competitionRounds.competitionId, competitions.id))
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .innerJoin(bookmarks, eq(competitions.id, bookmarks.competitionId))
        .where(and(eq(bookmarks.userId, session.user.id), eq(bookmarks.isRegistered, true)))
        .orderBy(desc(announcements.createdAt));
}

export async function getLatestAnnouncementByCompetitionDAL(competitionId: string) {
    const result = await db
        .select({
            id: announcements.id,
            title: announcements.title,
            content: announcements.content,
            createdAt: announcements.createdAt,
            roundName: competitionRounds.name,
            competitionId: competitionRounds.competitionId,
        })
        .from(announcements)
        .innerJoin(competitionRounds, eq(announcements.roundId, competitionRounds.id))
        .where(eq(competitionRounds.competitionId, competitionId))
        .orderBy(desc(announcements.createdAt))
        .limit(1);

    return result[0] || null;
}

export async function getAnnouncementsByCompetitionDAL(competitionId: string) {
    return await db
        .select({
            id: announcements.id,
            title: announcements.title,
            content: announcements.content,
            createdAt: announcements.createdAt,
            roundName: competitionRounds.name,
            competitionName: organizations.name,
        })
        .from(announcements)
        .innerJoin(competitionRounds, eq(announcements.roundId, competitionRounds.id))
        .innerJoin(competitions, eq(competitionRounds.competitionId, competitions.id))
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .where(eq(competitions.id, competitionId))
        .orderBy(desc(announcements.createdAt));
}
