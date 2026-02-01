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
        name: "customPrizes",
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Form.Item label="Champion" name="championPrize">
                        <Input placeholder="$5000" />
                    </Form.Item>
                    <Form.Item label="1st Runners Up" name="runnersUp1Prize">
                        <Input placeholder="$3000" />
                    </Form.Item>
                    <Form.Item label="2nd Runners Up" name="runnersUp2Prize">
                        <Input placeholder="$2000" />
                    </Form.Item>
                </div>

                {fields.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-border/40">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-start gap-4">
                                <div className="grid grid-cols-2 gap-4 flex-1">
                                    <Form.Item name={`customPrizes.${index}.name`} label="Prize Name" hideLabel={index > 0}>
                                        <Input placeholder="e.g. Best Design" />
                                    </Form.Item>
                                    <Form.Item name={`customPrizes.${index}.amount`} label="Reward" hideLabel={index > 0}>
                                        <Input placeholder="e.g. $500" />
                                    </Form.Item>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="mt-0 h-10 w-10 text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-4 border-t border-border/50">
                    <Form.Item label="Total Prize Pool" name="prizePool">
                        <Input placeholder="$10,000" />
                    </Form.Item>
                </div>
            </CardContent>
        </Card>
    );
};
