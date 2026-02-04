import { z } from "zod";
import type { FormFieldType } from "~/consts/forms";

export const getFieldSchema = (type: FormFieldType, required: boolean) => {
    switch (type) {
        case "text":
        case "textarea":
        case "select":
        case "radio": {
            let schema = z.string();
            if (required) {
                schema = schema.min(1, "This field is required");
            } else {
                // @ts-ignore
                schema = schema.optional().or(z.literal(""));
            }
            return schema;
        }
        case "number": {
            let schema = z.coerce.number({
                error: "Please enter a valid number",
            });
            if (!required) {
                // @ts-ignore
                schema = schema.optional();
            }
            return schema;
        }
        case "checkbox": {
            // Checkbox always returns an array of strings
            let schema = z.array(z.string());
            if (required) {
                schema = schema.min(1, "Please select at least one option");
            }
            return schema;
        }
        case "file": {
            let schema = z.array(z.string());
            if (required) {
                schema = schema.min(1, "Please upload at least one file");
            }
            return schema;
        }
        case "datetime": {
            let schema = z.date();
            if (!required) {
                // @ts-ignore
                schema = schema.optional().nullable();
            }
            return schema;
        }
        default:
            return z.any();
    }
};

export const createDynamicFormSchema = (fields: { id: string; type: FormFieldType; required: boolean }[]) => {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const field of fields) {
        shape[field.id] = getFieldSchema(field.type, field.required);
    }
    return z.object(shape);
};
