CREATE TYPE "public"."social_platform" AS ENUM('website', 'twitter', 'instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'discord', 'github');--> statement-breakpoint
CREATE TABLE "competition_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"image_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competition_prizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"cash_prize" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competition_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"label" text NOT NULL,
	"url" text,
	"file_id" uuid,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resource_type_check" CHECK (("competition_resources"."type" = 'document' AND "competition_resources"."file_id" IS NOT NULL) OR ("competition_resources"."type" = 'url' AND "competition_resources"."url" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "competition_social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"competition_id" uuid NOT NULL,
	"platform" "social_platform" NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competition_contacts" ADD CONSTRAINT "competition_contacts_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_contacts" ADD CONSTRAINT "competition_contacts_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_prizes" ADD CONSTRAINT "competition_prizes_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_resources" ADD CONSTRAINT "competition_resources_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_resources" ADD CONSTRAINT "competition_resources_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competition_social_links" ADD CONSTRAINT "competition_social_links_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "competition_contacts_competition_id_idx" ON "competition_contacts" USING btree ("competition_id");--> statement-breakpoint
CREATE INDEX "competition_prizes_competition_id_idx" ON "competition_prizes" USING btree ("competition_id");--> statement-breakpoint
CREATE INDEX "competition_resources_competition_id_idx" ON "competition_resources" USING btree ("competition_id");--> statement-breakpoint
CREATE INDEX "competition_social_links_competition_id_idx" ON "competition_social_links" USING btree ("competition_id");