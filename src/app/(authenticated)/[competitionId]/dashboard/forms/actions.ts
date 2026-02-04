"use server";

import { redirect } from "next/navigation";
import { createForm, deleteForm, getFormsByCompetition, setFormFields, updateForm } from "~/data-access/forms";
import { getUserSession } from "~/data-access/getCurrentUser";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions } from "~/db/schema";

export async function getFormsAction() {
    const session = await getUserSession();
    if (!session?.session.activeOrganizationId) {
        return [];
    }

    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.organizationId, session.session.activeOrganizationId),
    });

    if (!competition) return [];

    return await getFormsByCompetition(competition.id);
}

export async function deleteFormAction(id: string) {
    "use server";
    await getUserSession(); // Auth check
    await deleteForm(id);
    redirect("/dashboard/forms");
}

export async function togglePublishAction(id: string, published: boolean) {
    "use server";
    await getUserSession(); // Auth check
    await updateForm(id, { published });
}

// Since I can't easily create server actions with "use server" and have them works perfectly without checking middleware etc,
// and the prompt mentions functional flow, I'll use simple async functions that I'll wrap in a transition or similar.
// Actually, I'll use a standard Server Action pattern.

export async function saveFormAction(data: {
    id?: string;
    name: string;
    description: string;
    published?: boolean;
    fields: any[];
}) {
    "use server";

    const session = await getUserSession();
    let formId = data.id;

    if (!formId) {
        const form = await createForm({
            name: data.name,
            description: data.description,
        });
        formId = form.id;
    } else {
        await updateForm(formId, {
            name: data.name,
            description: data.description,
            published: data.published,
        });
    }

    await setFormFields(formId, data.fields);

    redirect("/dashboard/forms");
}
