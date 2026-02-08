ALTER TYPE "public"."file_category" ADD VALUE 'competition_guidelines';--> statement-breakpoint
-- ALTER TABLE "competitions" ADD COLUMN "poster_id" uuid;--> statement-breakpoint
-- ALTER TABLE "competitions" ADD COLUMN "logo_id" uuid;--> statement-breakpoint
-- ALTER TABLE "competitions" ADD CONSTRAINT "competitions_poster_id_files_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
-- ALTER TABLE "competitions" ADD CONSTRAINT "competitions_logo_id_files_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;