"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function usePathWithSearchParams(): string {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useMemo(() => {
        const queryString = searchParams.toString();
        const search = queryString ? `?${queryString}` : "";
        return `${pathname}${search}`;
    }, [pathname, searchParams]);
}
