import "server-only";

import { headers } from "next/headers";

export default async function getCurrentPath() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    return pathname ?? "#";
}
