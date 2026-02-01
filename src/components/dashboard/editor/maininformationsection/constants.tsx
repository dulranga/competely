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
    description: z.string().min(1, "Description is required"),

    // logistics
    location: z.string().optional(),

    guidelinesType: z.enum(["file", "link"]).default("file"),
    guidelinesFile: z.string().optional().nullable(),
    guidelinesUrl: z.string().optional(),

    // socials & extras
    socials: z.array(
        z.object({
            platform: z.string(),
            url: z.string().url("Must be a valid URL"),
        })
    ),
    showParticipantCount: z.boolean(),
    showTimeline: z.boolean(),
    showCountdown: z.boolean(),
    showPrizes: z.boolean(),

    championPrize: z.string().optional(),
    runnersUp1Prize: z.string().optional(),
    runnersUp2Prize: z.string().optional(),

    customPrizes: z.array(
        z.object({
            name: z.string().min(1, "Name is required"),
            amount: z.string().min(1, "Prize amount is required"),
        })
    ),
    prizePool: z.string().optional(),
});

export type MainInfoSchema = z.infer<typeof mainInfoSchema>;
