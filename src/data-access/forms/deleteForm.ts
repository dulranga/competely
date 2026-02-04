import "server-only";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { forms } from "~/db/schema";

export async function deleteForm(id: string) {
    await db.delete(forms).where(eq(forms.id, id));
}
