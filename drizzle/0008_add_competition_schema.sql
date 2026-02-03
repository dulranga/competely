CREATE TABLE "bookmarks" (
	"user_id" text NOT NULL,
	"competition_id" uuid NOT NULL,
	"is_bookmarked" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bookmarks_user_id_competition_id_pk" PRIMARY KEY("user_id","competition_id")
);
--> statement-breakpoint
CREATE TABLE "competition_event_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"label" text NOT NULL,
	"url" text,
	"file_id" uuid,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_resource_type_check" CHECK (("competition_event_resources"."type" = 'document' AND "competition_event_resources"."file_id" IS NOT NULL) OR ("competition_event_resources"."type" = 'url' AND "competition_event_resources"."url" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "competition_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"round_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"description" text,
	"start_date" timestamp,
	"end_date" timestamp,
	"notification_enabled" boolean DEFAULT false NOT NULL,
	"add_to_timeline" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competition_rounds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "type" SET DEFAULT 'text'::text;--> statement-breakpoint
DROP TYPE "public"."form_field_type";--> statement-breakpoint
CREATE TYPE "public"."form_field_type" AS ENUM('text', 'textarea', 'number', 'checkbox', 'select', 'radio', 'file', 'datetime');--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "type" SET DEFAULT 'text'::"public"."form_field_type";--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "type" SET DATA TYPE "public"."form_field_type" USING "type"::"public"."form_field_type";--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "hashtags" text[];--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_event_resources" ADD CONSTRAINT "competition_event_resources_event_id_competition_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."competition_events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_event_resources" ADD CONSTRAINT "competition_event_resources_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_events" ADD CONSTRAINT "competition_events_round_id_competition_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."competition_rounds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_rounds" ADD CONSTRAINT "competition_rounds_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "competition_event_resources_event_id_idx" ON "competition_event_resources" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "competition_events_round_id_idx" ON "competition_events" USING btree ("round_id");--> statement-breakpoint
CREATE INDEX "competition_rounds_competition_id_idx" ON "competition_rounds" USING btree ("competition_id");