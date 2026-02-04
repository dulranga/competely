import { AlignLeft, Calendar, CheckSquare, Hash, List, Type, Upload as UploadIcon } from "lucide-react";
import { z } from "zod";
import { FormFieldType } from "~/consts/forms";

type FieldUi = {
    label: string;
    icon: any;
    schema: z.ZodTypeAny;
    defaultProps?: any;
    hasOptions?: boolean;
};

export const FIELD_CONFIGS: Record<FormFieldType, FieldUi> = {
    text: {
        label: "Short Answer",
        icon: Type,
        schema: z.string().min(1, "Required"),
        defaultProps: { placeholder: "Write your answer..." },
    },
    textarea: {
        label: "Paragraph",
        icon: AlignLeft,
        schema: z.string().min(1, "Required"),
        defaultProps: { placeholder: "Write a long response..." },
    },
    number: {
        label: "Number",
        icon: Hash,
        schema: z.number(),
        defaultProps: { placeholder: "0" },
    },
    checkbox: {
        label: "Checkboxes",
        icon: CheckSquare,
        schema: z.array(z.string()).min(1, "Select at least one"),
        defaultProps: { options: ["Option 1"] },
        hasOptions: true,
    },
    select: {
        label: "Dropdown",
        icon: List,
        schema: z.string().min(1, "Select an option"),
        defaultProps: { options: ["Option 1"] },
        hasOptions: true,
    },
    datetime: {
        label: "Date",
        icon: Calendar,
        schema: z.date(),
    },
    file: {
        label: "File Upload",
        icon: UploadIcon,
        schema: z.any(),
    },
    radio: {
        label: "Multiple Choice",
        icon: List,
        schema: z.string().min(1, "Select an option"),
        defaultProps: { options: ["Option 1"] },
        hasOptions: true,
    },
};

export interface Field {
    id: string;
    name: string;
    type: FormFieldType;
    required: boolean;
    config?: {
        options?: string[];
        placeholder?: string;
        min?: number;
        max?: number;
    };
}
