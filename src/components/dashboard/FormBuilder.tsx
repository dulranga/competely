"use client";

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useStickToBottom } from "use-stick-to-bottom";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Field, FIELD_CONFIGS } from "./form-builder/constants";
import { SortableField } from "./form-builder/SortableField";
import { useModal } from "./modals/modal-provider";

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

    const { scrollRef, contentRef, scrollToBottom } = useStickToBottom({
        resize: "smooth",
    });

    useEffect(() => {
        scrollToBottom();
    }, [fields]);

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

    // TODO: close confirm
    // TODO: Save draft state automatically
    // TODO: Add Other Option for multiple choice fields
    // TODO: Link Input

    return (
        <div ref={scrollRef} className="h-full overflow-y-auto px-4 scroll-smooth">
            <div ref={contentRef} className="max-w-3xl mx-auto space-y-10 pb-32 pt-10">
                {/* Header Area */}
                <div className="space-y-6">
                    <div className="group relative">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            className="text-4xl md:text-5xl font-bold border border-border/60 px-6 focus-visible:ring-0 placeholder:text-muted-foreground/20 h-auto py-5 bg-card shadow-sm tracking-tighter rounded-2xl transition-all w-full"
                            placeholder="Form Title"
                        />
                        <div className="absolute bottom-3 left-6 w-8 h-1 bg-primary/20 group-focus-within:w-[calc(100%-48px)] group-focus-within:bg-primary transition-all duration-500 rounded-full" />
                    </div>
                    <div className="flex items-start gap-4 group">
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-lg text-muted-foreground border border-border/60 px-6 focus-visible:ring-0 placeholder:text-muted-foreground/20 min-h-32 py-4 bg-card shadow-sm font-medium rounded-2xl transition-colors w-full"
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
                    <Button
                        onClick={addField}
                        variant="competely-outline"
                        size="icon"
                        className="rounded-full shadow-md"
                    >
                        <Plus size={20} />
                    </Button>
                </div>

                {/* Sticky Save Bar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-card/90 backdrop-blur-md border border-border px-6 py-3 rounded-2xl shadow-xl flex items-center gap-6">
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
                                    className="text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 size={18} />
                                </Button>
                                <div className="w-px h-4 bg-border" />
                            </>
                        )}

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="publish-toggle"
                                checked={published}
                                onCheckedChange={(val) => setPublished(!!val)}
                                className="w-4 h-4 rounded-md border-border"
                            />
                            <label
                                htmlFor="publish-toggle"
                                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                            >
                                {published ? "Published" : "Draft"}
                            </label>
                        </div>

                        <div className="w-px h-4 bg-border" />

                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            {fields.length} Fields
                        </div>
                        <div className="w-px h-4 bg-border" />
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
        </div>
    );
};

export default FormBuilder;
