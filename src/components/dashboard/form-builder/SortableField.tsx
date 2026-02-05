import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { FIELD_CONFIGS, Field } from "./constants";
import { OptionsManager } from "./OptionsManager";
import { FormFieldType } from "~/consts/forms";
import { Label } from "~/components/ui/label";

interface SortableFieldProps {
    field: Field;
    updateField: (id: string, updates: Partial<Field>) => void;
    deleteField: (id: string, name: string) => void;
}

export const SortableField: FC<SortableFieldProps> = ({ field, updateField, deleteField }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    const typeConfig = FIELD_CONFIGS[field.type];

    if (!typeConfig) return null;

    const Icon = typeConfig.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group bg-card rounded-2xl border border-border/60 hover:border-primary/40 p-6 transition-all relative ${isDragging ? "opacity-50 ring-1 ring-primary scale-[1.02] shadow-xl z-50" : ""}`}
        >
            <div className="flex gap-6 items-start">
                <div
                    {...attributes}
                    {...listeners}
                    className="pt-3.5 text-muted-foreground/20 cursor-grab active:cursor-grabbing hover:text-muted-foreground/60 transition-colors"
                >
                    <GripVertical size={20} />
                </div>

                <div className="flex-1 space-y-5">
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary border border-border/40 shrink-0">
                            <Icon size={22} />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Input
                                value={field.name}
                                onChange={(e) => updateField(field.id, { name: e.target.value })}
                                className="w-full text-lg font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/20"
                                placeholder="Enter your question here..."
                            />
                            <div className="flex items-center gap-4">
                                <Select
                                    value={field.type}
                                    onValueChange={(val) => updateField(field.id, { type: val as FormFieldType })}
                                >
                                    <SelectTrigger className="h-8 w-auto border-none bg-transparent p-0 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors focus:ring-0 space-x-2">
                                        <div className="flex items-center gap-2">
                                            <span>Type:</span>
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border">
                                        {Object.entries(FIELD_CONFIGS).map(([key, config]) => (
                                            <SelectItem key={key} value={key} className="text-xs font-bold">
                                                <div className="flex items-center gap-2">
                                                    <config.icon size={14} className="text-muted-foreground" />
                                                    {config.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="w-px h-3 bg-border" />

                                <div className="flex items-center gap-3">
                                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest cursor-pointer">
                                        <Checkbox
                                            id={`req-${field.id}`}
                                            checked={field.required}
                                            onCheckedChange={(val) => updateField(field.id, { required: !!val })}
                                        />
                                        Required
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="destructive-ghost"
                            size="icon-xs"
                            onClick={() => deleteField(field.id, field.name)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>

                    {/* Contextual Inputs */}
                    {typeConfig.hasOptions && (
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
