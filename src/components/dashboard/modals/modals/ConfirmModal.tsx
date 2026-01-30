"use client";

import { FC } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ModalComponentProps } from "../modal-registry";
import { AlertCircle } from "lucide-react";

export interface ConfirmModalData {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive";
    onConfirm: () => void | Promise<void>;
}

const ConfirmModal: FC<ModalComponentProps<ConfirmModalData>> = ({ data, closeModal }) => {
    const {
        title,
        description,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        variant = "default",
        onConfirm,
    } = data;

    const handleConfirm = async () => {
        await onConfirm();
        closeModal();
    };

    return (
        <DialogContent className="max-w-sm rounded-3xl p-8 gap-6">
            <DialogHeader className="space-y-4 flex flex-col items-center text-center">
                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${variant === "destructive" ? "bg-red-50 text-red-500" : "bg-[#fbf6f3] text-[#e5ab7d]"}`}
                >
                    <AlertCircle size={24} />
                </div>
                <div className="space-y-1">
                    <DialogTitle className="text-xl font-bold text-[#0c0803]">{title}</DialogTitle>
                    <DialogDescription className="text-sm text-[#0c0803]/60 leading-relaxed font-medium">
                        {description}
                    </DialogDescription>
                </div>
            </DialogHeader>

            <DialogFooter className="grid grid-cols-2 gap-3 sm:justify-center">
                <Button
                    variant="competely-outline"
                    onClick={closeModal}
                    className="w-full h-10 rounded-xl text-xs uppercase tracking-widest font-bold"
                >
                    {cancelLabel}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant={variant === "destructive" ? "destructive" : "competely"}
                    className="w-full h-10 rounded-xl text-xs uppercase tracking-widest font-black"
                >
                    {confirmLabel}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default ConfirmModal;
