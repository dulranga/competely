import { FC } from "react";
import { notFound } from "next/navigation";
import { getFormById } from "~/data-access/forms/getFormById";
import { FormRenderer } from "~/components/form/FormRenderer";

interface TestFormPageProps {
    params: Promise<{ id: string }>;
}

const TestFormPage: FC<TestFormPageProps> = async ({ params }) => {
    const { id } = await params;
    const form = await getFormById(id);

    if (!form) {
        notFound();
    }

    const handleSubmit = async (data: unknown) => {
        "use server";
        console.log("Form submission:", data);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-8">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold focus-visible:ring-0 placeholder:text-muted-foreground/20 h-auto tracking-tighter w-full">
                    {form.name}
                </h1>
                {form.description && (
                    <p className="text-muted-foreground text-lg leading-relaxed">{form.description}</p>
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
                submitLabel="Submit Form"
            />
        </div>
    );
};

export default TestFormPage;
