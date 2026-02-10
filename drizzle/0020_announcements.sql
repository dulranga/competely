CREATE TABLE "competition_round_announcements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"round_id" uuid NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competition_round_announcements" ADD CONSTRAINT "competition_round_announcements_round_id_competition_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."competition_rounds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "competition_round_announcements_round_id_idx" ON "competition_round_announcements" USING btree ("round_id");