import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import Form from "../../Form";
import { Label } from "~/components/ui/label";

export const RadioField = ({ name, label, options }: { name: string; label: string; options: string[] }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
                <Form.CustomController label={label} field={field} {...props}>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-2">
                        {options.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`${name}-${opt}`} />
                                <Label htmlFor={`${name}-${opt}`} className="font-normal cursor-pointer">
                                    {opt}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </Form.CustomController>
            )}
        />
    );
};
