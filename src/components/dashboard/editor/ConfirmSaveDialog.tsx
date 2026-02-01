"use client";

import { AlertTriangle } from "lucide-react";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

interface ConfirmSaveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export const ConfirmSaveDialog: FC<ConfirmSaveDialogProps> = ({ open, onOpenChange, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl p-0 gap-0 overflow-hidden">
                <div className="p-6 pb-2">
                    <DialogHeader className="flex flex-row items-center gap-4 space-y-0 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-bold">Save Changes?</DialogTitle>
                            <DialogDescription className="font-medium">
                                Are you sure you want to save these changes to your competition?
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                </div>
                <DialogFooter className="p-6 pt-4 bg-muted/30 grid grid-cols-2 gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-11 rounded-xl font-bold text-muted-foreground hover:bg-transparent hover:text-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="h-11 rounded-xl text-sm uppercase tracking-widest font-black bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Confirm Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
