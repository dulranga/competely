"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trophy } from "lucide-react";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "~/components/form-inputs/DateTimePicker";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import {
    type CreateCompetitionSchema,
    competitionCategoryEnum,
    createCompetitionSchema,
} from "~/lib/schemas/competition.schema";
import { string, type infer as zInfer } from "zod";

const ExtendedSchema = createCompetitionSchema.extend({
    customCategory: string().optional(),
});

type ExtendedSchemaType = zInfer<typeof ExtendedSchema>;

import { ConfirmSaveDialog } from "./ConfirmSaveDialog";
import { useState } from "react";
import { toast } from "sonner";
import { updateCompetitionAction } from "~/app/(authenticated)/[competitionId]/dashboard/editor/actions";

interface EditThumbnailCardProps {
    initialData?: {
        id: string;
        name: string | null;
        tagline: string | null;
        category: "tech" | "business" | "design" | "science" | "sports" | "arts" | "other" | null;
        bannerId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        registrationDeadline: Date | null;
    } | null;
}

const EditThumbnailCard: FC<EditThumbnailCardProps> = ({ initialData }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ExtendedSchemaType>({
        resolver: zodResolver(ExtendedSchema),
        defaultValues: {
            name: initialData?.name || "",
            tagline: initialData?.tagline || "",
            category: initialData?.category || "tech",
            bannerId: initialData?.bannerId || null,
            customCategory: "",
            startDate: initialData?.startDate || new Date(),
            endDate: initialData?.endDate || new Date(),
            registrationDeadline: initialData?.registrationDeadline || new Date(),
        },
    });

    const category = form.watch("category");

    const onSave = async () => {
        setIsSubmitting(true);
        const values = form.getValues();
        const result = await updateCompetitionAction(values);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Changes saved successfully!");
            setIsConfirmOpen(false);
        }
    };

    return (
        <div className="rounded-3xl p-0 gap-0 overflow-hidden bg-background border shadow-sm">
            <ConfirmSaveDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen} onConfirm={onSave} />
            <div className="p-8 pb-4">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-5 text-left space-y-0">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                            <Trophy size={28} />
                        </div>
                        <div className="space-y-1 text-foreground">
                            <h2 className="text-2xl font-bold ">Edit Competition Thumbnail</h2>
                            <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                                This is the public card delegates will see in the discovery feed. Think of it like your competition&apos;s Instagram post.
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

            <div className="px-8 pb-8">
                <Form form={form} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-x-10 gap-y-6 items-start">
                        <div className="space-y-6 px-1">
                            <Form.Item
                                label="Competition Name"
                                name="name"
                                helperText="The public name of your competition. Must be at least 3 characters."
                            >
                                <Input placeholder="e.g. Innovate Hackathon 2026" />
                            </Form.Item>

                            <Form.Item
                                label="Tagline"
                                name="tagline"
                                helperText="A catchy one-liner shown on discovery cards (max 150 characters)."
                            >
                                <Textarea placeholder="e.g. Building the future of AI together" className="min-h-32" />
                            </Form.Item>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Controller
                                    name="category"
                                    control={form.control}
                                    render={({ field, ...props }) => (
                                        <Form.CustomController
                                            label="Category"
                                            field={field}
                                            {...props}
                                            helperText="Helps delegates find your competition in their niche."
                                        >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="bg-input-background px-4">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {competitionCategoryEnum.map((cat) => (
                                                        <SelectItem key={cat} value={cat} className="capitalize">
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Form.CustomController>
                                    )}
                                />

                                <Form.Item
                                    label="Registration Deadline"
                                    name="registrationDeadline"
                                    helperText="Last day for delegates to sign up."
                                >
                                    <DateTimePicker />
                                </Form.Item>
                            </div>

                            {category === "other" && (
                                <Form.Item
                                    label="Custom Category"
                                    name="customCategory"
                                    helperText="Specify your unique competition category."
                                >
                                    <Input placeholder="e.g. Robotics, Gaming, etc." />
                                </Form.Item>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    helperText="When the competition actually begins."
                                >
                                    <DateTimePicker />
                                </Form.Item>

                                <Form.Item label="End Date" name="endDate" helperText="When the competition concludes.">
                                    <DateTimePicker />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-0">
                            <Controller
                                name="bannerId"
                                control={form.control}
                                render={({ field, ...props }) => (
                                    <Form.CustomController
                                        label="Banner Image"
                                        field={field}
                                        {...props}
                                        helperText="Recommended: 16:9 ratio. High quality images help attract more delegates."
                                    >
                                        <FileUpload<{ id: string }>
                                            endpoint="/api/upload?type=competition_banner"
                                            onChange={(files) => field.onChange(files[0]?.response?.id)}
                                            maxFiles={1}
                                            className="bg-input-background border-border/40 shadow-sm"
                                        />
                                    </Form.CustomController>
                                )}
                            />
                        </div>
                    </div>
                </Form>
            </div>


        </div>
    );
};

export default EditThumbnailCard;
