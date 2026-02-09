"use client";

import { type FC, useState } from "react";
import { FormRenderer } from "~/components/form/FormRenderer";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import type { ModalComponentProps } from "../modal-registry";
import { ScrollArea } from "~/components/ui/scroll-area";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { submitFormAction } from "~/app/(authenticated)/dashboard/test-form/[id]/actions";
import { toast } from "sonner";

export interface RegistrationFormModalData {
    competitionId: string;
    formId: string;
    formName: string;
    formDescription?: string;
    fields: any[];
    onSuccess?: () => void;
}

const RegistrationFormModal: FC<ModalComponentProps<RegistrationFormModalData>> = ({ closeModal, data }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <DialogContent className="md:max-w-3xl rounded-3xl p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 pb-4">
                <DialogHeader className="text-left">
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight">{data.formName}</DialogTitle>
                    {data.formDescription && (
                        <DialogDescription className="text-lg font-medium text-muted-foreground">
                            {data.formDescription}
                        </DialogDescription>
                    )}
                </DialogHeader>
            </div>

            <ScrollArea className="flex-1 px-8 py-4 overflow-y-auto">
                <FormRenderer
                    fields={data.fields}
                    disabled={isSubmitting}
                    onFinish={async (formData) => {
                        setIsSubmitting(true);
                        try {
                            // 1. Submit form responses
                            await submitFormAction({
                                formId: data.formId,
                                answers: formData as Record<string, unknown>,
                            });

                            // 2. Register to competition
                            const result = await registerToCompetitionAction(data.competitionId);

                            if (result && "error" in result) {
                                toast.error(result.error);
                            } else {
                                toast.success("Successfully registered!");
                                data.onSuccess?.();
                                closeModal();
                            }
                        } catch (error: any) {
                            console.error("Registration failed:", error);
                            toast.error(error.message || "Failed to register.");
                        } finally {
                            setIsSubmitting(false);
                        }
                    }}
                    submitLabel={isSubmitting ? "Registering..." : "Complete Registration"}
                    className="pb-8"
                />
            </ScrollArea>
        </DialogContent>
    );
};

export default RegistrationFormModal;
