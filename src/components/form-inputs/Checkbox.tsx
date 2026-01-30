"use client";

import type { ControllerRenderProps } from "react-hook-form";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ReactNode } from "react";

type CheckboxInputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, any>;
    label: ReactNode;
};

export function CheckboxInput({ field, label }: CheckboxInputProps) {
    return (
        <Label className="flex items-center gap-3">
            <Checkbox
                id="terms-checkbox"
                className="scale-105 mt-1 border border-foreground"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
                onBlur={field.onBlur}
                ref={field.ref}
            />
            <div className="grid gap-1.5 font-normal text-base">{label}</div>
        </Label>
    );
}
