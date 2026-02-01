import "server-only";

import { headers } from "next/headers";
import { getUserSession } from "~/data-access/getCurrentUser";
import { auth } from "../auth";
import { OrgPermission } from "./org-all-permissions";

export async function hasOrgPermissionServer<T extends OrgPermission>(permission: T) {
    type Parts = T extends `${infer Resource}:${infer Action}` ? [Resource, Action] : never;

    const [resource, action] = permission.split(":") as Parts;

    await getUserSession();

    const data = await auth.api
        .hasPermission({
            headers: await headers(),
            body: {
                permissions: {
                    [resource]: [action],
                },
            },
        })
        .catch((err) => ({ success: false, error: err.message }));

    return data.success;
}

export async function hasOrgPermissionsServer(permissions: OrgPermission[]) {
    const results = await Promise.all(permissions.map((permission) => hasOrgPermissionServer(permission)));

    return results.every((result) => result);
}
