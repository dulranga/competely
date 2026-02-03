import { relations } from "drizzle-orm";
import { accounts, invitations, members, organizations, sessions, users, verifications } from "./schemas/auth-schema";
import { competitionContacts, competitionPrizes, competitionResources, competitionSocialLinks } from "./schemas/competition-home-schema";
import { competitionEventResources, competitionEvents, competitionRounds } from "./schemas/competition-timeline-schema";
import { competitions } from "./schemas/competitions-schema";
import { files } from "./schemas/files-schema";
import { formFields, forms } from "./schemas/forms-schema";
import { bookmarks, userInterests } from "./schemas/interests-schema";

// Auth Relations
export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
    members: many(members),
    invitations: many(invitations),
    files: many(files),
    interests: many(userInterests),
    bookmarks: many(bookmarks),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    users: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
    members: many(members),
    invitations: many(invitations),
    competitions: many(competitions), // Added implicit relation if needed, or explicitly defined in organizationsRelationsExtended?
    // In competitions-schema.ts, we had `organizationsRelationsExtended`.
    // I should merge that here.
    // The original `organizationsRelations` in auth-schema only had members and invitations.
    // The `organizationsRelationsExtended` in competitions-schema had competition: one(competitions... wait
    // "competition" singular? "one"? No, organization has MANY competitions.
    // Let's check the verify step 173: `competition: one(competitions, { fields: [organizations.id], references: [competitions.organizationId] })`
    // Wait, relations(organizations, ({ one }) => ... competition: one(...)
    // This defines a one-to-one? Or inverse of one-to-many?
    // `competitions.organizationId` references `organizations.id`.
    // So One Organization has Many Competitions.
    // So it should be `competitions: many(competitions)`.
    // Previously `organizationsRelationsExtended` used `one`? "competition: one(competitions...)"
    // If it was `one`, it implies 1:1. But semantic logic says 1 org -> N competitions.
    // I will use `competitions: many(competitions)`.
    // I will use `competitions: many(competitions)`.
}));

export const membersRelations = relations(members, ({ one }) => ({
    organizations: one(organizations, {
        fields: [members.organizationId],
        references: [organizations.id],
    }),
    users: one(users, {
        fields: [members.userId],
        references: [users.id],
    }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
    organizations: one(organizations, {
        fields: [invitations.organizationId],
        references: [organizations.id],
    }),
    users: one(users, {
        fields: [invitations.inviterId],
        references: [users.id],
    }),
}));

// Files Relations
export const filesRelations = relations(files, ({ one }) => ({
    user: one(users, {
        fields: [files.user_id],
        references: [users.id],
    }),
}));

// Competitions Relations
export const competitionsRelations = relations(competitions, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [competitions.organizationId],
        references: [organizations.id],
    }),
    banner: one(files, {
        fields: [competitions.bannerId],
        references: [files.id],
    }),
    prizes: many(competitionPrizes),
    resources: many(competitionResources),
    socialLinks: many(competitionSocialLinks),
    contacts: many(competitionContacts),
    rounds: many(competitionRounds),
    forms: many(forms),
    bookmarks: many(bookmarks),
}));

// Competition Home Relations
export const competitionPrizesRelations = relations(competitionPrizes, ({ one }) => ({
    competition: one(competitions, {
        fields: [competitionPrizes.competitionId],
        references: [competitions.id],
    }),
}));

export const competitionResourcesRelations = relations(competitionResources, ({ one }) => ({
    competition: one(competitions, {
        fields: [competitionResources.competitionId],
        references: [competitions.id],
    }),
    file: one(files, {
        fields: [competitionResources.fileId],
        references: [files.id],
    }),
}));

export const competitionSocialLinksRelations = relations(competitionSocialLinks, ({ one }) => ({
    competition: one(competitions, {
        fields: [competitionSocialLinks.competitionId],
        references: [competitions.id],
    }),
}));

export const competitionContactsRelations = relations(competitionContacts, ({ one }) => ({
    competition: one(competitions, {
        fields: [competitionContacts.competitionId],
        references: [competitions.id],
    }),
}));

// Competition Timeline Relations
export const competitionRoundsRelations = relations(competitionRounds, ({ one, many }) => ({
    competition: one(competitions, {
        fields: [competitionRounds.competitionId],
        references: [competitions.id],
    }),
    events: many(competitionEvents),
}));

export const competitionEventsRelations = relations(competitionEvents, ({ one, many }) => ({
    round: one(competitionRounds, {
        fields: [competitionEvents.roundId],
        references: [competitionRounds.id],
    }),
    resources: many(competitionEventResources),
}));

export const competitionEventResourcesRelations = relations(competitionEventResources, ({ one }) => ({
    event: one(competitionEvents, {
        fields: [competitionEventResources.eventId],
        references: [competitionEvents.id],
    }),
    file: one(files, {
        fields: [competitionEventResources.fileId],
        references: [files.id],
    }),
}));

// Forms Relations
export const formsRelations = relations(forms, ({ many, one }) => ({
    fields: many(formFields),
    competition: one(competitions, {
        fields: [forms.competitionId],
        references: [competitions.id],
    }),
}));

export const formFieldsRelations = relations(formFields, ({ one }) => ({
    form: one(forms, {
        fields: [formFields.formId],
        references: [forms.id],
    }),
}));

// Interests/Bookmarks Relations
export const userInterestsRelations = relations(userInterests, ({ one }) => ({
    user: one(users, {
        fields: [userInterests.userId],
        references: [users.id],
    }),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
    user: one(users, {
        fields: [bookmarks.userId],
        references: [users.id],
    }),
    competition: one(competitions, {
        fields: [bookmarks.competitionId],
        references: [competitions.id],
    }),
}));
