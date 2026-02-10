"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send, History } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createAnnouncementAction } from "~/data-access/announcements/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "~/lib/utils";

const announcementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Message is required"),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

interface SendAnnouncementsProps {
    roundId: string;
}

export default function SendAnnouncements({ roundId }: SendAnnouncementsProps) {
    const [isSending, setIsSending] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AnnouncementFormValues>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit = async (data: AnnouncementFormValues) => {
        setIsSending(true);
        try {
            await createAnnouncementAction(roundId, data.title, data.content);
            toast.success("Announcement sent successfully");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to send announcement");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Card className="border-[#e8e2de] bg-white rounded-[24px] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#f3f0ee] px-8">
                <CardTitle className="text-2xl font-bold tracking-tight text-[#0c0803]">Send Announcements</CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="bg-[#0c0d16] text-white hover:bg-[#1a1b26] hover:text-white rounded-full px-4 py-2 text-xs font-bold transition-all flex items-center gap-2"
                >
                    View Past Announcements <History size={14} className="rotate-0" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-8">
                        <Input
                            {...register("title")}
                            placeholder="Title"
                            variant="ghost"
                            className={cn(
                                "w-full text-4xl font-black placeholder:text-[#0c0803]/20 focus-visible:ring-0 p-0 h-auto mb-2 bg-transparent",
                                errors.title && "placeholder:text-red-500/50",
                            )}
                        />
                        <div className="h-px w-full bg-[#f3f0ee] mb-4" />
                        <Textarea
                            {...register("content")}
                            placeholder="Type a message to delegates..."
                            rows={4}
                            className={cn(
                                "w-full text-lg placeholder:text-[#0c0803]/40 border-none shadow-none focus-visible:ring-0 p-0 bg-transparent resize-none leading-relaxed min-h-0",
                                errors.content && "placeholder:text-red-500/50",
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-end px-8 pb-6 gap-2">
                        <Button
                            type="submit"
                            disabled={isSending}
                            size="icon"
                            className="bg-[#0c0803] hover:bg-[#1a1a1a] text-white h-12 w-12 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Send size={20} className={cn(isSending && "animate-pulse")} />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
