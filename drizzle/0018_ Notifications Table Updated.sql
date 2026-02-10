ALTER TABLE "notifications" ADD COLUMN "title" text NOT NULL;
--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "type" text NOT NULL;
--> statement-breakpoint
ALTER TABLE "notifications"
ADD COLUMN "is_read" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "link" text;
--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "link_label" text;
--> statement-breakpoint