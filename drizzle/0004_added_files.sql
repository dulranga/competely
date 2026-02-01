CREATE TYPE "public"."file_category" AS ENUM('uploads', 'profile_pic', 'competition');--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fileName" varchar(255) NOT NULL,
	"fileKey" varchar(255) NOT NULL,
	"mimeType" varchar(100) NOT NULL,
	"file_category" "file_category" NOT NULL,
	"size" integer NOT NULL,
	"user_id" text NOT NULL,
	"uploadedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "files_fileKey_unique" UNIQUE("fileKey")
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "files_user_id_idx" ON "files" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "files_file_key_idx" ON "files" USING btree ("fileKey");