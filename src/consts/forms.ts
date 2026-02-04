export const FORM_FIELD_TYPES = [
    "text",
    "textarea",
    "number",
    "checkbox",
    "select",
    "radio",
    "file",
    "datetime",
] as const;

export type FormFieldType = (typeof FORM_FIELD_TYPES)[number];
