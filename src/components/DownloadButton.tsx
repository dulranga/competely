"use client";

import * as React from "react";
import { AsyncButton, type AsyncButtonProps } from "~/components/AsyncButton";

export type DownloadButtonProps = Omit<AsyncButtonProps, "onClick"> & {
    url: string | URL;
    fileName?: string;
    requestInit?: RequestInit;
};

function parseFileNameFromContentDisposition(header: string | null): string | null {
    if (!header) return null;
    // content-disposition: attachment; filename="name.pdf"; filename*=UTF-8''name.pdf
    const matchUtf = /filename\*=(?:UTF-8''|utf-8'')([^;]*)/i.exec(header);
    if (matchUtf?.[1]) {
        try {
            return decodeURIComponent(matchUtf[1]);
        } catch {
            return matchUtf[1];
        }
    }
    const match = /filename="?([^";]+)"?/i.exec(header);
    return match?.[1] ?? null;
}

function inferNameFromUrl(url: string | URL): string | null {
    try {
        const u = typeof url === "string" ? new URL(url, globalThis.location?.origin) : url;
        const last = u.pathname.split("/").pop();
        return last && last.includes(".") ? last : null;
    } catch {
        return null;
    }
}

export function DownloadButton({ url, fileName, requestInit, children, ...rest }: DownloadButtonProps) {
    const handleDownload = React.useCallback(async () => {
        const res = await fetch(url.toString(), { ...requestInit });
        if (!res.ok) {
            throw new Error(`Download failed with status ${res.status}`);
        }

        const blob = await res.blob();

        // Resolve final filename: explicit prop > header > URL path > fallback
        const headerName = parseFileNameFromContentDisposition(res.headers.get("content-disposition"));
        const urlName = inferNameFromUrl(url);
        const finalName = fileName || headerName || urlName || "download";

        const objectUrl = URL.createObjectURL(blob);
        try {
            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = finalName;
            a.rel = "noopener";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } finally {
            // Revoke in a microtask to ensure the download has begun
            setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        }
    }, [url, requestInit, fileName]);

    return (
        <AsyncButton onClick={handleDownload} {...rest}>
            {children ?? "Download"}
        </AsyncButton>
    );
}

export default DownloadButton;
