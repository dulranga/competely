import { pgEnum } from "drizzle-orm/pg-core";

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
