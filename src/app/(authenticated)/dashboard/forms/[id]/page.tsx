"use client";

import { FC, use } from "react";
import FormBuilder from "~/components/dashboard/FormBuilder";
import { saveFormAction, deleteFormAction, getFormByIdAction } from "../actions";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface EditFormPageProps {
    params: Promise<{ id: string }>;
}

const EditFormPage: FC<EditFormPageProps> = ({ params }) => {
    const { id } = use(params);

    const {
        data: form,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["form", id],
        queryFn: () => getFormByIdAction(id),
    });

    if (isLoading) {
        return (
            <div className="space-y-12">
                <div className="grid gap-6">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Edit Form</h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">Loading form data...</p>
                </div>
            </div>
        );
    }

    if (!form || error) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Edit Form</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Update your registration gateway and manage fields.
                </p>
                <Link href={`/dashboard/test-form/${form.id}`} className="text-sm text-blue-600 hover:underline">
                    Test Form
                </Link>
            </div>

            <FormBuilder
                initialData={{
                    id: form.id,
                    name: form.name,
                    description: form.description || "",
                    published: form.published,
                    fields: form.fields.map((f) => ({
                        id: f.id,
                        name: f.name,
                        type: f.type,
                        required: f.required,
                        config: f.config || {},
                    })),
                }}
                onSave={async (data) => {
                    saveFormAction(data);
                }}
                onDelete={deleteFormAction}
            />
        </div>
    );
};

export default EditFormPage;
