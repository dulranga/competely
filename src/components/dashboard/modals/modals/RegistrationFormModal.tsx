"use client";

import { type FC } from "react";
import { FormRenderer } from "~/components/form/FormRenderer";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import type { ModalComponentProps } from "../modal-registry";
import { ScrollArea } from "~/components/ui/scroll-area";

export interface RegistrationFormModalData {
    competitionId: string;
    formName: string;
    formDescription?: string;
    fields: any[];
    onSuccess?: () => void;
}

const RegistrationFormModal: FC<ModalComponentProps<RegistrationFormModalData>> = ({ closeModal, data }) => {
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

            <ScrollArea className="flex-1 px-8 py-4">
                <FormRenderer
                    fields={data.fields}
                    onFinish={(formData) => {
                        console.log("Registration Form Submitted:", formData);
                        data.onSuccess?.();
                        closeModal();
                    }}
                    submitLabel="Complete Registration"
                    className="pb-8"
                />
            </ScrollArea>
        </DialogContent>
    );
};

export default RegistrationFormModal;
