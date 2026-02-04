"use client";

import { FC, useState, useMemo } from "react";
import {
    Plus,
    Trash2,
    GripVertical,
    Type,
    AlignLeft,
    Hash,
    CheckSquare,
    List,
    Calendar,
    Upload as UploadIcon,
    X,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useModal } from "./modals/modal-provider";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { z } from "zod";

interface Field {
    id: string;
    name: string;
    type: string;
    required: boolean;
    config?: {
        options?: string[];
        placeholder?: string;
        min?: number;
        max?: number;
    };
}

interface FormBuilderProps {
    initialData?: {
        id?: string;
        name: string;
        description: string;
        published: boolean;
        fields: Field[];
    };
    onSave: (data: {
        id?: string;
        name: string;
        description: string;
        published: boolean;
        fields: Field[];
    }) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
}

const OptionsManager: FC<{
    options: string[];
    onChange: (options: string[]) => void;
}> = ({ options, onChange }) => {
    const addOption = () => onChange([...options, `Option ${options.length + 1}`]);
    const removeOption = (index: number) => onChange(options.filter((_, i) => i !== index));
    const updateOption = (index: number, val: string) => {
        const newOptions = [...options];
        newOptions[index] = val;
        onChange(newOptions);
    };

    return (
        <div className="space-y-3 mt-6 ml-10 pl-6 border-l-2 border-[#e8e2de]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/30 mb-3">Options</p>
            {options.map((opt, i) => (
                <div key={i} className="flex gap-3 items-center group/opt">
                    <div className="w-2 h-2 rounded-full bg-[#e8e2de] group-focus-within/opt:bg-[#e5ab7d] transition-colors" />
                    <Input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        className="flex-1 h-9 text-sm bg-transparent border-none focus-visible:ring-0 px-0 font-medium"
                        placeholder="Option label"
                    />
                    <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeOption(i)}
                        className="opacity-0 group-hover/opt:opacity-100 h-8 w-8 text-red-500 rounded-lg hover:bg-red-50"
                    >
                        <X size={14} />
                    </Button>
                </div>
            ))}
            <Button
                variant="ghost"
                size="sm"
                onClick={addOption}
                className="h-9 px-3 text-[10px] font-black text-[#e5ab7d] hover:text-[#e5ab7d]/80 uppercase tracking-[0.1em] hover:bg-[#e5ab7d]/5 rounded-xl transition-all"
            >
                <Plus size={14} className="mr-2" />
                Add New Option
            </Button>
        </div>
    );
};

