CREATE TYPE "public"."form_field_type" AS ENUM('text', 'textarea', 'number', 'checkbox', 'select', 'radio', 'file', 'date');
--> statement-breakpoint
CREATE TABLE "form_fields" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "form_id" uuid NOT NULL,
    "name" text NOT NULL,
    "type" "form_field_type" DEFAULT 'text' NOT NULL,
    "required" boolean DEFAULT false NOT NULL,
    "order" integer NOT NULL,
    "config" jsonb
);
--> statement-breakpoint
CREATE TABLE "forms" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "form_fields"
ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms" ("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "forms"
ADD CONSTRAINT "forms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;

CREATE TABLE "user_interests" (
    "user_id" text NOT NULL,
    "interest" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "user_interests_user_id_interest_pk" PRIMARY KEY ("user_id", "interest")
);
--> statement-breakpoint
ALTER TABLE "user_interests"
ADD CONSTRAINT "user_interests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE cascade ON UPDATE no action;