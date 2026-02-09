"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, ExternalLink, Loader2, Plus, RefreshCcw, Trash2 } from "lucide-react";
import { type FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getFormsAction } from "~/app/(authenticated)/dashboard/forms/actions";
import { DateTimePicker } from "~/components/form-inputs/DateTimePicker";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import FormDebug from "~/components/form/FormDebug";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { createEventAction, updateEventAction } from "~/data-access/competitions/actions/competition-events";
import { authClient } from "~/lib/auth-client";
import { createEventSchema, CreateEventSchema, eventTypeEnum } from "~/lib/schemas/timeline.schema";
import { cn } from "~/lib/utils";
import type { ModalComponentProps } from "../modal-registry";

export interface CreateEventModalData {
    roundId: string;
    eventId?: string; // For editing
    initialData?: CreateEventSchema; // Pre-fill data
    onSuccess?: () => void;
    isSystemEvent?: boolean;
}

const CreateEventModal: FC<ModalComponentProps<CreateEventModalData>> = ({ closeModal, data }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormSelectOpen, setFormSelectOpen] = useState(false);
    const isEditing = !!data?.eventId;

    const isSystemEvent = data.isSystemEvent;

    const queryClient = useQueryClient();

    const openInNewTab = (path: string) => {
        const newWindow = window.open(path, "_blank", "noopener,noreferrer");
        newWindow?.focus();
    };

    const openFormBuilder = () => {
        openInNewTab("/dashboard/forms/new");
    };

    const openFormsDashboard = () => {
        openInNewTab("/dashboard/forms");
    };

    // @ts-ignore
    const form = useForm({
        // @ts-ignore
        resolver: zodResolver(createEventSchema),
        defaultValues: data?.initialData || {
            name: "",
            eventTypeSelect: "Workshop",
            description: "",
            notificationEnabled: true,
            addToTimeline: true,
            resources: [],
            connectFormId: null,
        },
    });

    const { data: userSession } = authClient.useSession();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "resources",
    });

    const { data: forms = [], refetch } = useQuery({
        queryKey: ["availableForms", userSession?.session.activeOrganizationId],
        queryFn: async () => {
            if (!userSession?.session.activeOrganizationId) return [];
            return await getFormsAction();
        },
    });

    const eventTypeSelect = form.watch("eventTypeSelect");

    const onSubmit = async (formData: unknown) => {
        const values = formData as CreateEventSchema;
        setIsSubmitting(true);

        try {
            // Determine Final Event Type
            const eventType = values.eventTypeSelect === "other" ? values.eventTypeCustom : values.eventTypeSelect;

            const payload = {
                ...values,
                eventType, // Schema expects this if we were strictly strictly following it, checking implementation...
                // Actually server action expects CreateEventInput which matches schema mostly but helper might need manual mapping if schema doesn't match perfectly.
                // However, based on schema view, eventTypeSelect/Custom is used.
                // Let's rely on server action validation or mapper.
                // checking createEventAction signature... it takes CreateEventInput.
                // We might need to map it if the server action expects a single 'type' field instead of select/custom.
                // Assuming server action handles it or we map it here:
                type: eventType,
                roundId: data?.roundId,
            };

            if (isEditing && data?.eventId) {
                await updateEventAction(data.eventId, payload as any);
                toast.success("Event updated successfully!");
            } else {
                await createEventAction(payload as any);
                toast.success("Event created successfully!");
            }

            await queryClient.invalidateQueries({ queryKey: ["timeline", "competition"] });

            data?.onSuccess?.();
            closeModal();
        } catch (error: any) {
            console.error("Failed to save event:", error);
            toast.error(error.message || "Failed to save event");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DialogContent className="md:max-w-4xl rounded-3xl p-0 gap-0 bg-background">
            <div className="p-8 pb-4">
                <DialogHeader className="flex flex-row items-center gap-5 text-left space-y-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0">
                        <Calendar size={28} />
                    </div>
                    <div className="space-y-1 text-foreground">
                        <DialogTitle className="text-2xl font-bold">
                            {isEditing ? "Edit Event" : "Create Event"}
                        </DialogTitle>
                        <DialogDescription className="text-sm leading-relaxed font-medium text-muted-foreground">
                            {isEditing
                                ? "Update the details of this event."
                                : "Add a new event to your competition timeline."}
                        </DialogDescription>
                    </div>
                </DialogHeader>
            </div>

            <Form form={form} onFinish={onSubmit} className="space-y-6 pb-8">
                <ScrollArea className="max-h-[70vh] px-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <Form.Item
                                disabled={isSystemEvent}
                                label="Event Name"
                                name="name"
                                helperText="e.g. Opening Ceremony"
                            >
                                <Input placeholder="Event Name" />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="eventTypeSelect"
                                    disabled={isSystemEvent}
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
                                                        <SelectItem key={opt} value={opt}>
                                                            {opt}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Form.CustomController>
                                    )}
                                />
                                {eventTypeSelect === "other" && (
                                    <Form.Item disabled={isSystemEvent} label="Custom Type" name="eventTypeCustom">
                                        <Input placeholder="Custom Type" maxLength={30} />
                                    </Form.Item>
                                )}
                            </div>

                            <Form.Item disabled={isSystemEvent} label="Description" name="description">
                                <Textarea rows={5} placeholder="Event details..." />
                            </Form.Item>

                            <Form.Item disabled={isSystemEvent} label="Location" name="location">
                                <Input placeholder="e.g. Main Hall or Zoom Link" />
                            </Form.Item>

                            <Controller
                                name="connectFormId"
                                control={form.control}
                                disabled={false}
                                render={({ field, fieldState, formState }) => {
                                    const enabledField = { ...field, disabled: false };

                                    return (
                                        <Form.CustomController
                                            label="Connect a Form"
                                            field={enabledField}
                                            helperText="Link a form for users to fill out during this event. By default, you will only recieve information of the user's profile if no form is linked."
                                            fieldState={fieldState}
                                            formState={formState}
                                        >
                                            <Select
                                                onValueChange={enabledField.onChange}
                                                value={enabledField.value ?? undefined}
                                                disabled={false}
                                                open={isFormSelectOpen}
                                                onOpenChange={setFormSelectOpen}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a form" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {forms.map((f) => (
                                                        <SelectItem key={f.id} value={f.id}>
                                                            {f.name}
                                                        </SelectItem>
                                                    ))}
                                                    <SelectSeparator />
                                                    <div className="px-2 py-2 space-y-2">
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                                Quick actions
                                                            </p>
                                                            <Button
                                                                onClick={() => refetch()}
                                                                size={"xs"}
                                                                variant={"outline"}
                                                            >
                                                                <RefreshCcw /> Refresh
                                                            </Button>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="w-full justify-between rounded-lg border border-dashed border-primary/40 bg-transparent text-primary hover:bg-primary/10"
                                                            onClick={() => {
                                                                enabledField.onChange(null);
                                                                setFormSelectOpen(false);
                                                                openFormBuilder();
                                                            }}
                                                        >
                                                            Create a new form
                                                            <ExternalLink className="size-4" />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="w-full justify-between rounded-lg bg-input-background text-foreground hover:bg-input-background/80"
                                                            onClick={() => {
                                                                enabledField.onChange(null);
                                                                setFormSelectOpen(false);
                                                                openFormsDashboard();
                                                            }}
                                                        >
                                                            Manage forms
                                                            <ExternalLink className="size-4" />
                                                        </Button>
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                        </Form.CustomController>
                                    );
                                }}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <Form.Item disabled={isSystemEvent} label="Start Date" name="startDate">
                                    <DateTimePicker />
                                </Form.Item>
                                <Form.Item disabled={isSystemEvent} label="End Date" name="endDate">
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
                                        onClick={() => {
                                            if (isSystemEvent) {
                                                return;
                                            }
                                            return append({ label: "", type: "url", url: "" });
                                        }}
                                        className="h-8 gap-2"
                                    >
                                        <Plus size={14} /> Add Resource
                                    </Button>
                                </div>

                                {fields.length === 0 && (
                                    <p className="text-sm text-muted-foreground italic text-center py-2">
                                        No resources added.
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex gap-3 items-start bg-white p-3 rounded-lg border border-border/40 shadow-sm relative group"
                                        >
                                            <div className="flex flex-col gap-3 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        {...form.register(`resources.${index}.label` as const)}
                                                        placeholder="Label"
                                                        className="h-9"
                                                    />
                                                    <Controller
                                                        name={`resources.${index}.type` as const}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
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
                                                                <div className="min-h-70">
                                                                    <FileUpload<{ id: string }>
                                                                        endpoint="/api/upload?type=competition_guidelines"
                                                                        onChange={(files) =>
                                                                            fileField.onChange(files[0]?.response?.id)
                                                                        }
                                                                        maxFiles={1}
                                                                        className="h-full"
                                                                    />
                                                                </div>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Switches */}
                            <div className={cn("space-y-4 p-4 rounded-xl border border-border/50 bg-white")}>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Notifications</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Notify users when this event starts.
                                        </p>
                                    </div>
                                    {!isSystemEvent && (
                                        <Controller
                                            control={form.control}
                                            name="notificationEnabled"
                                            render={({ field }) => (
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            )}
                                        />
                                    )}{" "}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Add to Timeline</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Show this event on public timeline.
                                        </p>
                                    </div>
                                    {!isSystemEvent && (
                                        <Controller
                                            control={form.control}
                                            name="addToTimeline"
                                            render={({ field }) => (
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            )}
                                        />
                                    )}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormDebug />
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
                        type="submit"
                        className="h-11 rounded-xl text-sm uppercase tracking-widest font-black bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isEditing ? "Updating..." : "Creating..."}
                            </>
                        ) : isEditing ? (
                            "Update Event"
                        ) : (
                            "Create Event"
                        )}
                    </Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    );
};

export default CreateEventModal;
