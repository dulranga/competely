import { FileText, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import type { FC } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";

import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { MainInfoSchema } from "./constants";

interface ResourcesSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const ResourcesSection: FC<ResourcesSectionProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "resources",
    });

    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-6">


                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Resources (Max 3)</Label>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => append({ type: "document", label: "", fileId: null, url: "" })}
                                disabled={fields.length >= 3}
                                className="h-8 text-xs bg-slate-100 hover:bg-slate-200 text-slate-900"
                            >
                                <Plus size={14} className="mr-1.5" />
                                Add Resource
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {fields.length === 0 && (
                                <div className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-xl">
                                    No resources added yet
                                </div>
                            )}

                            {fields.map((field, index) => {
                                const type = form.watch(`resources.${index}.type`);

                                return (
                                    <div key={field.id} className="p-3 border rounded-xl bg-slate-50/50 space-y-3 relative group">
                                        <div className="flex gap-3">
                                            <div className="w-[140px] shrink-0">
                                                <Select
                                                    value={type}
                                                    onValueChange={(value: "document" | "url") => {
                                                        form.setValue(`resources.${index}.type`, value);
                                                        // Clear values when switching types to avoid confusion
                                                        if (value === "document") form.setValue(`resources.${index}.url`, "");
                                                        else form.setValue(`resources.${index}.fileId`, null);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-9 text-xs bg-white">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="document">
                                                            <div className="flex items-center gap-2">
                                                                <FileText size={14} />
                                                                <span>File</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="url">
                                                            <div className="flex items-center gap-2">
                                                                <LinkIcon size={14} />
                                                                <span>Link</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex-1">
                                                <Form.Item label="Resource Name" name={`resources.${index}.label`} hideLabel className="space-y-0">
                                                    <Input
                                                        placeholder={type === "document" ? "e.g. Rulebook PDF" : "e.g. Official Website"}
                                                        className="h-9 bg-white"
                                                    />
                                                </Form.Item>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>

                                        <div className="pl-[152px] pr-12">
                                            {type === "document" ? (
                                                <Form.Item label="Resource File" name={`resources.${index}.fileId`} hideLabel className="space-y-0">
                                                    <FileUpload<{ id: string }>
                                                        endpoint="/api/upload?type=competition_guidelines"
                                                        onChange={(files) => form.setValue(`resources.${index}.fileId`, files[0]?.response?.id)}
                                                        maxFiles={1}
                                                        acceptedFileTypes={["application/pdf", "image/png", "image/jpeg"]}
                                                        supportedTypesHelpText="Supported: PDF, PNG, JPG"
                                                        className="bg-white min-h-[100px]"
                                                    />
                                                </Form.Item>
                                            ) : (
                                                <Form.Item label="Resource URL" name={`resources.${index}.url`} hideLabel className="space-y-0">
                                                    <Input placeholder="https://..." className="bg-white" />
                                                </Form.Item>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
