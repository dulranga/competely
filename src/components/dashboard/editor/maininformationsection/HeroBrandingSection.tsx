import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { MainInfoSchema } from "./constants";

interface HeroBrandingSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const HeroBrandingSection: FC<HeroBrandingSectionProps> = ({ form }) => {
    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Hero & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Banner Image (Large)" name="bannerId">
                        <FileUpload<{ id: string }>
                            endpoint="/api/upload?type=competition_banner"
                            onChange={(files) => form.setValue("bannerId", files[0]?.response?.id)}
                            maxFiles={1}
                            className="bg-background"
                        />
                    </Form.Item>
                    <Form.Item label="Logo / Avatar (Square)" name="logoId">
                        <FileUpload<{ id: string }>
                            endpoint="/api/upload?type=competition_banner"
                            onChange={(files) => form.setValue("logoId", files[0]?.response?.id)}
                            maxFiles={1}
                            className="bg-background"
                        />
                    </Form.Item>
                </div>
            </CardContent>
        </Card>
    );
};
