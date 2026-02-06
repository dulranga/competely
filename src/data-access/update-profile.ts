"use server";

import { eq } from "drizzle-orm";
import { users } from "~/db/schema";
import { revalidatePath } from "next/cache";
import db from "~/db/client";
import { getUserSession } from "./getCurrentUser";

export async function updateProfile(data: { name: string }) {
    const session = await getUserSession();

    await db.update(users)
        .set({ name: data.name })
        .where(eq(users.id, session.user.id));

    revalidatePath("/"); // Revalidate all paths to show updated name in header
    return { success: true };
}
