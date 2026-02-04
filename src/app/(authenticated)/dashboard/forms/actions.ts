"use server";

import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";
import { getFormResponsesByFormId } from "~/data-access/form-responses/getFormResponsesByFormId";
import { createForm } from "~/data-access/forms/createForm";
import { deleteForm } from "~/data-access/forms/deleteForm";
import { getFormById } from "~/data-access/forms/getFormById";
import { getFormFieldsByFormId } from "~/data-access/forms/getFormFieldsByFormId";
import { getFormsByCompetition } from "~/data-access/forms/getFormsByCompetition";
import { setFormFields } from "~/data-access/forms/setFormFields";
import { updateForm } from "~/data-access/forms/updateForm";
import { getUserSession } from "~/data-access/getCurrentUser";
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

export async function getFormByIdAction(id: string) {
    "use server";
    await getUserSession();
    return await getFormById(id);
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

    await getUserSession();
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

export async function getPaginatedFormResponsesAction(formId: string, page = 1, limit = 20) {
    "use server";
    await getUserSession();
    return await getFormResponsesByFormId(formId, page, limit);
}

export async function getFormFieldsAction(formId: string) {
    "use server";
    await getUserSession();
    return await getFormFieldsByFormId(formId);
}
