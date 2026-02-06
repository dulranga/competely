import db from "~/db/client";

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
            prizes: true,
            resources: {
                with: {
                    file: true,
                }
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
                }
            },
            rounds: {
                with: {
                    events: {
                        with: {
                            resources: {
                                with: {
                                    file: true
                                }
                            }
                        }
                    }
                }
            },
            publishOptions: true,
        },
    });

    return competition;
}
