import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import Form from "../../Form";

export const CheckboxField = ({ name, label, options }: { name: string; label: string; options?: string[] }) => {
    const { control } = useFormContext();

    // Single checkbox (no options) - returns array with label if checked, empty array if not
    if (!options || options.length === 0) {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field, ...props }) => (
                    <Form.CustomController label={label} field={field} {...props}>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={name}
                                checked={Array.isArray(field.value) && field.value.includes(label)}
                                onCheckedChange={(checked) => {
                                    field.onChange(checked ? [label] : []);
                                }}
                            />
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
    }

    // Multiple checkboxes (with options) - returns array of selected option strings
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
                <Form.CustomController label={label} field={field} {...props}>
                    <div className="space-y-2 mt-4">
                        {options.map((opt) => {
                            const isChecked = Array.isArray(field.value) && field.value.includes(opt);
                            return (
                                <div key={opt} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`${name}-${opt}`}
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                            const currentValue = Array.isArray(field.value) ? field.value : [];
                                            if (checked) {
                                                field.onChange([...currentValue, opt]);
                                            } else {
                                                field.onChange(currentValue.filter((v) => v !== opt));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`${name}-${opt}`} className="font-normal cursor-pointer">
                                        {opt}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </Form.CustomController>
            )}
        />
    );
};
