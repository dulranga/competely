"use client";

import { FC, use } from "react";
import { notFound } from "next/navigation";
import { FormRenderer } from "~/components/form/FormRenderer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFormByIdAction, submitFormAction } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TestFormPageProps {
    params: Promise<{ id: string }>;
}

const TestFormPage: FC<TestFormPageProps> = ({ params }) => {
    const { id } = use(params);

    const { data: form, isLoading } = useQuery({
        queryKey: ["form", id],
        queryFn: () => getFormByIdAction(id),
    });

    const { mutate: submitForm, isPending } = useMutation({
        mutationFn: submitFormAction,
        onSuccess: () => {
            toast.success("Form submitted successfully!");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to submit form");
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!form) {
        notFound();
    }

    const handleSubmit = async (data: unknown) => {
        submitForm({
            formId: form.id,
            answers: data as Record<string, unknown>,
        });
    };

    // TODO: remove form Item component and use direct comp. Also increase font size

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-8 px-4">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter w-full text-foreground">{form.name}</h1>
                {form.description && (
                    <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                        {form.description}
                    </p>
                )}
            </div>

            <FormRenderer
                fields={form.fields.map((field) => ({
                    id: field.id,
                    name: field.name,
                    type: field.type,
                    required: field.required,
                    config: field.config || {},
                }))}
                onFinish={handleSubmit}
                submitLabel={isPending ? "Submitting..." : "Submit Form"}
                disabled={isPending}
            />
        </div>
    );
};

export default TestFormPage;
