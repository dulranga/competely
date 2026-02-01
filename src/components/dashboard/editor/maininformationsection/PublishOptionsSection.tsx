import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import type { MainInfoSchema } from "./constants";

interface PublishOptionsSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const PublishOptionsSection: FC<PublishOptionsSectionProps> = ({ form }) => {
    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Publish Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showParticipantCount"
                            checked={form.watch("showParticipantCount")}
                            onCheckedChange={(c) => form.setValue("showParticipantCount", c as boolean)}
                        />
                        <label htmlFor="showParticipantCount" className="text-sm font-medium leading-none cursor-pointer">
                            Show Participant Count
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showTimeline"
                            checked={form.watch("showTimeline")}
                            onCheckedChange={(c) => form.setValue("showTimeline", c as boolean)}
                        />
                        <label htmlFor="showTimeline" className="text-sm font-medium leading-none cursor-pointer">
                            Show Timeline
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showCountdown"
                            checked={form.watch("showCountdown")}
                            onCheckedChange={(c) => form.setValue("showCountdown", c as boolean)}
                        />
                        <label htmlFor="showCountdown" className="text-sm font-medium leading-none cursor-pointer">
                            Show Countdown
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showPrizes"
                            checked={form.watch("showPrizes")}
                            onCheckedChange={(c) => form.setValue("showPrizes", c as boolean)}
                        />
                        <label htmlFor="showPrizes" className="text-sm font-medium leading-none cursor-pointer">
                            Show Prizes
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
