"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trophy } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { string } from "zod";
import { updateCompetitionAction } from "~/app/(authenticated)/dashboard/editor/actions";
import { DateTimePicker } from "~/components/form-inputs/DateTimePicker";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import TagsInput from "~/components/form-inputs/TagsInput";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { competitionCategoryOptions, createCompetitionSchema } from "~/lib/schemas/competition.schema";
import { ConfirmSaveDialog } from "./ConfirmSaveDialog";

const ExtendedSchema = createCompetitionSchema.extend({
    customCategory: string().optional(),
});

interface EditThumbnailCardProps {
    initialData?: {
        id: string;
        name: string | null;
        societyName: string | null;
        tagline: string | null;
        shortDescription: string | null;
        category: string | null;
        hashtags: string[] | null;
        bannerId: string | null;
        posterId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        registrationDeadline: Date | null;
    } | null;
}

const EditThumbnailCard: FC<EditThumbnailCardProps> = ({ initialData }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(ExtendedSchema),
        defaultValues: {
            name: initialData?.name || "",
            societyName: initialData?.societyName || "",
            tagline: initialData?.tagline || "",
            shortDescription: initialData?.shortDescription || "",
            category: initialData?.category || "Open",
            hashtags: initialData?.hashtags || [],
            bannerId: initialData?.bannerId || null,
            posterId: initialData?.posterId || null,
            customCategory: "",
            startDate: initialData?.startDate || new Date(),
            endDate: initialData?.endDate || new Date(),
            registrationDeadline: initialData?.registrationDeadline || new Date(),
        },
    });

    // Initialize custom category state and form when component mounts or data changes
    useEffect(() => {
        if (initialData) {
            // Reset form with updated data
            form.reset({
                name: initialData.name || "",
                tagline: initialData.tagline || "",
                shortDescription: initialData.shortDescription || "",
                category: initialData.category || "Open",
                hashtags: initialData.hashtags || [],
                bannerId: initialData.bannerId || null,
                customCategory: "",
                startDate: initialData.startDate || new Date(),
                endDate: initialData.endDate || new Date(),
                registrationDeadline: initialData.registrationDeadline || new Date(),
            });

            // Handle custom category initialization
            if (initialData.category && !competitionCategoryOptions.includes(initialData.category as any)) {
                setCustomCategory(initialData.category);
                setShowCustomInput(true);
            } else {
                setCustomCategory("");
                setShowCustomInput(false);
            }
        }
    }, [initialData, form]);

    const onSave = async () => {
        setIsSubmitting(true);
        const values = form.getValues();

        // Trigger form validation
        const isValid = await form.trigger();

        if (!isValid) {
            setIsSubmitting(false);
            toast.error("Please fix form errors before saving");
            return;
        }
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
                                This is the public card delegates will see in the discovery feed. Think of it like your
                                competition&apos;s Instagram post.
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
                <Form form={form} className="space-y-6" onFinish={onSave}>
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
                                label="Society Name"
                                name="societyName"
                                helperText="The name of the society organising the competition."
                            >
                                <Input placeholder="e.g. Tec Dev Club" />
                            </Form.Item>

                            <Form.Item
                                label="Tagline"
                                name="tagline"
                                helperText="A catchy one-liner shown on discovery cards (max 150 characters)."
                            >
                                <Textarea placeholder="e.g. Building the future of AI together" className="min-h-[80px]" />
                            </Form.Item>

                            <Form.Item
                                label="Short Description"
                                name="shortDescription"
                                helperText="A brief summary of your competition (max 500 characters)."
                            >
                                <Textarea
                                    placeholder="e.g. Join us for a 48-hour hackathon focused on building innovative solutions..."
                                    className="min-h-[120px]"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Keywords / Hashtags"
                                name="hashtags"
                                helperText="Add keywords to help delegates find your competition. Press Enter or comma to add each keyword."
                            >
                                <TagsInput placeholder="e.g. AI, machine learning, innovation" maxTags={10} />
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
                                            <div className="space-y-3">
                                                <Select
                                                    value={
                                                        competitionCategoryOptions.includes(field.value as any)
                                                            ? field.value
                                                            : "custom"
                                                    }
                                                    onValueChange={(value) => {
                                                        if (value === "custom") {
                                                            setShowCustomInput(true);
                                                            if (customCategory) {
                                                                field.onChange(customCategory);
                                                            }
                                                        } else {
                                                            setShowCustomInput(false);
                                                            setCustomCategory("");
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                >
                                                    <SelectTrigger className="bg-input-background px-4">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {competitionCategoryOptions.map((cat) => (
                                                            <SelectItem key={cat} value={cat}>
                                                                {cat}
                                                            </SelectItem>
                                                        ))}
                                                        <SelectItem value="custom">Specify custom category</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {showCustomInput && (
                                                    <Input
                                                        placeholder="Enter custom category"
                                                        value={customCategory}
                                                        onChange={(e) => {
                                                            setCustomCategory(e.target.value);
                                                            field.onChange(e.target.value);
                                                        }}
                                                        className="bg-input-background px-4"
                                                    />
                                                )}
                                            </div>
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
                                name="posterId"
                                control={form.control}
                                render={({ field, ...props }) => (
                                    <Form.CustomController
                                        label="Card Image (Poster)"
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
