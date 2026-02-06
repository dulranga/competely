import "server-only";

import { and, asc, eq, inArray, or } from "drizzle-orm";
import { type TimelineEventDef } from "~/components/timeline/VerticalTimeline";
import db from "~/db/client";
import {
    bookmarks,
    competitionEvents,
    competitionRounds,
    competitions,
    organizations,
} from "~/db/schema";
import type { User } from "better-auth";

export async function getDelegateTimeline(user: User): Promise<TimelineEventDef[]> {
    // 1. Fetch user's bookmarks/registrations
    const userBookmarks = await db.query.bookmarks.findMany({
        where: eq(bookmarks.userId, user.id),
    });

    if (!userBookmarks.length) {
        return [];
    }

    const registeredCompIds = userBookmarks
        .filter((b) => b.isRegistered)
        .map((b) => b.competitionId);

    const bookmarkedOnlyIds = userBookmarks
        .filter((b) => b.isBookmarked && !b.isRegistered)
        .map((b) => b.competitionId);

    const allRelevantIds = [...registeredCompIds, ...bookmarkedOnlyIds];

    if (allRelevantIds.length === 0) {
        return [];
    }

    // 2. Fetch standard events ONLY for registered competitions
    // We don't fetch from competitionEvents for bookmarked-only because we only want the deadline,
    // which we will fetch from the competitions table to be robust.
    let rawEvents: any[] = [];
    if (registeredCompIds.length > 0) {
        rawEvents = await db
            .select({
                eventId: competitionEvents.id,
                eventName: competitionEvents.name,
                eventType: competitionEvents.type,
                eventDescription: competitionEvents.description,
                startDate: competitionEvents.startDate,
                endDate: competitionEvents.endDate,
                location: competitionEvents.location,
                isSystem: competitionEvents.isSystem,
                roundName: competitionRounds.name,
                competitionId: competitions.id,
                organizationName: organizations.name,
            })
            .from(competitionEvents)
            .innerJoin(competitionRounds, eq(competitionEvents.roundId, competitionRounds.id))
            .innerJoin(competitions, eq(competitionRounds.competitionId, competitions.id))
            .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
            .where(inArray(competitions.id, registeredCompIds))
            .orderBy(asc(competitionEvents.startDate));
    }

    // 3. Fetch Registration Deadlines for ALL (Registered + Bookmarked)
    // This ensures we show the deadline even if no system event exists.
    const deadlineData = await db
        .select({
            competitionId: competitions.id,
            registrationDeadline: competitions.registrationDeadline,
            competitionName: organizations.name,
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .where(inArray(competitions.id, allRelevantIds));

    // 4. Transform and Combine
    const events: TimelineEventDef[] = [];

    // Process standard events
    for (const event of rawEvents) {
        let status = "upcoming";
        const now = new Date();
        const start = event.startDate ? new Date(event.startDate) : null;
        const end = event.endDate ? new Date(event.endDate) : null;

        if (start && start > now) {
            status = "upcoming";
        } else if (start && start <= now && (!end || end > now)) {
            status = "active";
        } else {
            status = "completed";
        }

        if (start) {
            events.push({
                id: event.eventId,
                competitionName: event.organizationName,
                roundName: event.roundName,
                eventName: event.eventName,
                description: event.eventDescription || undefined,
                startDatetime: start,
                endDatetime: end || undefined,
                type: event.eventType,
                status: status,
                location: event.location || undefined,
            });
        }
    }

    // Process deadlines
    for (const comp of deadlineData) {
        if (comp.registrationDeadline) {
            const start = new Date(comp.registrationDeadline);
            const now = new Date();
            let status = "upcoming";
            if (start < now) {
                status = "completed";
            }
            // If it's active? Deadlines are usually points in time, so upcoming or completed.

            // Avoid duplicates: if we already have a "Registration Deadline" event for this competition
            // from the standard events list (unlikely given current logic, but good for safety).
            // Actually, we trust the competitions table deadline more for the "System" definition.
            // But let's just add it. If duplicates appear visually, we can refine.
            // Since standard events are only for REGISTERED, and we fetch deadlines for ALL,
            // we might duplicate for registered users if they have a manual event named "Registration Deadline".
            // Let's rely on type or name to dedup? 
            // For now, assume no conflict and add it.

            events.push({
                id: `deadline-${comp.competitionId}`,
                competitionName: comp.competitionName,
                eventName: "Registration Deadline",
                description: "Last day to register for this competition.",
                startDatetime: start,
                type: "CRITICAL", // Highlight as critical
                status: status,
            });
        }
    }

    // 5. Sort by date
    events.sort((a, b) => a.startDatetime.getTime() - b.startDatetime.getTime());

    return events;
}
