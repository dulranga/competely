"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Form from "./Form";
import { createDynamicFormSchema } from "~/lib/schemas/forms.schema";
import type { FormFieldType } from "~/consts/forms";
import { FIELD_COMPONENTS } from "./form-renderer/field-mapping";
import FormDebug from "./FormDebug";
import { Card, CardContent } from "../ui/card";

type FormField = {
    id: string;
    name: string;
    type: FormFieldType;
    required: boolean;
    config: any; // e.g. { options: string[] }
};

interface FormRendererProps {
    fields: FormField[];
    onFinish: (data: unknown) => void;
    submitLabel?: string;
    className?: string;
    disabled?: boolean;
}

export function FormRenderer({
    fields,
    onFinish,
    submitLabel = "Submit",
    className,
    disabled = false,
}: FormRendererProps) {
    const schema = useMemo(() => createDynamicFormSchema(fields), [fields]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce(
            (acc, field) => {
                if (field.type === "checkbox") {
                    // Always use empty array for checkboxes
                    acc[field.id] = [];
                }
                if (field.type === "file") acc[field.id] = [];
                return acc;
            },
            {} as Record<string, any>,
        ),
    });

    const renderField = (field: FormField) => {
        const FieldComponent = FIELD_COMPONENTS[field.type];
        if (!FieldComponent) return null;

        const props = {
            name: field.id,
            label: field.name,
            placeholder: field.name,
            ...(field.config || {}),
        };

        return (
            <Card key={field.id} className="shadow-none">
                <CardContent>
                    <FieldComponent {...props} />
                </CardContent>
            </Card>
        );
    };

    return (
        <Form form={form} onFinish={onFinish} className={cn("space-y-6", className)}>
            <div className="space-y-4">{fields.map(renderField)}</div>
            <Button type="submit" size={"lg"} className="w-full" disabled={disabled}>
                {submitLabel}
            </Button>

            <FormDebug />
        </Form>
    );
}
