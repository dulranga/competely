import { Plus, Trash2 } from "lucide-react";
import type { FC } from "react";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { type MainInfoSchema, SOCIAL_PLATFORMS } from "./constants";

interface SocialsSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const SocialsSection: FC<SocialsSectionProps> = ({ form }) => {
    const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
        control: form.control,
        name: "socials",
    });

    return (
        <Card className="shadow-none border-border/60">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start">
                        <div className="grid grid-cols-[180px_1fr] gap-3 flex-1">
                            <Controller
                                control={form.control}
                                name={`socials.${index}.platform`}
                                defaultValue={field.platform || "website"}
                                render={({ field: selectField }) => (
                                    <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SOCIAL_PLATFORMS.map((platform) => {
                                                const Icon = platform.icon;
                                                return (
                                                    <SelectItem key={platform.value} value={platform.value}>
                                                        <div className="flex items-center gap-2">
                                                            <Icon size={16} />
                                                            <span>{platform.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <Input
                                placeholder="URL"
                                {...form.register(`socials.${index}.url` as const)}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocial(index)}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSocial({ platform: "website", url: "" })}
                    className="gap-2"
                >
                    <Plus size={16} /> Add Link
                </Button>
            </CardContent>
        </Card>
    );
};
