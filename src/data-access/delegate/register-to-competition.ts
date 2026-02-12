import "server-only";

import { eq, and } from "drizzle-orm";
import db from "~/db/client";
import { bookmarks, competitions, members } from "~/db/schema";
import { getUserSession } from "../getCurrentUser";

import { notifyCompetitionRegistration } from "./notification-templates";

/**
 * Registers the current user to a competition.
 * Adds the user to the competition's organization with the 'delegate' role
 * and updates their registration status in the bookmarks table.
 *
 * @param competitionId - The ID of the competition to register for
 */
export async function registerToCompetitionDAL(competitionId: string) {
    const session = await getUserSession();
    const userId = session.user.id;

    // 1. Get competition details to find its organization
    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.id, competitionId),
        with: {
            organization: true,
        }
    });

    if (!competition) {
        throw new Error("Competition not found.");
    }

    // 2. Server-side deadline validation (SECURITY: blocks hackers)
    if (competition.registrationDeadline) {
        const deadline = new Date(competition.registrationDeadline);
        const now = new Date();
        if (now > deadline) {
            throw new Error("Registration deadline has passed. You can no longer register for this competition.");
        }
    }

    const organizationId = competition.organizationId;

    // 2. Add user to the organization as a delegate if they aren't already a member
    const existingMember = await db.query.members.findFirst({
        where: and(eq(members.organizationId, organizationId), eq(members.userId, userId)),
    });

    if (!existingMember) {
        await db.insert(members).values({
            id: crypto.randomUUID(),
            organizationId,
            userId,
            role: "delegate",
            createdAt: new Date(),
        });
    } else if (existingMember.role === "member") {
        // Optionlly upgrade generic "member" to "delegate" if needed,
        // but usually people join as delegates specifically.
        await db.update(members).set({ role: "delegate" }).where(eq(members.id, existingMember.id));
    }

    // 3. Mark as registered in the bookmarks table
    const existingBookmark = await db.query.bookmarks.findFirst({
        where: and(eq(bookmarks.userId, userId), eq(bookmarks.competitionId, competitionId)),
    });

    if (existingBookmark) {
        await db
            .update(bookmarks)
            .set({ isRegistered: true })
            .where(and(eq(bookmarks.userId, userId), eq(bookmarks.competitionId, competitionId)));
    } else {
        await db.insert(bookmarks).values({
            userId,
            competitionId,
            isBookmarked: false,
            isRegistered: true,
        });
    }

    // 4. Send notification
    const competitionName = competition.societyName || competition.organization?.name || "Competition";
    // We don't await this to keep the response fast, or we can await if we want to ensure delivery before returning success
    // Ideally use background job, but for now await is fine as it's a DB write
    await notifyCompetitionRegistration(userId, competitionId, competitionName);

    return { success: true };
}
