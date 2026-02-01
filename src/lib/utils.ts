import { type ClassValue, clsx } from "clsx";
import type * as React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function getFileUrlById(file_id: string) {
    return `/api/upload?file_id=${file_id}`;
}

export function mergeRefs<T = any>(
    ...refs: Array<React.RefObject<T> | React.Ref<T> | undefined | null>
): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref != null) {
                (ref as React.RefObject<T | null>).current = value;
            }
        });
    };
}
