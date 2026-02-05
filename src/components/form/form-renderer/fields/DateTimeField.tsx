import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import Form from "../../Form";

export const DateTimeField = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
                <Form.CustomController label={label} field={field} {...props}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                className={cn(
                                    "border-input flex w-full items-center justify-between rounded-md border bg-input-background px-4 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-left mt-4",
                                    !field.value && "text-muted-foreground/60",
                                )}
                            >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="h-4 w-4 opacity-50" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date("1900-01-01")}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </Form.CustomController>
            )}
        />
    );
};
