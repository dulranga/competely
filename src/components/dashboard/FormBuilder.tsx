"use client";

import { FC, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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

interface Field {
    id: string;
    name: string;
    type: string;
    required: boolean;
}

interface FormBuilderProps {
    initialData?: {
        id?: string;
        name: string;
        description: string;
        published?: boolean;
        fields: Field[];
    };
    onSave: (data: any) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
}

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

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group bg-white rounded-3xl border border-[#e8e2de] hover:border-[#e5ab7d] p-6 shadow-sm transition-all relative overflow-hidden ${isDragging ? "opacity-50 ring-1 ring-[#e5ab7d]" : ""}`}
        >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#e5ab7d]/50 transition-colors" />

            <div className="flex gap-4 items-start">
                <div
                    {...attributes}
                    {...listeners}
                    className="pt-2.5 text-[#0c0803]/10 cursor-grab active:cursor-grabbing hover:text-[#0c0803]/40 transition-colors"
                >
                    <GripVertical size={16} />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                        <Input
                            value={field.name}
                            onChange={(e) => updateField(field.id, { name: e.target.value })}
                            className="flex-1 text-base font-bold bg-[#fbf6f3] border-none rounded-xl h-11 px-4 focus-visible:ring-1 focus-visible:ring-[#e5ab7d]"
                            placeholder="Question"
                        />
                        <Select value={field.type} onValueChange={(val) => updateField(field.id, { type: val })}>
                            <SelectTrigger className="w-48 h-11 bg-white border-[#e8e2de] rounded-xl font-bold px-4 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-[#e8e2de]">
                                <SelectItem value="text">Short Answer</SelectItem>
                                <SelectItem value="textarea">Paragraph</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="select">Dropdown</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="file">File Upload</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#e8e2de]/50 pt-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`req-${field.id}`}
                                    checked={field.required}
                                    onCheckedChange={(val) => updateField(field.id, { required: !!val })}
                                    className="w-4 h-4 rounded-md border-[#e8e2de]"
                                />
                                <label
                                    htmlFor={`req-${field.id}`}
                                    className="text-[10px] font-bold text-[#0c0803]/40 uppercase tracking-widest"
                                >
                                    Required
                                </label>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => deleteField(field.id, field.name)}
                            className="text-[#0c0803]/20 hover:text-red-500 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormBuilder: FC<FormBuilderProps> = ({ initialData, onSave, onDelete }) => {
    const { openModal } = useModal();
    const [name, setName] = useState(initialData?.name || "Untitled Form");
    const [description, setDescription] = useState(initialData?.description || "Form Description");
    const [published, setPublished] = useState(initialData?.published ?? false);
    const [fields, setFields] = useState<Field[]>(
        initialData?.fields || [{ id: crypto.randomUUID(), name: "Question 1", type: "text", required: false }],
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const addField = () => {
        setFields([
            ...fields,
            {
                id: crypto.randomUUID(),
                name: `Question ${fields.length + 1}`,
                type: "text",
                required: false,
            },
        ]);
    };

    const updateField = (id: string, updates: Partial<Field>) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const deleteField = (id: string, fieldName: string) => {
        openModal("confirm", {
            title: "Remove Question",
            description: `Are you sure you want to remove "${fieldName}"?`,
            variant: "destructive",
            confirmLabel: "Remove",
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
        <div className="max-w-2xl mx-auto space-y-6 pb-32">
            {/* Header Card */}
            <div className="bg-white rounded-3xl border-l-4 border-l-[#e5ab7d] border border-[#e8e2de] p-8 shadow-sm space-y-2">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl font-bold border-none px-0 focus-visible:ring-0 placeholder:text-[#0c0803]/10 h-auto py-0"
                />
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-sm text-[#0c0803]/50 border-none px-0 focus-visible:ring-0 placeholder:text-[#0c0803]/10 h-auto py-0"
                />
            </div>

            {/* Fields List */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
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
