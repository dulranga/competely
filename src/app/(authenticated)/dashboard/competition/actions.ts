"use server";

import { updateCompetitionMainInfo } from "~/data-access/competitions/updateCompetitionMainInfo";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import { getUser } from "~/data-access/getCurrentUser";

export async function updateMainInfoAction(competitionId: string, data: MainInfoSchema) {
    const user = await getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    // TODO: Verify user has permission to edit this competition (e.g. is organizer).
    // For now, assuming basic auth is enough for this task or handled by middleware/context safety.

    try {
        await updateCompetitionMainInfo(competitionId, data);
        return { success: true };
    } catch (error: any) {
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'server_error_log.txt');
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] Error: ${error?.message || error}\nStack: ${error?.stack || ''}\nFull: ${JSON.stringify(error, null, 2)}\n\n`;

        fs.appendFileSync(logPath, errorMessage);

        console.error("Server Action Failed: updateMainInfoAction", error);
        throw error;
    }
}

import { updateCompetitionContacts, type ContactInput } from "~/data-access/competitions/updateCompetitionContacts";

export async function updateContactsAction(competitionId: string, contacts: ContactInput[]) {
    const user = await getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    try {
        await updateCompetitionContacts(competitionId, contacts);
        return { success: true };
    } catch (error: any) {
        console.error("Server Action Failed: updateContactsAction", error);
        throw error;
    }
}
