import { FC } from "react";
import FormBuilder from "~/components/dashboard/FormBuilder";
import { getFormById } from "~/data-access/forms";
import { saveFormAction } from "../actions";
import { notFound } from "next/navigation";

interface EditFormPageProps {
    params: Promise<{ id: string }>;
}

const EditFormPage: FC<EditFormPageProps> = async ({ params }) => {
    const { id } = await params;
    const form = await getFormById(id);

    if (!form) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Edit Form</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Update your registration gateway and manage fields.
                </p>
            </div>

            <FormBuilder
                initialData={{
                    id: form.id,
                    name: form.name,
                    description: form.description || "",
                    fields: form.fields.map((f) => ({
                        id: f.id,
                        name: f.name,
                        type: f.type,
                        required: f.required,
                    })),
                }}
                onSave={saveFormAction}
            />
        </div>
    );
};

export default EditFormPage;
