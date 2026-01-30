"use client";

import { FC, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
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
        fields: Field[];
    };
    onSave: (data: any) => Promise<void>;
}

const SortableField: FC<{
    field: Field;
    updateField: (id: string, updates: Partial<Field>) => void;
    deleteField: (id: string) => void;
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
            className={`group bg-white rounded-[2.5rem] border border-[#e8e2de] hover:border-[#e5ab7d] p-8 shadow-sm transition-all relative overflow-hidden ${isDragging ? "opacity-50 ring-2 ring-[#e5ab7d]" : ""}`}
        >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#e5ab7d] transition-colors" />

            <div className="flex gap-6 items-start">
                <div
                    {...attributes}
                    {...listeners}
                    className="pt-2 text-[#0c0803]/10 cursor-grab active:cursor-grabbing hover:text-[#0c0803]/40 transition-colors"
                >
                    <GripVertical size={20} />
                </div>

                <div className="flex-1 space-y-6">
                    <div className="flex gap-4">
                        <Input
                            value={field.name}
                            onChange={(e) => updateField(field.id, { name: e.target.value })}
                            className="flex-1 text-xl font-bold bg-[#fbf6f3] border-none rounded-2xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-[#e5ab7d]"
                            placeholder="Question"
                        />
                        <Select value={field.type} onValueChange={(val) => updateField(field.id, { type: val })}>
                            <SelectTrigger className="w-56 h-14 bg-white border-[#e8e2de] rounded-2xl font-bold px-6">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-[#e8e2de]">
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

                    <div className="flex items-center justify-between border-t border-[#e8e2de]/50 pt-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id={`req-${field.id}`}
                                    checked={field.required}
                                    onCheckedChange={(val) => updateField(field.id, { required: !!val })}
                                    className="w-5 h-5 rounded-md border-[#e8e2de]"
                                />
                                <label
                                    htmlFor={`req-${field.id}`}
                                    className="text-sm font-bold text-[#0c0803]/40 uppercase tracking-widest"
                                >
                                    Required
                                </label>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteField(field.id)}
                            className="h-12 w-12 rounded-xl text-[#0c0803]/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormBuilder: FC<FormBuilderProps> = ({ initialData, onSave }) => {
    const [name, setName] = useState(initialData?.name || "Untitled Form");
    const [description, setDescription] = useState(initialData?.description || "Form Description");
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

    const deleteField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
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
        await onSave({ id: initialData?.id, name, description, fields });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-32">
            {/* Header Card */}
            <div className="bg-white rounded-[2.5rem] border-l-8 border-l-[#e5ab7d] border border-[#e8e2de] p-10 shadow-sm space-y-6">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-4xl font-black border-none px-0 focus-visible:ring-0 placeholder:text-[#0c0803]/10 h-auto py-0"
                />
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-lg text-[#0c0803]/40 border-none px-0 focus-visible:ring-0 placeholder:text-[#0c0803]/10 h-auto py-0"
                />
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
            <div className="flex items-center justify-center gap-4">
                <Button
                    onClick={addField}
                    className="h-16 w-16 rounded-full bg-white border border-[#e8e2de] text-[#0c0803] hover:border-[#e5ab7d] hover:text-[#e5ab7d] shadow-sm transition-all"
                >
                    <Plus size={32} />
                </Button>
            </div>

            {/* Sticky Save Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-white/80 backdrop-blur-xl border border-[#e8e2de] px-10 py-6 rounded-full shadow-2xl flex items-center gap-8 border-b-4 border-b-[#e5ab7d]/20">
                    <div className="text-sm font-black uppercase tracking-widest text-[#0c0803]/40">
                        {fields.length} Questions
                    </div>
                    <div className="w-px h-6 bg-[#e8e2de]" />
                    <Button
                        onClick={handleSave}
                        className="h-14 px-10 rounded-full bg-[#0c0803] text-white font-black hover:scale-[1.02] active:scale-95 transition-all text-lg"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;
