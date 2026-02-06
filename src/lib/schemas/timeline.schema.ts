import { z } from "zod";

export const eventTypeEnum = z.enum(["Workshop", "Submission", "Physical Event", "Online Event", "other"]);

export const createEventSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        eventTypeSelect: eventTypeEnum,
        eventTypeCustom: z.string().max(30, "Custom type must be 30 characters or less").optional(),
        description: z.string().optional(),
        location: z.string().optional().nullable(),
        startDate: z.date().optional(),
        endDate: z.date().optional().nullable(),
        notificationEnabled: z.boolean().optional().default(false),
        addToTimeline: z.boolean().optional().default(true),
        connectFormId: z.string().optional().nullable(), // Form ID to connect
        resources: z
            .array(
                z.object({
                    label: z.string().min(1, "Label is required"),
                    type: z.enum(["url", "document"]),
                    url: z.url("Invalid URL").optional().or(z.literal("")),
                    fileId: z.string().optional(),
                }),
            )
            .optional()
            .default([]),
    })
    .refine(
        (data) => {
            if (data.eventTypeSelect === "other" && !data.eventTypeCustom) {
                return false;
            }
            return true;
        },
        {
            message: "Custom event type is required when 'Other' is selected",
            path: ["eventTypeCustom"],
        },
    )
    .refine(
        (data) => {
            // Validate resources
            if (data.resources) {
                for (const res of data.resources) {
                    if (res.type === "url" && !res.url) return false;
                    // if (res.type === "document" && !res.fileId) return false; // File upload logic handles this usually, but good to keep in mind
                }
            }
            return true;
        },
        {
            message: "Invalid resource configuration",
            path: ["resources"],
        },
    );

export type CreateEventSchema = z.infer<typeof createEventSchema>;
