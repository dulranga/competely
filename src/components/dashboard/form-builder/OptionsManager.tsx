import { FC } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface OptionsManagerProps {
    options: string[];
    onChange: (options: string[]) => void;
}

export const OptionsManager: FC<OptionsManagerProps> = ({ options, onChange }) => {
    const addOption = () => onChange([...options, `Option ${options.length + 1}`]);
    const removeOption = (index: number) => onChange(options.filter((_, i) => i !== index));
    const updateOption = (index: number, val: string) => {
        const newOptions = [...options];
        newOptions[index] = val;
        onChange(newOptions);
    };

    return (
        <div className="space-y-3 mt-6 ml-10 pl-6 border-l-2 border-border/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Options</p>
            {options.map((opt, i) => (
                <div key={i} className="flex gap-3 items-center group/opt">
                    <div className="w-2 h-2 rounded-full bg-border group-focus-within/opt:bg-primary transition-colors" />
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
                        className="opacity-0 group-hover/opt:opacity-100 h-8 w-8 text-destructive rounded-lg hover:bg-destructive/10"
                    >
                        <X size={14} />
                    </Button>
                </div>
            ))}
            <Button
                variant="ghost"
                size="sm"
                onClick={addOption}
                className="h-9 px-3 text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest hover:bg-primary/5 rounded-xl transition-all"
            >
                <Plus size={14} className="mr-2" />
                Add New Option
            </Button>
        </div>
    );
};
