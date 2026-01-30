import type { FC, ReactElement } from "react";
import { Children, cloneElement, useId } from "react";

import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";

type FormItemProps = {
    children: ReactElement;
    label: string;
    hideLabel?: boolean;
    name: string;
    className?: string;
    hidden?: boolean;
    helperText?: string;
    disabled?: boolean;
};

export type FormItemChildrenProps = {
    id: string;
    error: boolean;
} & ControllerRenderProps<FieldValues, string>;

const FormItem: FC<FormItemProps> = ({ disabled, children, label, hideLabel, name, className, hidden, helperText }) => {
    const methods = useFormContext();

    const id = useId();

    if (Children.count(children) !== 1) throw new Error("Form item should have exactly one child");

    return (
        <Controller
            disabled={disabled}
            name={name}
            control={methods.control}
            render={({ field, fieldState }) => {
                const extraProps = {
                    id,
                    "aria-invalid": fieldState.invalid,
                };
                const child = Children.map(children, (child) => cloneElement(child, { ...field, ...extraProps }));

                return (
                    <div
                        className={cn(
                            "min-h-20 space-y-2",
                            { "opacity-50 cursor-not-allowed select-none": field.disabled },
                            className,
                        )}
                        hidden={hidden}
                    >
                        {!hideLabel && (
                            <Label
                                className={cn(
                                    "block font-sans text-xs uppercase tracking-wider text-primary/80 font-semibold",
                                )}
                                htmlFor={id}
                            >
                                {label}
                            </Label>
                        )}
                        <div className="relative group/field">{child}</div>
                        <p
                            className={cn(
                                "text-muted-foreground font-sans text-[10px] uppercase tracking-wide whitespace-pre-wrap mt-1",
                                fieldState.invalid && "text-destructive",
                            )}
                        >
                            {fieldState.invalid ? fieldState.error?.message : helperText}
                        </p>
                    </div>
                );
            }}
        />
    );
};

export default FormItem;
