"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { ConfirmSaveDialog } from "./ConfirmSaveDialog";
import { AboutContentSection } from "./maininformationsection/AboutContentSection";
import { type MainInfoSchema, mainInfoSchema } from "./maininformationsection/constants";
import { HeroBrandingSection } from "./maininformationsection/HeroBrandingSection";
import { KeyLogisticsSection } from "./maininformationsection/KeyLogisticsSection";
import { PrizesSection } from "./maininformationsection/PrizesSection";
import { PublishOptionsSection } from "./maininformationsection/PublishOptionsSection";
import { SocialsSection } from "./maininformationsection/SocialsSection";

const MainInformationSection: FC = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const form = useForm<MainInfoSchema>({
        resolver: zodResolver(mainInfoSchema),
        defaultValues: {
            description: "",
            guidelinesType: "file",
            socials: [{ platform: "website", url: "" }],
            customPrizes: [],
            showParticipantCount: true,
            showTimeline: true,
            showCountdown: true,
            showPrizes: true,
        },
    });

    const onSave = () => {
        toast.success("Main information updated successfully!");
    };

    return (
        <div className="rounded-3xl p-0 gap-0 overflow-hidden bg-background border shadow-sm mt-8">
            <ConfirmSaveDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen} onConfirm={onSave} />

            <div className="p-8 pb-4 border-b">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shrink-0">
                            <Info size={28} />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Main Information Section</h2>
                            <p className="text-sm font-medium text-muted-foreground">
                                Detailed content for your competition page.
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsConfirmOpen(true)}
                        className="h-10 rounded-xl font-bold bg-primary text-primary-foreground"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="p-8 bg-gray-50/50">
                <Form form={form} className="space-y-8">
                    <HeroBrandingSection form={form} />
                    <AboutContentSection form={form} />
                    <KeyLogisticsSection form={form} />
                    <PrizesSection form={form} />
                    <SocialsSection form={form} />
                    <PublishOptionsSection form={form} />
                </Form>
            </div>
        </div>
    );
};

export default MainInformationSection;
