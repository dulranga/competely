CREATE TABLE "user_interests" (
	"user_id" text NOT NULL,
	"interest" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_interests_user_id_interest_pk" PRIMARY KEY("user_id","interest")
);
--> statement-breakpoint
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;