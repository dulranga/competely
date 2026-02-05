ALTER TABLE "competition_events" ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "competition_rounds" ADD COLUMN "is_system" boolean DEFAULT false NOT NULL;