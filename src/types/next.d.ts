import type { ReactNode } from "react";

declare global {
    type UrlParams<T extends string> = T extends `${string}[${infer Param}]${infer Rest}`
        ? { [K in Param]: string } & UrlParams<Rest>
        : Record<string, string>;

    interface PageProps<T extends string = string> {
        params: Promise<UrlParams<T>>;
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    }

    interface LayoutProps<T extends string = string> {
        children: ReactNode;
        params: Promise<UrlParams<T>>;
    }
}

export {};
