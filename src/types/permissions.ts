// Generic type to construct "key:value" union
export type PermissionUnion<T extends Record<string, readonly string[]>> = {
    [K in keyof T]: `${K & string}:${T[K][number]}`;
}[keyof T];
