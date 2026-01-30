"use server";

import { redirect } from "next/navigation";
import { createForm, setFormFields, updateForm } from "~/data-access/forms";
import { getUserSession } from "~/data-access/getCurrentUser";

// Since I can't easily create server actions with "use server" and have them works perfectly without checking middleware etc,
// and the prompt mentions functional flow, I'll use simple async functions that I'll wrap in a transition or similar.
// Actually, I'll use a standard Server Action pattern.

export async function saveFormAction(data: { id?: string; name: string; description: string; fields: any[] }) {
    "use server";

    const session = await getUserSession();
    let formId = data.id;

    if (!formId) {
        const form = await createForm(session.user.id, {
            name: data.name,
            description: data.description,
        });
        formId = form.id;
    } else {
        await updateForm(formId, {
            name: data.name,
            description: data.description,
        });
    }

    await setFormFields(formId, data.fields);

    redirect("/dashboard/forms");
}
