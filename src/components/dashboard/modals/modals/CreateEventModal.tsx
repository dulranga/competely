"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, Loader2, Plus, Trash2 } from "lucide-react";
import { type FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DateTimePicker } from "~/components/form-inputs/DateTimePicker";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import FormDebug from "~/components/form/FormDebug";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { createEventSchema, CreateEventSchema, eventTypeEnum } from "~/lib/schemas/timeline.schema";
import type { ModalComponentProps } from "../modal-registry";

export interface CreateEventModalData {
    roundId: string;
    onSuccess?: () => void;
}

const CreateEventModal: FC<ModalComponentProps<CreateEventModalData>> = ({ closeModal, data }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            name: "",
            eventTypeSelect: "Workshop",

            description: "",
            notificationEnabled: false,
            addToTimeline: true,
            resources: [],
            connectFormId: "none", // Default to none
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "resources",
    });

    const eventTypeSelect = form.watch("eventTypeSelect");

    // Mock Forms List - In real app, fetch from DB/API
    const availableForms = [
        { id: "none", name: "None" },
        { id: "form-123", name: "Registration Form" },
        { id: "form-456", name: "Feedback Survey" },
    ];

    const onSubmit = async (formData: unknown) => {
        const values = formData as CreateEventSchema;
        setIsSubmitting(true);

        // Determine Final Event Type
        const eventType = values.eventTypeSelect === "other"
            ? values.eventTypeCustom
            : values.eventTypeSelect;

        // Prepare Payload
        const payload = {
            ...values,
            eventType,
            roundId: data?.roundId,
        };

        console.log("Submitting Event Payload:", payload);

        // Mock API Call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        toast.success("Event created successfully!");
        data?.onSuccess?.();
        closeModal();
    };

    return (
        <DialogContent className="md:max-w-4xl rounded-3xl p-0 gap-0 overflow-hidden bg-background">
            <div className="p-8 pb-4">
                <DialogHeader className="flex flex-row items-center gap-5 text-left space-y-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                        <Calendar size={28} />
                    </div>
                    <div className="space-y-1 text-foreground">
                        <DialogTitle className="text-2xl font-bold">Create Event</DialogTitle>
                        <DialogDescription className="text-sm leading-relaxed font-medium text-muted-foreground">
                            Add a new event to your competition timeline.
                        </DialogDescription>
                    </div>
                </DialogHeader>
            </div>

            <ScrollArea className="max-h-[70vh] px-8">
                <Form form={form} onFinish={onSubmit} className="space-y-6 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Left Column */}
                        <div className="space-y-6">
                            <Form.Item label="Event Name" name="name" helperText="e.g. Opening Ceremony">
                                <Input placeholder="Event Name" />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="eventTypeSelect"
                                    control={form.control}
                                    render={({ field, fieldState, formState }) => (
                                        <Form.CustomController
                                            label="Type"
                                            field={field}
                                            fieldState={fieldState}
                                            formState={formState}
                                        >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {eventTypeEnum.options.map((opt) => (
                                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Form.CustomController>
                                    )}
                                />
                                {eventTypeSelect === "other" && (
                                    <Form.Item label="Custom Type" name="eventTypeCustom">
                                        <Input placeholder="Custom Type" maxLength={30} />
                                    </Form.Item>
                                )}
                            </div>

                            <Form.Item label="Description" name="description">
                                <Textarea className="min-h-[100px]" placeholder="Event details..." />
                            </Form.Item>

                            <Form.Item label="Location" name="location">
                                <Input placeholder="e.g. Main Hall or Zoom Link" />
                            </Form.Item>

                            <Controller
                                name="connectFormId"
                                control={form.control}
                                render={({ field, fieldState, formState }) => (
                                    <Form.CustomController
                                        label="Connect a Form"
                                        field={field}
                                        helperText="Link a form for users to fill out during this event."
                                        fieldState={fieldState}
                                        formState={formState}
                                    >
                                        <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a form" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableForms.map((f) => (
                                                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Form.CustomController>
                                )}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <Form.Item label="Start Date" name="startDate">
                                    <DateTimePicker />
                                </Form.Item>
                                <Form.Item label="End Date" name="endDate">
                                    <DateTimePicker />
                                </Form.Item>
                            </div>

                            {/* Resources Section */}
                            <div className="space-y-4 rounded-xl border border-border/50 p-4 bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-semibold">Resources</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => append({ label: "", type: "url", url: "" })}
                                        className="h-8 gap-2"
                                    >
                                        <Plus size={14} /> Add Resource
                                    </Button>
                                </div>

                                {fields.length === 0 && (
                                    <p className="text-sm text-muted-foreground italic text-center py-2">No resources added.</p>
                                )}

                                <div className="space-y-3">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-3 items-start bg-white p-3 rounded-lg border border-border/40 shadow-sm relative group">
                                            <div className="flex flex-col gap-3 flex-1">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Input
                                                        {...form.register(`resources.${index}.label` as const)}
                                                        placeholder="Label"
                                                        className="h-9"
                                                    />
                                                    <Controller
                                                        name={`resources.${index}.type` as const}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="h-9">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="url">URL</SelectItem>
                                                                    <SelectItem value="document">Document</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>

                                                <div className="w-full">
                                                    {form.watch(`resources.${index}.type`) === "url" ? (
                                                        <Input
                                                            {...form.register(`resources.${index}.url` as const)}
                                                            placeholder="https://..."
                                                            className="h-9"
                                                        />
                                                    ) : (
                                                        <Controller
                                                            name={`resources.${index}.fileId` as const}
                                                            control={form.control}
                                                            render={({ field: fileField }) => (
                                                                <div className="h-70">
                                                                    <FileUpload<{ id: string }>
                                                                        endpoint="/api/upload"
                                                                        onChange={(files) => fileField.onChange(files[0]?.response?.id)}
                                                                        maxFiles={1}
                                                                        className="h-full"
                                                                    />
                                                                </div>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 shrink-0"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Switches */}
                            <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Notifications</Label>
                                        <p className="text-xs text-muted-foreground">Notify users when this event starts.</p>
                                    </div>
                                    <Controller
                                        control={form.control}
                                        name="notificationEnabled"
                                        render={({ field }) => (
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        )}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Add to Timeline</Label>
                                        <p className="text-xs text-muted-foreground">Show this event on public timeline.</p>
                                    </div>
                                    <Controller
                                        control={form.control}
                                        name="addToTimeline"
                                        render={({ field }) => (
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        )}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <FormDebug />
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
                        "Create Event"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default CreateEventModal;
