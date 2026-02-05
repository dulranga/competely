"use server";

import { createFormResponse } from "~/data-access/form-responses/createFormResponse";
import { getFormById } from "~/data-access/forms/getFormById";

export async function getFormByIdAction(id: string) {
    return await getFormById(id);
}

export async function submitFormAction(data: { formId: string; answers: Record<string, unknown> }) {
    return await createFormResponse(data);
}
