"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Users } from "lucide-react";
import { useState, type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUpload } from "~/components/form-inputs/FileUpload";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ConfirmSaveDialog } from "../ConfirmSaveDialog";

// Local schema for UI demonstration
const contactSchema = z.object({
    contacts: z.array(
        z.object({
            name: z.string().min(1, "Name is required"),
            role: z.string().min(1, "Role is required"),
            phone: z.string().optional(),
            email: z.string().email("Invalid email").optional().or(z.literal("")),
            imageId: z.string().optional().nullable(),
        })
    ),
});

type ContactSchema = z.infer<typeof contactSchema>;

export const ContactInformationSection: FC = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            contacts: [
                {
                    name: "",
                    role: "",
                    phone: "",
                    email: "",
                    imageId: null,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "contacts",
    });

    const onSave = () => {
        toast.success("Contact information updated successfully!");
    };

    return (
        <div className="rounded-3xl p-0 gap-0 overflow-hidden bg-background border shadow-sm mt-8">
            <ConfirmSaveDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen} onConfirm={onSave} />

            <div className="p-8 pb-4 border-b">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600 shrink-0">
                            <Users size={28} />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Contact Us Section</h2>
                            <p className="text-sm font-medium text-muted-foreground">
                                Add contact details for the Organizing Committee here.
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

            <div className="p-8 bg-gray-50/50">
                <Form form={form} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {fields.map((field, index) => (
                            <Card key={field.id} className="shadow-sm border-border/60 overflow-hidden">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-end mb-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            disabled={fields.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                    <div className="mb-6">
                                        <Form.Item name={`contacts.${index}.imageId`} label="Profile Photo" className="w-full">
                                            <FileUpload<{ id: string }>
                                                endpoint="/api/upload?type=competition_banner"
                                                onChange={(files) => {
                                                    form.setValue(`contacts.${index}.imageId`, files[0]?.response?.id);
                                                }}
                                                maxFiles={1}
                                                className="w-full bg-background"
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item name={`contacts.${index}.name`} label="Name">
                                        <Input placeholder="e.g. Jhonas Khanwald" />
                                    </Form.Item>

                                    <Form.Item name={`contacts.${index}.role`} label="Role">
                                        <Input placeholder="e.g. President" />
                                    </Form.Item>

                                    <Form.Item name={`contacts.${index}.phone`} label="Phone">
                                        <Input placeholder="e.g. 0123456789" />
                                    </Form.Item>

                                    <Form.Item name={`contacts.${index}.email`} label="Email">
                                        <Input placeholder="e.g. jhonas@gmail.com" />
                                    </Form.Item>
                                </CardContent>
                            </Card>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ name: "", role: "", phone: "", email: "", imageId: null })}
                            className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/60 rounded-xl p-6 h-full min-h-[400px] hover:bg-muted/50 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Plus size={24} className="text-muted-foreground" />
                            </div>
                            <span className="font-semibold text-muted-foreground">Add Contact</span>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
