import { array, date, object, string, uuid, type infer as zInfer } from "zod";

export const competitionCategoryOptions = ["Open", "University", "School"] as const;

export const createCompetitionSchema = object({
    name: string().min(3, "Competition name must be at least 3 characters"),
    societyName: string().optional(),
    tagline: string().max(200, "Tagline must be less than 200 characters").optional(),
    category: enumType(competitionCategoryEnum, { error: "Please select a category" }),
    posterId: uuid("Invalid banner ID").optional().nullable(),
    startDate: date({ error: "Start date is required" }),
    endDate: date({ error: "End date is required" }),
    registrationDeadline: date({ error: "Registration deadline is required" }),
}).superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
        ctx.addIssue({
            code: "custom",
            message: "End date must be after start date",
            path: ["endDate"],
        });
    }
    if (data.registrationDeadline > data.startDate) {
        ctx.addIssue({
            code: "custom",
            message: "Registration deadline must be before the start date",
            path: ["registrationDeadline"],
        });
    }
});

export type CreateCompetitionSchema = zInfer<typeof createCompetitionSchema>;
