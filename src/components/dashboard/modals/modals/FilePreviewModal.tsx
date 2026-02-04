"use client";

import { FC } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ModalComponentProps } from "../modal-registry";
import { FileIcon, ExternalLink, Download } from "lucide-react";
import { getFileUrlById } from "~/lib/utils";

export interface FilePreviewModalData {
    files: string[];
    fieldName: string;
}

const FilePreviewModal: FC<ModalComponentProps<FilePreviewModalData>> = ({ data, closeModal }) => {
    const { files, fieldName } = data;

    return (
        <DialogContent className="max-w-md rounded-3xl p-8 gap-6">
            <DialogHeader className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-background text-primary flex items-center justify-center">
                    <FileIcon size={24} />
                </div>
                <div className="space-y-1 text-left">
                    <DialogTitle className="text-xl font-bold text-foreground">{fieldName} Files</DialogTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        Total {files.length} files attached to this response.
                    </p>
                </div>
            </DialogHeader>

            <div className="max-h-[40vh] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {files.map((fileId, index) => (
                    <div
                        key={fileId}
                        className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border/40 group hover:border-primary/40 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-background border border-border/60 flex items-center justify-center text-foreground/30 group-hover:text-primary transition-colors">
                                <FileIcon size={14} />
                            </div>
                            <span className="text-sm font-bold text-foreground">File {index + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-lg border-border/60 hover:bg-background hover:border-primary hover:text-primary text-xs font-black uppercase tracking-widest"
                                asChild
                            >
                                <a href={getFileUrlById(fileId)} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={12} className="mr-1.5" /> View
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-lg border-border/60 hover:bg-background hover:border-primary hover:text-primary text-xs font-black uppercase tracking-widest"
                                asChild
                            >
                                <a href={getFileUrlById(fileId)} download>
                                    <Download size={12} />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                onClick={closeModal}
                className="w-full h-12 rounded-2xl bg-[#0c0803] text-white font-black text-sm hover:scale-[1.02] transition-transform active:scale-95"
            >
                Close
            </Button>
        </DialogContent>
    );
};

export default FilePreviewModal;
