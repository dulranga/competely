import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "~/components/ui/checkbox";
import Form from "../../Form";

export const CheckboxField = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
                <Form.CustomController label={label} field={field} {...props}>
                    <div className="flex items-center space-x-2">
                        <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
                        <label
                            htmlFor={name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {label}
                        </label>
                    </div>
                </Form.CustomController>
            )}
        />
    );
};
