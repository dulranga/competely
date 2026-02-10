CREATE TABLE "notifications" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "message" text NOT NULL,
    "user_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competition_publish_options" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "competition_id" uuid NOT NULL,
    "show_participant_count" boolean DEFAULT true NOT NULL,
    "show_timeline" boolean DEFAULT true NOT NULL,
    "show_countdown" boolean DEFAULT true NOT NULL,
    "show_prizes" boolean DEFAULT true NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competition_events"
ALTER COLUMN "notification_enabled"
SET DEFAULT true;
--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "description" text;
--> statement-breakpoint
ALTER TABLE "competition_events" ADD COLUMN "location" text;
--> statement-breakpoint
ALTER TABLE "competition_events"
ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "competition_rounds"
ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "notifications"
ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "competition_publish_options"
ADD CONSTRAINT "competition_publish_options_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "competition_publish_options_competition_id_idx" ON "competition_publish_options" USING btree ("competition_id");
--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "category_temp" text;
--> statement-breakpoint
UPDATE "competitions" SET "category_temp" = "category"::text;
--> statement-breakpoint
ALTER TABLE "competitions" DROP COLUMN "category";
--> statement-breakpoint
ALTER TABLE "competitions"
RENAME COLUMN "category_temp" TO "category";