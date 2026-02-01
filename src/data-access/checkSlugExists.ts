import "server-only";
import { auth } from "~/lib/auth";

export async function checkSlugExists(slug: string) {
    const data = await auth.api.checkOrganizationSlug({
        body: { slug },
    });

    return !data.status;
}
