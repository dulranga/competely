import { FileText, Link as LinkIcon } from "lucide-react";
import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";

import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { MainInfoSchema } from "./constants";

interface KeyLogisticsSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const KeyLogisticsSection: FC<KeyLogisticsSectionProps> = ({ form }) => {
    const guidelinesType = form.watch("guidelinesType");

    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Key Logistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-6">
                    <Form.Item label="Location" name="location">
                        <Input placeholder="e.g. BMICH, Colombo or Online" />
                    </Form.Item>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Guidelines</Label>
                            <Select
                                value={guidelinesType}
                                onValueChange={(value: "file" | "link") => form.setValue("guidelinesType", value)}
                            >
                                <SelectTrigger className="w-[140px] h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="file">
                                        <div className="flex items-center gap-2">
                                            <FileText size={14} />
                                            <span>Upload File</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="link">
                                        <div className="flex items-center gap-2">
                                            <LinkIcon size={14} />
                                            <span>External Link</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {guidelinesType === "file" ? (
                            <Form.Item name="guidelinesFile" label="Guidelines File" hideLabel className="space-y-0">
                                <FileUpload<{ id: string }>
                                    endpoint="/api/upload?type=competition_guidelines"
                                    onChange={(files) => form.setValue("guidelinesFile", files[0]?.response?.id)}
                                    maxFiles={1}
                                    acceptedFileTypes={["application/pdf", "image/png", "image/jpeg"]}
                                    supportedTypesHelpText="Supported formats: PDF, PNG, JPG"
                                    className="bg-background"
                                />
                            </Form.Item>
                        ) : (
                            <Form.Item name="guidelinesUrl" label="Guidelines URL" hideLabel className="space-y-0">
                                <Input placeholder="https://docs.google.com/..." />
                            </Form.Item>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
