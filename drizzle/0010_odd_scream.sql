CREATE TABLE "competition_publish_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"show_participant_count" boolean DEFAULT true NOT NULL,
	"show_timeline" boolean DEFAULT true NOT NULL,
	"show_countdown" boolean DEFAULT true NOT NULL,
	"show_prizes" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "competition_publish_options" ADD CONSTRAINT "competition_publish_options_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "competition_publish_options_competition_id_idx" ON "competition_publish_options" USING btree ("competition_id");