import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitionEventResources, competitionEvents } from "~/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type CompetitionEvent = InferSelectModel<typeof competitionEvents>;
export type CompetitionEventResource = InferSelectModel<typeof competitionEventResources>;

// Type for creating/updating resources
export interface ResourceInput {
    label: string;
    type: "document" | "url";
    url?: string | null;
    fileId?: string | null;
}

// Type for creating events
export interface CreateEventInput {
    roundId: string;
    name: string;
    type: string;
    description?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    resources: ResourceInput[];
    isSystem?: boolean;
}

// Type for updating events
export interface UpdateEventInput {
    name: string;
    type: string;
    description?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    resources: ResourceInput[];
    addToTimeline?: boolean;
    notificationEnabled?: boolean;
    location?: string | null;
    connectFormId?: string | null; // For linking a form to the event, if applicable
}

/**
 * Fetches all events for a specific round, including their resources.
 */
export async function getEventsByRound(roundId: string) {
    return await db.query.competitionEvents.findMany({
        where: eq(competitionEvents.roundId, roundId),
        with: {
            resources: true,
            form: {
                columns: { name: true, id: true },
            },
        },
    });
}

/**
 * Fetches a single event by ID.
 * @param eventId
 */
export async function getCompetitionEvent(eventId: string) {
    return await db.query.competitionEvents.findFirst({
        where: eq(competitionEvents.id, eventId),
        with: {
            resources: true,
        },
    });
}

/**
 * Creates a new event and its associated resources in a transaction.
 */
export async function createCompetitionEvent(data: CreateEventInput) {
    return await db.transaction(async (tx) => {
        // 1. Create the event
        const [newEvent] = await tx
            .insert(competitionEvents)
            .values({
                roundId: data.roundId,
                name: data.name,
                type: data.type,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                isSystem: data.isSystem ?? false,
            })
            .returning();

        // 2. Create resources if any
        if (data.resources.length > 0) {
            await tx.insert(competitionEventResources).values(
                data.resources.map((res) => ({
                    eventId: newEvent.id,
                    label: res.label,
                    type: res.type,
                    url: res.url,
                    fileId: res.fileId,
                })),
            );
        }

        return newEvent;
    });
}

/**
 * Updates an event and its resources.
 * For resources, it deletes existing ones and re-inserts the new list.
 */
export async function updateCompetitionEvent(eventId: string, data: UpdateEventInput) {
    return await db.transaction(async (tx) => {
        // 1. Update event details
        const [updatedEvent] = await tx
            .update(competitionEvents)
            .set({
                name: data.name,
                type: data.type,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                addToTimeline: data.addToTimeline,
                notificationEnabled: data.notificationEnabled,
                location: data.location,
                formId: data.connectFormId,
            })
            .where(eq(competitionEvents.id, eventId))
            .returning();

        // 2. Handle Resources: Delete all existing and re-insert
        // This is a simple strategy ensuring the UI state matches DB state exactly.
        await tx.delete(competitionEventResources).where(eq(competitionEventResources.eventId, eventId));

        if (data.resources.length > 0) {
            await tx.insert(competitionEventResources).values(
                data.resources.map((res) => ({
                    eventId: eventId,
                    label: res.label,
                    type: res.type,
                    url: res.url,
                    fileId: res.fileId,
                })),
            );
        }

        return updatedEvent;
    });
}

/**
 * Deletes an event. Resources are deleted via database cascade if configured,
 * but explicit delete here ensures cleanup if cascade isn't set.
 */
export async function deleteCompetitionEvent(eventId: string) {
    // Note: If ON DELETE CASCADE is set in schema, resources delete automatically.
    // If not, we might fail here. Assuming cascade is set or we delete manual if needed.
    // The schema defined `references(() => competitionEvents.id, { onDelete: "cascade" })` so we are good.
    const [deletedEvent] = await db.delete(competitionEvents).where(eq(competitionEvents.id, eventId)).returning();
    return deletedEvent;
}
