import { authClient } from "../auth-client";
import { OrgPermission } from "./org-all-permissions";

export async function hasOrgPermissionClient<T extends OrgPermission>(permission: T) {
    type Parts = T extends `${infer Resource}:${infer Action}` ? [Resource, Action] : never;

    const [resource, action] = permission.split(":") as Parts;

    const { data, error } = await authClient.organization.hasPermission({
        permissions: {
            [resource]: [action],
        },
    });

    if (error) {
        return false;
    }
    if (data.success) {
        return true;
    }
}
