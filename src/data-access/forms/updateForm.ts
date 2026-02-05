import "server-only";
import { eq } from "drizzle-orm";
import db from "~/db/client";
import { forms } from "~/db/schema";

export async function updateForm(id: string, data: { name?: string; description?: string; published?: boolean }) {
    const [updated] = await db
        .update(forms)
        .set({
            ...data,
            updatedAt: new Date(),
        })
        .where(eq(forms.id, id))
        .returning();
    return updated;
}
