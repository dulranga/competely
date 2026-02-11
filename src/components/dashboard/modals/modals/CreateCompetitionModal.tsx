"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trophy } from "lucide-react";
import { type FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCompetitionAction } from "~/app/(authenticated)/create/actions";

import { DateTimePicker } from "~/components/form-inputs/DateTimePicker";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import TagsInput from "~/components/form-inputs/TagsInput";
import Form from "~/components/form/Form";

import { Button } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import {
    type CreateCompetitionSchema,
    competitionCategoryOptions,
    createCompetitionSchema,
} from "~/lib/schemas/competition.schema";
import type { ModalComponentProps } from "../modal-registry";

export interface CreateCompetitionModalData {
    onSuccess?: (id: string) => void;
}

const CreateCompetitionModal: FC<ModalComponentProps<CreateCompetitionModalData>> = ({ closeModal, data }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customCategory, setCustomCategory] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);

    const form = useForm<CreateCompetitionSchema>({
        resolver: zodResolver(createCompetitionSchema),
        defaultValues: {
            name: "",
            societyName: "",
            tagline: "",
            category: "Open",
            hashtags: [],
            bannerId: null,
            posterId: null,
        },
    });

    const onSubmit = async (values: unknown) => {
        setIsSubmitting(true);
        const result = await createCompetitionAction(values);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Competition created successfully!");
            if (result.id) {
                data.onSuccess?.(result.id);
            }
            closeModal();
        }
    };
    return (
        <DialogContent className="md:max-w-7xl rounded-3xl p-0 gap-0 overflow-hidden bg-background">
            <div className="p-8 pb-4">
                <DialogHeader className="flex flex-row items-center gap-5 text-left space-y-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                        <Trophy size={28} />
                    </div>
                    <div className="space-y-1 text-foreground">
                        <DialogTitle className="text-2xl font-bold ">Create Competition</DialogTitle>
                        <DialogDescription className="text-sm leading-relaxed font-medium text-muted-foreground">
                            Set up your new competition. You can always change these details later.
                        </DialogDescription>
                    </div>
                </DialogHeader>
            </div>

            <ScrollArea className="max-h-[70vh] px-8">
                <Form form={form} onFinish={onSubmit} className="space-y-6 pb-8">
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
                                helperText="A catchy one-liner shown on competition's public page (max 150 characters)."
                            >
                                <Textarea placeholder="e.g. Building the future of AI together" className="min-h-[80px]" />
                            </Form.Item>

                            <Form.Item
                                label="Short Description"
                                name="shortDescription"
                                helperText="A brief summary of your competition shown on discovery card (max 500 characters)."
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
                                                    onValueChange={(value) => {
                                                        if (value === "custom") {
                                                            setShowCustomInput(true);
                                                            if (customCategory) {
                                                                field.onChange(customCategory);
                                                            }
                                                        } else {
                                                            setShowCustomInput(false);
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                    defaultValue={
                                                        competitionCategoryOptions.includes(field.value as any)
                                                            ? field.value
                                                            : "custom"
                                                    }
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
                                                        <SelectItem value="custom">Custom</SelectItem>
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
            </ScrollArea>

            <DialogFooter className="p-8 pt-4 bg-input-background border-t border-border/40 grid grid-cols-2 gap-3 sm:justify-end">
                <Button
                    variant="ghost"
                    onClick={closeModal}
                    className="h-11 rounded-xl font-bold text-muted-foreground"
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="h-11 rounded-xl text-sm uppercase tracking-widest font-black bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Competition"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default CreateCompetitionModal;
