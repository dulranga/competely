"use client";

import * as React from "react";
import { toast } from "sonner";
import { AsyncButton, type AsyncButtonProps } from "~/components/AsyncButton";

export type ActionDownloadButtonProps = Omit<AsyncButtonProps, "onClick"> & {
    /**
     * The server action to execute.
     * Should return the file data (Blob, Uint8Array, or string) or an object containing it.
     */
    action: () => Promise<Blob>;
    /**
     * Optional filename. If not provided, it will try to use the one returned by the action,
     * or fallback to "download".
     */
    fileName?: string;
};

export function ActionDownloadButton({ action, fileName, children, ...rest }: ActionDownloadButtonProps) {
    const handleDownload = React.useCallback(async () => {
        try {
            const data = await action();

            if (!data) {
                throw new Error("Action returned no result");
            }

            const finalName = fileName || "download";

            const objectUrl = URL.createObjectURL(data);
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
        } catch (error) {
            toast.error(`Download failed: ${(error as Error).message}`);
        }
    }, [action, fileName]);

    return (
        <AsyncButton onClick={handleDownload} {...rest}>
            {children ?? "Download"}
        </AsyncButton>
    );
}

export default ActionDownloadButton;