const SortableField: FC<{
    field: Field;
    updateField: (id: string, updates: Partial<Field>) => void;
    deleteField: (id: string, name: string) => void;
}> = ({ field, updateField, deleteField }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    const typeConfig = FIELD_CONFIGS[field.type as keyof typeof FIELD_CONFIGS] || FIELD_CONFIGS.text;
    const Icon = typeConfig.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group bg-white rounded-2xl border border-[#e8e2de]/60 hover:border-[#e5ab7d]/40 p-6 transition-all relative ${isDragging ? "opacity-50 ring-1 ring-[#e5ab7d] scale-[1.02] shadow-xl z-50" : "shadow-sm"}`}
        >
            <div className="flex gap-6 items-start">
                <div
                    {...attributes}
                    {...listeners}
                    className="pt-3.5 text-[#0c0803]/10 cursor-grab active:cursor-grabbing hover:text-[#0c0803]/40 transition-colors"
                >
                    <GripVertical size={20} />
                </div>

                <div className="flex-1 space-y-5">
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-[#fbf6f3] flex items-center justify-center text-[#e5ab7d] border border-[#e8e2de]/40 shrink-0">
                            <Icon size={22} />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Input
                                value={field.name}
                                onChange={(e) => updateField(field.id, { name: e.target.value })}
                                className="w-full text-lg font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-[#0c0803]/10"
                                placeholder="Enter your question here..."
                            />
                            <div className="flex items-center gap-4">
                                <Select
                                    value={field.type}
                                    onValueChange={(val) => updateField(field.id, { type: val })}
                                >
                                    <SelectTrigger className="h-8 w-auto border-none bg-transparent p-0 text-[11px] font-black uppercase tracking-widest text-[#0c0803]/40 hover:text-[#0c0803] transition-colors focus:ring-0 space-x-2">
                                        <div className="flex items-center gap-2">
                                            <span>Type:</span>
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-[#e8e2de]">
                                        {Object.entries(FIELD_CONFIGS).map(([key, config]) => (
                                            <SelectItem key={key} value={key} className="text-xs font-bold">
                                                <div className="flex items-center gap-2">
                                                    <config.icon size={14} className="text-[#0c0803]/40" />
                                                    {config.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="w-px h-3 bg-[#e8e2de]" />

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id={`req-${field.id}`}
                                        checked={field.required}
                                        onCheckedChange={(val) => updateField(field.id, { required: !!val })}
                                        className="w-4 h-4 rounded-md border-[#e8e2de]"
                                    />
                                    <label
                                        htmlFor={`req-${field.id}`}
                                        className="text-[10px] font-black text-[#0c0803]/40 uppercase tracking-widest cursor-pointer"
                                    >
                                        Required
                                    </label>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => deleteField(field.id, field.name)}
                            className="text-[#0c0803]/10 hover:text-red-500 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>

                    {/* Contextual Inputs */}
                    {(field.type === "select" || field.type === "checkbox") && (
                        <OptionsManager
                            options={field.config?.options || ["Option 1"]}
                            onChange={(options) => updateField(field.id, { config: { ...field.config, options } })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const FIELD_CONFIGS: Record<string, { label: string; icon: any; schema: z.ZodTypeAny; defaultProps?: any }> = {
    text: {
        label: "Short Answer",
        icon: Type,
        schema: z.string().min(1, "Required"),
        defaultProps: { placeholder: "Write your answer..." },
    },
    textarea: {
        label: "Paragraph",
        icon: AlignLeft,
        schema: z.string().min(1, "Required"),
        defaultProps: { placeholder: "Write a long response..." },
    },
    number: {
        label: "Number",
        icon: Hash,
        schema: z.number(),
        defaultProps: { placeholder: "0" },
    },
    checkbox: {
        label: "Checkboxes",
        icon: CheckSquare,
        schema: z.array(z.string()).min(1, "Select at least one"),
        defaultProps: { options: ["Option 1"] },
    },
    select: {
        label: "Dropdown",
        icon: List,
        schema: z.string().min(1, "Select an option"),
        defaultProps: { options: ["Option 1"] },
    },
    datetime: {
        label: "Date",
        icon: Calendar,
        schema: z.date(),
    },
    file: {
        label: "File Upload",
        icon: UploadIcon,
        schema: z.any(),
    },
};

const FormBuilder: FC<FormBuilderProps> = ({ initialData, onSave, onDelete }) => {
    const { openModal } = useModal();
    const [name, setName] = useState(initialData?.name || "Untitled Form");
    const [description, setDescription] = useState(initialData?.description || "Form Description");
    const [published, setPublished] = useState(initialData?.published ?? false);
    const [fields, setFields] = useState<Field[]>(
        initialData?.fields || [
            {
                id: crypto.randomUUID(),
                name: "Untitled Question",
                type: "text",
                required: false,
                config: FIELD_CONFIGS.text.defaultProps,
            },
        ],
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const addField = () => {
        const type = "text";
        setFields([
            ...fields,
            {
                id: crypto.randomUUID(),
                name: "Untitled Question",
                type,
                required: false,
                config: FIELD_CONFIGS[type].defaultProps,
            },
        ]);
    };

    const updateField = (id: string, updates: Partial<Field>) => {
        setFields(
            fields.map((f) => {
                if (f.id !== id) return f;
                const newField = { ...f, ...updates };

                // Handle type change defaults
                if (updates.type && updates.type !== f.type) {
                    newField.config = FIELD_CONFIGS[updates.type].defaultProps || {};
                }

                return newField;
            }),
        );
    };

    const deleteField = (id: string, fieldName: string) => {
        openModal("confirm", {
            title: "Remove Field",
            description: `Are you sure you want to remove "${fieldName}"? This will delete all collected data for this field.`,
            variant: "destructive",
            confirmLabel: "Remove Field",
            onConfirm: () => {
                setFields(fields.filter((f) => f.id !== id));
            },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSave = async () => {
        await onSave({ id: initialData?.id, name, description, published, fields });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-10 pb-32">
            {/* Header Area */}
            <div className="space-y-6 px-4">
                <div className="group relative">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-4xl md:text-5xl font-black border border-[#e8e2de]/60 px-6 focus-visible:ring-0 placeholder:text-[#0c0803]/10 h-auto py-5 bg-white shadow-sm tracking-tighter rounded-2xl transition-all w-full"
                        placeholder="Form Title"
                    />
                    <div className="absolute bottom-3 left-6 w-8 h-1 bg-[#e5ab7d]/20 group-focus-within:w-[calc(100%-48px)] group-focus-within:bg-[#e5ab7d] transition-all duration-500 rounded-full" />
                </div>
                <div className="flex items-start gap-4 group">
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-lg text-[#0c0803]/60 border border-[#e8e2de]/60 px-6 focus-visible:ring-0 placeholder:text-[#0c0803]/10 min-h-[4rem] py-4 bg-white shadow-sm font-medium rounded-2xl transition-all resize-none w-full"
                        placeholder="Add a description for your delegates..."
                    />
                </div>
            </div>

            {/* Fields List */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                updateField={updateField}
                                deleteField={deleteField}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Actions */}
            <div className="flex items-center justify-center pt-2">
                <Button onClick={addField} variant="competely-outline" size="icon" className="rounded-full shadow-md">
                    <Plus size={20} />
                </Button>
            </div>

            {/* Sticky Save Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-white/90 backdrop-blur-md border border-[#e8e2de] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
                    {initialData?.id && onDelete && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => {
                                    openModal("confirm", {
                                        title: "Delete Form",
                                        description:
                                            "Are you sure you want to delete this form? This action cannot be undone.",
                                        variant: "destructive",
                                        confirmLabel: "Delete Form",
                                        onConfirm: () => onDelete(initialData.id!),
                                    });
                                }}
                                className="text-red-500 hover:bg-red-50"
                            >
                                <Trash2 size={18} />
                            </Button>
                            <div className="w-px h-4 bg-[#e8e2de]" />
                        </>
                    )}

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="publish-toggle"
                            checked={published}
                            onCheckedChange={(val) => setPublished(!!val)}
                            className="w-4 h-4 rounded-md border-[#e8e2de]"
                        />
                        <label
                            htmlFor="publish-toggle"
                            className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/60"
                        >
                            {published ? "Published" : "Draft"}
                        </label>
                    </div>

                    <div className="w-px h-4 bg-[#e8e2de]" />

                    <div className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/40">
                        {fields.length} Fields
                    </div>
                    <div className="w-px h-4 bg-[#e8e2de]" />
                    <Button
                        onClick={handleSave}
                        variant="competely"
                        className="h-10 px-6 rounded-xl text-xs uppercase tracking-widest font-black"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;
