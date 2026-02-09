import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { MainInfoSchema } from "./constants";

interface HeroBrandingSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

// Adapter to handle the mismatch between Form.Item (expects string value) and FileUpload (returns array)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleFileUpload = ({ onChange, value, ...props }: any) => {
    return (
        <FileUpload
            {...props}
            onChange={(files: any[]) => {
                const fileId = files?.[0]?.response?.id;
                // Pass the string ID (or undefined) to the form
                onChange(fileId);
            }}
        // Prevent Form.Item's 'value' (string) from being passed to FileUpload (which doesn't expect a string value)
        // If we wanted to show the existing image, we would need to fetch it and pass to initialFiles
        />
    );
};

export const HeroBrandingSection: FC<HeroBrandingSectionProps> = ({ form }) => {
    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Hero & Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Banner Image (Large)" name="bannerId">
                        <SingleFileUpload
                            endpoint="/api/upload?type=competition_banner"
                            maxFiles={1}
                            className="bg-background"
                        />
                    </Form.Item>
                    <Form.Item label="Logo / Avatar (Square)" name="logoId">
                        <SingleFileUpload
                            endpoint="/api/upload?type=competition_banner"
                            maxFiles={1}
                            className="bg-background"
                        />
                    </Form.Item>
                </div>
            </CardContent>
        </Card>
    );
};
