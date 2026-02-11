CREATE TABLE "notifications" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "message" text NOT NULL,
    "user_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notifications"
ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("user_id");
--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "category_temp" text;
--> statement-breakpoint
UPDATE "competitions" SET "category_temp" = "category"::text;
--> statement-breakpoint
ALTER TABLE "competitions" DROP COLUMN "category";
--> statement-breakpoint
ALTER TABLE "competitions"
RENAME COLUMN "category_temp" TO "category";