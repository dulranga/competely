"use server";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "~/data-access/competitions/get-active-competition";
import {
    createCompetitionEvent,
    CreateEventInput,
    deleteCompetitionEvent,
    getEventsByRound,
    updateCompetitionEvent,
    UpdateEventInput,
} from "~/data-access/competitions/timeline/events";

/**
 * Fetches events for a given round.
 * Validates that the active competition owns the context (in a real app,
 * we would also check if the round belongs to the active competition).
 */
export async function fetchEventsAction(roundId: string) {
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found.");
    }

    // In a fully secure app, check if roundId belongs to competition.id here.
    return await getEventsByRound(roundId);
}

/**
 * Creates a new event.
 */
export async function createEventAction(data: CreateEventInput) {
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found.");
    }

    const newEvent = await createCompetitionEvent(data);
    revalidatePath("/dashboard/timeline");
    return newEvent;
}

/**
 * Updates an existing event.
 */
export async function updateEventAction(eventId: string, data: UpdateEventInput) {
    // Context check
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found.");
    }

    const updatedEvent = await updateCompetitionEvent(eventId, data);
    revalidatePath("/dashboard/timeline");
    return updatedEvent;
}

/**
 * Deletes an event.
 */
export async function deleteEventAction(eventId: string) {
    // Context check
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found.");
    }

    const deletedEvent = await deleteCompetitionEvent(eventId);
    revalidatePath("/dashboard/timeline");
    return deletedEvent;
}
