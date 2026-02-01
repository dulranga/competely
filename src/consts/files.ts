export const FILE_CATEGORY = ["uploads", "profile_pic", "competition"] as const;

export type FileCategory = (typeof FILE_CATEGORY)[number];
