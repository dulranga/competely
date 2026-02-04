import { Plus, Trash2 } from "lucide-react";
import type { FC } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import Form from "~/components/form/Form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { MainInfoSchema } from "./constants";

interface PrizesSectionProps {
    form: UseFormReturn<MainInfoSchema>;
}

export const PrizesSection: FC<PrizesSectionProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "prizes",
    });

    return (
        <Card className="shadow-none border-border/60">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Prizes</CardTitle>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", amount: "" })}
                    className="h-8 gap-1.5"
                >
                    <Plus size={14} />
                    Add Prize
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {fields.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground bg-slate-50 rounded-xl border-2 border-dashed">
                            No prizes added yet.
                        </div>
                    )}

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-4">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                <Form.Item name={`prizes.${index}.name`} label="Prize Name" hideLabel={index > 0}>
                                    <Input placeholder="e.g. Champion" className="bg-white" />
                                </Form.Item>
                                <Form.Item name={`prizes.${index}.amount`} label="Reward (Cash/Item)" hideLabel={index > 0}>
                                    <Input placeholder="e.g. $5000" className="bg-white" />
                                </Form.Item>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className={`h-10 w-10 text-muted-foreground hover:text-destructive shrink-0 ${index === 0 ? "mt-6" : "mt-0"}`}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
