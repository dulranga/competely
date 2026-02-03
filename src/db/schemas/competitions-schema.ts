import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { competitionCategoryEnum, competitionStatusEnum } from "../enums";
import { organizations } from "./auth-schema";
import { files } from "./files-schema";

export const competitions = pgTable(
    "competitions",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organizations.id, { onDelete: "cascade" }),
        tagline: text("tagline"),
        category: competitionCategoryEnum("category"),
        hashtags: text("hashtags").array(),
        bannerId: uuid("banner_id").references(() => files.id),
        startDate: timestamp("start_date"),
        endDate: timestamp("end_date"),
        registrationDeadline: timestamp("registration_deadline"),
        status: competitionStatusEnum("status").default("draft").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [index("competitions_organization_id_idx").on(table.organizationId)],
);
