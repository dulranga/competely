export const FILE_CATEGORY = ["uploads", "profile_pic", "competition", "competition_banner", "form_upload"] as const;

export type FileCategory = (typeof FILE_CATEGORY)[number];
