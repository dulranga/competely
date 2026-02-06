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

    if (registeredCompIds.length === 0 && bookmarkedOnlyIds.length === 0) {
        return [];
    }

    // 2. Build the query conditions
    const conditions = [];

    if (registeredCompIds.length > 0) {
        conditions.push(inArray(competitions.id, registeredCompIds));
    }

    // For bookmarked only, we only want system events (registration deadline)
    if (bookmarkedOnlyIds.length > 0) {
        conditions.push(
            and(
                inArray(competitions.id, bookmarkedOnlyIds),
                eq(competitionEvents.isSystem, true)
            )
        );
    }

    // 3. Fetch events
    const rawEvents = await db
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
        .where(or(...conditions))
        .orderBy(asc(competitionEvents.startDate));

    // 4. Transform to TimelineEventDef
    const timelineEvents: TimelineEventDef[] = rawEvents.map((event) => {
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

        return {
            id: event.eventId,
            competitionName: event.organizationName,
            roundName: event.roundName,
            eventName: event.eventName,
            description: event.eventDescription || undefined,
            startDatetime: start || new Date(),
            endDatetime: end || undefined,
            type: event.eventType, // Keeping "type" as the DB type for now, used in UI for styling
            status: status,
            location: event.location || undefined,
        };
    });

    return timelineEvents;
}
