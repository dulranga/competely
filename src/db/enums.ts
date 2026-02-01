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
    "date",
]);

export const fileCategoryEnum = pgEnum("file_category", FILE_CATEGORY);
