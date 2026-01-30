import { type FC, type ReactNode } from "react";
import { type ControllerProps } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Label } from "../ui/label";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormCustomControllerProps = Parameters<ControllerProps<any, any, any>["render"]>[0] & {
    className?: string;
    hidden?: boolean;
    children: ReactNode;
    label?: string;
    helperText?: string;
};

const FormCustomController: FC<FormCustomControllerProps> = ({
    field,
    fieldState,
    className,
    hidden,
    label,
    children,
    helperText,
}) => {
    return (
        <div
            className={cn(
                "min-h-20 space-y-2",
                { "opacity-50 select-none  cursor-not-allowed": field.disabled },
                className,
            )}
            hidden={hidden}
        >
            {label && (
                <Label
                    className={cn("block font-mono text-xs uppercase tracking-wider text-primary/80 font-semibold")}
                    htmlFor={field.name}
                >
                    {label}
                </Label>
            )}
            <div>{children}</div>
            <p
                className={cn(
                    "text-muted-foreground font-mono text-[10px] uppercase tracking-tight whitespace-pre-wrap mt-1",
                    fieldState.invalid && "text-destructive",
                )}
            >
                {fieldState.invalid ? fieldState.error?.message : helperText}
            </p>
        </div>
    );
};

export default FormCustomController;
