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
        <DialogContent className="max-w-md rounded-[2.5rem] p-10">
            <DialogHeader className="space-y-4 flex flex-col items-center text-center">
                <div
                    className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center ${variant === "destructive" ? "bg-red-50 text-red-500" : "bg-[#fbf6f3] text-[#e5ab7d]"}`}
                >
                    <AlertCircle size={40} />
                </div>
                <div className="space-y-2">
                    <DialogTitle className="text-3xl font-black text-[#0c0803]">{title}</DialogTitle>
                    <DialogDescription className="text-lg text-[#0c0803]/40 leading-relaxed font-medium">
                        {description}
                    </DialogDescription>
                </div>
            </DialogHeader>

            <DialogFooter className="flex-row gap-4 mt-8">
                <Button
                    variant="ghost"
                    onClick={closeModal}
                    className="flex-1 h-14 rounded-2xl border border-[#e8e2de] font-bold text-[#0c0803]/60 hover:bg-[#fbf6f3]"
                >
                    {cancelLabel}
                </Button>
                <Button
                    onClick={handleConfirm}
                    className={`flex-1 h-14 rounded-2xl font-black text-lg transition-all active:scale-95 ${variant === "destructive" ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20" : "bg-[#0c0803] text-white hover:bg-black shadow-lg shadow-black/20"}`}
                >
                    {confirmLabel}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default ConfirmModal;
