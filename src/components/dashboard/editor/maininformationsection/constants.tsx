import { Facebook, Github, Globe, Instagram, Linkedin, MessageCircle, Twitter, Youtube } from "lucide-react";
import { z } from "zod";

export const SOCIAL_PLATFORMS = [
    { value: "website", label: "Website", icon: Globe },
    { value: "twitter", label: "Twitter", icon: Twitter },
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "linkedin", label: "LinkedIn", icon: Linkedin },
    { value: "discord", label: "Discord", icon: MessageCircle },
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "youtube", label: "YouTube", icon: Youtube },
    { value: "github", label: "GitHub", icon: Github },
] as const;

export const mainInfoSchema = z.object({
    // branding
    bannerId: z.string().optional().nullable(),
    logoId: z.string().optional().nullable(),

    // content
    tagline: z.string().optional(),
    description: z.string().min(1, "Description is required"),

    // logistics


    // resources
    resources: z
        .array(
            z.object({
                id: z.string().optional(), // temporary id for UI list management if needed, though index can work, z.string() is safer for keys
                type: z.enum(["document", "url"]),
                label: z.string().min(1, "Label is required"),
                fileId: z.string().nullable().optional(),
                url: z.string().url("Must be a valid URL").optional().or(z.literal("")).nullable(),
            })
        )
        .max(3, "Maximum 3 resources allowed"),

    // socials & extras
    socials: z.array(
        z.object({
            platform: z.string(),
            url: z.string().url("Must be a valid URL").or(z.literal("")),
        })
    ),
    showParticipantCount: z.boolean(),
    showTimeline: z.boolean(),
    showCountdown: z.boolean(),
    showPrizes: z.boolean(),

    prizes: z.array(
        z.object({
            id: z.string().optional(), // for key management
            name: z.string().min(1, "Name is required"),
            amount: z.string(), // Allow empty string
        })
    ),
});

export type MainInfoSchema = z.infer<typeof mainInfoSchema>;
