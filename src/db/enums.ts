import { pgEnum } from "drizzle-orm/pg-core";
import { FILE_CATEGORY } from "~/consts/files";

export const formFieldTypeEnum = pgEnum("form_field_type", [
    "text",
    "textarea",
    "number",
    "checkbox",
    "select",
    "radio",
    "file",
    "datetime",
]);


export const competitionStatusEnum = pgEnum("competition_status", [
    "draft",
    "published",
    "archived",
]);

export const competitionCategoryEnum = pgEnum("competition_category", [
    "tech",
    "business",
    "design",
    "science",
    "sports",
    "arts",
    "other",
]);

export const fileCategoryEnum = pgEnum("file_category", FILE_CATEGORY);

export const socialPlatformEnum = pgEnum("social_platform", [
    "website",
    "twitter",
    "instagram",
    "facebook",
    "tiktok",
    "youtube",
    "linkedin",
    "discord",
    "github",
]);

export type SocialPlatform = (typeof socialPlatformEnum.enumValues)[number];
