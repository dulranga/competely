import React from "react";
import { FileIcon, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { getFileUrlById } from "~/lib/utils";
import type { FormFieldType } from "~/consts/forms";
import { useModal } from "./modals/modal-provider";

export const NullRenderer = () => <span className="text-foreground/20">—</span>;

export const FileRenderer = ({ value, field }: { value: any; field: any }) => {
    const { openModal } = useModal();
    const fileIds = Array.isArray(value) ? value : [value];
    if (fileIds.length === 0) return <NullRenderer />;

    if (fileIds.length === 1) {
        return (
            <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary font-bold hover:text-primary/80"
                asChild
            >
                <a href={getFileUrlById(fileIds[0])} target="_blank" rel="noopener noreferrer">
                    <FileIcon size={12} className="mr-1" /> View File
                </a>
            </Button>
        );
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-lg border-border/60 bg-white text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:border-primary hover:text-primary"
            onClick={() => openModal("filePreview", { files: fileIds, fieldName: field.name })}
        >
            <Eye size={10} className="mr-1.5" /> {fileIds.length} Files
        </Button>
    );
};

export const MultiValueRenderer = ({ value }: { value: any; field?: any }) => {
    const values = Array.isArray(value) ? value : [value];
    return (
        <div className="flex flex-wrap gap-1.5 max-w-50">
            {values.map((v: string) => (
                <Badge
                    key={v}
                    variant="secondary"
                    className="bg-secondary/20 text-foreground border-none text-xs font-semibold"
                >
                    {v}
                </Badge>
            ))}
        </div>
    );
};

export const DateTimeRenderer = ({ value }: { value: any; field?: any }) => (
    <span className="font-medium text-foreground/80">{new Date(value as string).toLocaleDateString()}</span>
);

export const DefaultRenderer = ({ value }: { value: any; field?: any }) => (
    <span className="font-medium text-foreground/80 truncate max-w-50" title={String(value)}>
        {String(value)}
    </span>
);

export const FIELD_RENDERERS: Record<FormFieldType, React.FC<{ value: any; field: any }>> = {
    text: DefaultRenderer,
    textarea: DefaultRenderer,
    number: DefaultRenderer,
    radio: DefaultRenderer,
    file: FileRenderer,
    checkbox: MultiValueRenderer,
    select: ({ value, field }) => {
        if (Array.isArray(value)) return <MultiValueRenderer value={value} />;
        return <DefaultRenderer value={value} field={field} />;
    },
    datetime: DateTimeRenderer,
};

export const renderFieldValue = (value: any, field: any) => {
    if (value === undefined || value === null) return <NullRenderer />;

    const Renderer = FIELD_RENDERERS[field.type as FormFieldType];
    if (Renderer) return <Renderer value={value} field={field} />;

    return <DefaultRenderer value={value} field={field} />;
};
