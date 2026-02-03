ALTER TABLE "bookmarks" ALTER COLUMN "is_bookmarked" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "is_registered" boolean DEFAULT false NOT NULL;