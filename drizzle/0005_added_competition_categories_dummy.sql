CREATE TYPE "public"."competition_category" AS ENUM('tech', 'business', 'design', 'science', 'sports', 'arts', 'other');
--> statement-breakpoint
CREATE TYPE "public"."competition_status" AS ENUM('draft', 'published', 'archived');
--> statement-breakpoint
ALTER TYPE "public"."file_category" ADD VALUE 'competition_banner';
--> statement-breakpoint
CREATE TABLE "competitions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "organization_id" text NOT NULL,
    "tagline" text,
    "category" "competition_category",
    "banner_id" uuid,
    "start_date" timestamp,
    "end_date" timestamp,
    "registration_deadline" timestamp,
    "status" "competition_status" DEFAULT 'draft' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competitions"
ADD CONSTRAINT "competitions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "competitions"
ADD CONSTRAINT "competitions_banner_id_files_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."files" ("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "competitions_organization_id_idx" ON "competitions" USING btree ("organization_id");