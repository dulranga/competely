import { File as FileIcon, RotateCw, Trash2, UploadCloud } from "lucide-react";
import React, { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { formatFileSize } from "~/lib/format-file-size";
import { cn } from "~/lib/utils";
import { Card, CardContent } from "../ui/card";

export interface UploadedFileRecord<T> {
    file: File;
    id: string;
    status: "uploading" | "success" | "error";
    progress: number;
    response?: T;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface FileUploadProps<T> {
    endpoint: string;
    onChange?: (files: UploadedFileRecord<T>[]) => void;
    maxFiles?: number;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    supportedTypesHelpText?: ReactNode;
    className?: string;
    renderFileActions?: (
        file: UploadedFileRecord<T>,
        updateFile: (patch: Partial<UploadedFileRecord<T>>) => void,
    ) => React.ReactNode;
    initialFiles?: Array<{
        file: File;
        id: string;
        response?: T;
    }>;
}

export function FileUpload<T>({
    endpoint,
    onChange,
    maxFiles = 100,
    acceptedFileTypes = ["image/jpeg", "image/png", "application/pdf"],
    maxFileSize = 50 * 1024 * 1024,
    renderFileActions,
    supportedTypesHelpText = "Only .jpg, .png and .pdf files are supported",
    initialFiles = [],
    className,
}: FileUploadProps<T>) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileRecord<T>[]>(() =>
        initialFiles.map((f) => ({
            ...f,
            status: "success" as const,
            progress: 100,
        })),
    );

    const [shouldNotify, setShouldNotify] = useState(false);

    // If initialFiles changes after mount, merge them in (idempotent)
    React.useEffect(() => {
        setUploadedFiles((prev) => {
            const existingIds = new Set(prev.map((f) => f.id));
            const newOnes = initialFiles
                .filter((f) => !existingIds.has(f.id))
                .map((f) => ({ ...f, status: "success" as const, progress: 100 }));
            if (newOnes.length === 0) return prev;
            return [...prev, ...newOnes];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(initialFiles)]);

    const triggerOnChange = useCallback((files: UploadedFileRecord<T>[]) => {
        onChange?.(files.filter((f) => f.status === "success"));
    }, [onChange]);

    React.useEffect(() => {
        if (shouldNotify) {
            triggerOnChange(uploadedFiles);
            setShouldNotify(false);
        }
    }, [uploadedFiles, shouldNotify, triggerOnChange]);

    const updateFile = (id: string, patch: Partial<UploadedFileRecord<T>>) => {
        setUploadedFiles((prev) => {
            const updated = prev.map((f) => (f.id === id ? { ...f, ...patch } : f));
            return updated;
        });
        setShouldNotify(true);
    };

    const uploadFile = async (file: File, id: string) => {
        updateFile(id, { status: "uploading", progress: 0 });
        try {
            const formData = new FormData();
            formData.append("file", file);
            const progressInterval = setInterval(() => {
                setUploadedFiles((prev) =>
                    prev.map((f) => (f.id === id && f.progress < 90 ? { ...f, progress: f.progress + 10 } : f)),
                );
                // No need to notify on progress
            }, 100);
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });
            clearInterval(progressInterval);
            if (!response.ok) throw new Error("Upload failed");
            const result = await response.json();
            updateFile(id, { status: "success", progress: 100, response: result });
        } catch {
            updateFile(id, { status: "error", progress: 100 });
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const availableSlots = maxFiles - uploadedFiles.length;
            const filesToAdd = acceptedFiles.slice(0, availableSlots);
            const newFiles: UploadedFileRecord<T>[] = filesToAdd.map((file) => ({
                file,
                id: Math.random().toString(36).substring(2, 15),
                status: "uploading" as const,
                progress: 0,
            }));
            setUploadedFiles((prev) => [...prev, ...newFiles]);
            // Notifications happen when upload completes/fails via updateFile
            newFiles.forEach((fileObj) => uploadFile(fileObj.file, fileObj.id));
        },
        [endpoint, uploadedFiles.length, maxFiles, uploadFile], // endpoint, etc are used? uploadFile uses them? uploadFile is defined above.
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: maxFiles - uploadedFiles.length,
        maxSize: maxFileSize,
        accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    });

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => {
            const updated = prev.filter((f) => f.id !== id);
            return updated;
        });
        setShouldNotify(true);
    };

    const retryFile = (fileObj: UploadedFileRecord<T>) => {
        uploadFile(fileObj.file, fileObj.id);
    };

    return (
        <Card className={cn("w-full rounded-2xl border-border/50 shadow-none", className)}>
            <CardContent className="">
                <div>
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border border-dashed rounded-xl p-6 md:p-10 text-center cursor-pointer transition-all mb-4",
                            "border-primary/40 hover:border-primary hover:bg-primary/2",
                            isDragActive && "bg-primary/10 border-primary",
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-2">
                            <UploadCloud className="h-10 w-10 text-primary mb-2 opacity-80" />
                            <div className="text-sm font-medium">
                                Drag and drop your file(s) or{" "}
                                <span className="text-primary underline underline-offset-4">browse</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Max 50MB files allowed</div>
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground/60 italic">{supportedTypesHelpText}</div>
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                        {uploadedFiles.map((fileObj) => {
                            const isError = fileObj.status === "error";
                            const isUploading = fileObj.status === "uploading";
                            return (
                                <div
                                    key={fileObj.id}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl border transition-all bg-card/50",
                                        isError ? "border-destructive/30 bg-destructive/2" : "border-border/50",
                                    )}
                                >
                                    <div className="relative">
                                        <FileIcon
                                            className={cn("h-8 w-8", isError ? "text-destructive" : "text-primary/70")}
                                        />
                                        {isUploading && (
                                            <div
                                                className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-sm"
                                                style={{ clipPath: `inset(${100 - fileObj.progress}% 0 0 0)` }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    "text-sm font-medium truncate",
                                                    isError ? "text-destructive" : "text-foreground",
                                                )}
                                            >
                                                {fileObj.file.name}
                                            </span>
                                            {isUploading && (
                                                <Badge
                                                    variant="secondary"
                                                    className="h-5 text-[10px] px-1.5 animate-pulse"
                                                >
                                                    Uploading...
                                                </Badge>
                                            )}
                                            {isError && (
                                                <Badge variant="destructive" className="h-5 text-[10px] px-1.5">
                                                    Failed
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground/70">
                                                {formatFileSize(fileObj.file.size)}
                                            </span>
                                            {isUploading && (
                                                <span className="text-[10px] text-muted-foreground/50">
                                                    {fileObj.progress}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {renderFileActions && !isError && !isUploading && (
                                            <div className="mr-1">
                                                {renderFileActions(fileObj, (patch) => updateFile(fileObj.id, patch))}
                                            </div>
                                        )}
                                        {isError && (
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                                className="rounded-lg border-destructive/20 text-destructive hover:bg-destructive/10"
                                                onClick={() => retryFile(fileObj)}
                                                title="Retry"
                                            >
                                                <RotateCw className="h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => removeFile(fileObj.id)}
                                            title="Remove"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
