import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import Form from "~/components/form/Form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import type { MainInfoSchema } from "./constants";

interface AboutContentSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const AboutContentSection: FC<AboutContentSectionProps> = ({ form }) => {
    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">About & Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                <Form.Item label="Description (About the Competition)" name="description">
                    <Textarea
                        placeholder="Describe your event, why participate, and who should join..."
                        className="min-h-[200px]"
                    />
                </Form.Item>
            </CardContent>
        </Card>
    );
};
