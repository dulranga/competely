-- Change category field from enum to text to allow custom categories
-- First, add a temporary text column
ALTER TABLE "competitions" ADD COLUMN "category_temp" text;

-- Copy existing category values to the temporary column
UPDATE "competitions" SET "category_temp" = "category"::text;

-- Drop the old category column
ALTER TABLE "competitions" DROP COLUMN "category";

-- Rename the temporary column to category
ALTER TABLE "competitions" RENAME COLUMN "category_temp" TO "category";