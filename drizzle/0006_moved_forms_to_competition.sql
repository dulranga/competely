-- remove all current forms
DELETE FROM "forms";

ALTER TABLE "forms" DROP CONSTRAINT "forms_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "competition_id" uuid NOT NULL;
--> statement-breakpoint
ALTER TABLE "forms"
ADD CONSTRAINT "forms_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "user_id";