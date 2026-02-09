"use server";
import "server-only";

import { and, eq, or } from "drizzle-orm";
import db from "~/db/client";
import { bookmarks } from "~/db/schema";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { competitionEvents, competitionRounds, formFields, forms } from "~/db/schema";

export async function getPublicCompetitionDetails(competitionId: string) {
    // Validate UUID format to prevent database errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(competitionId)) {
        return undefined;
    }

    const competition = await db.query.competitions.findFirst({
        where: (competitions, { eq }) => eq(competitions.id, competitionId),
        with: {
            organization: true,
            banner: true,
            poster: true,
            logo: true,
            prizes: true,
            resources: {
                with: {
                    file: true,
                },
            },
            socialLinks: true,
            contacts: {
                with: {
                    // Assuming we might want image if it's a file relation,
                    // but schema says `imageId` references files.
                    // Let's check if relations.ts defined `image` relation for contacts?
                    // Re-checking relations.ts from memory/logs...
                    // competitionContactsRelations: competition: one(competitions).
                    // It didn't seem to have `image` relation explicitly defined in the snippet I saw?
                    // Wait, `competitionContacts` table has `imageId` referencing `files.id`.
                    // But in relations.ts:
                    // export const competitionContactsRelations = relations(competitionContacts, ({ one }) => ({
                    //     competition: one(competitions...)
                    // }));
                    // It MISSES the `image` relation to files!
                    // I should probably fix relations.ts first if I want to fetch the image URL easily.
                    // Or I can just return the ID for now.
                    // Let's stick to what's defined. If relations are missing, I can't fetch `image`.
                    // I'll skip fetching nested image for contacts for now to avoid errors,
                    // or I'll add the relation if I can.
                    // User said "one step at a time". I'll stick to what exists.
                },
            },
            rounds: {
                with: {
                    events: {
                        with: {
                            resources: {
                                with: {
                                    file: true,
                                },
                            },
                        },
                    },
                },
            },
            publishOptions: true,
        },
    });

    if (!competition) {
        return undefined;
    }

    // Check bookmark status for authenticated users
    let isBookmarked = false;
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (session?.user?.id) {
            const bookmark = await db.query.bookmarks.findFirst({
                where: and(
                    eq(bookmarks.userId, session.user.id),
                    eq(bookmarks.competitionId, competitionId)
                ),
            });
            isBookmarked = bookmark?.isBookmarked ?? false;
        }
    } catch {
        // User not authenticated - isBookmarked stays false
    }

    return {
        ...competition,
        isBookmarked,
    };
}

export async function getPublicCompetitionRegistrationDetails(competitionId: string) {
    const rows = await db
        .select({
            event: competitionEvents,
            form: forms,
        })
        .from(competitionEvents)
        .innerJoin(competitionRounds, eq(competitionEvents.roundId, competitionRounds.id))
        .leftJoin(forms, eq(competitionEvents.formId, forms.id))
        .where(
            and(
                eq(competitionRounds.competitionId, competitionId),
                or(eq(competitionEvents.type, "Registration"), eq(competitionEvents.type, "registration")),
                eq(competitionEvents.isSystem, true),
            ),
        )
        .limit(1);

    const row = rows[0];
    if (!row) return { event: null, form: null };

    if (!row.form) return { event: row.event, form: null };

    const fields = await db
        .select()
        .from(formFields)
        .where(eq(formFields.formId, row.form.id))
        .orderBy(formFields.order);

    return {
        event: row.event,
        form: {
            ...row.form,
            fields,
        },
    };
}
