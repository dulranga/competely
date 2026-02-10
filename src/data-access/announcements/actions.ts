"use server";

import "server-only";
import db from "~/db/client";
import { announcements, bookmarks, competitionRounds, organizations } from "~/db/schema";
import { eq } from "drizzle-orm";
import { notifyAnnouncement } from "../delegate/notification-templates";
import {
    getAllUserAnnouncementsDAL,
    getAnnouncementsByCompetitionDAL,
    getLatestAnnouncementByCompetitionDAL,
    getLatestAnnouncementForUserDAL,
} from "./get-announcements";
import { revalidatePath } from "next/cache";

export async function createAnnouncementAction(roundId: string, title: string, content: string) {
    if (!roundId || !title || !content) {
        throw new Error("Missing required fields");
    }

    // 1. Get competition details for the round
    const round = await db.query.competitionRounds.findFirst({
        where: eq(competitionRounds.id, roundId),
        with: {
            competition: {
                with: {
                    organization: true,
                },
            },
        },
    });

    if (!round) {
        throw new Error("Round not found");
    }

    const competitionId = round.competitionId;
    const competitionName = round.competition.organization.name;

    // 2. Insert announcement
    const [result] = await db
        .insert(announcements)
        .values({
            roundId,
            title,
            content,
        })
        .returning();

    // 3. Notify all registered delegates
    const registeredUsers = await db.query.bookmarks.findMany({
        where: (bookmarks, { and, eq }) =>
            and(eq(bookmarks.competitionId, competitionId), eq(bookmarks.isRegistered, true)),
    });

    // Send notifications in parallel
    await Promise.all(registeredUsers.map((user) => notifyAnnouncement(user.userId, competitionName, title)));

    revalidatePath("/(authenticated)/dashboard/analytics", "page");
    revalidatePath("/(authenticated)/my-competitions", "page");
    revalidatePath(`/(public)/c/${competitionId}`, "page");

    return result;
}

export async function getLatestAnnouncementAction() {
    return await getLatestAnnouncementForUserDAL();
}

export async function getAllUserAnnouncementsAction() {
    return await getAllUserAnnouncementsDAL();
}

export async function getLatestAnnouncementByCompetitionAction(competitionId: string) {
    return await getLatestAnnouncementByCompetitionDAL(competitionId);
}

export async function getAnnouncementsByCompetitionAction(competitionId: string) {
    return await getAnnouncementsByCompetitionDAL(competitionId);
}
