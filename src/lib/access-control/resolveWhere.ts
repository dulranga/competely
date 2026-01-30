import { SQL } from "drizzle-orm";
import "server-only";

type Where = SQL | undefined; // drizzle's where/condition type

/**
 * Resolves the first `Where` clause from a list of permission checks that passes.
 *
 * Each check is a tuple containing a boolean or a Promise that resolves to a boolean,
 * and a corresponding `Where` clause. The function evaluates all checks in parallel,
 * and returns the `Where` clause associated with the first check that passes.
 *
 * @param checks should be defined from highest to lowest access level. `ie. admin -> basic user`
 
 * @returns A promise that resolves to the first `Where` clause whose check passes.
 * @throws If none of the permission checks pass, an error is thrown indicating no permission.
 */
export async function resolveWhere(checks: Array<[Promise<boolean> | boolean, Where]>): Promise<Where> {
    const results = await Promise.all(checks.map(([check]) => check));

    for (let i = 0; i < results.length; i++) {
        if (results[i]) return checks[i][1];
    }

    // if none of the asked permissions passed, throw an error
    throw new Error("No Permission to perform this action");
}
