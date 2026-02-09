"use client";

import { Loader } from "lucide-react";
import * as React from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export type AsyncButtonProps = Omit<ButtonProps, "onClick"> & {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown> | unknown;
    buttonClassName?: string;
};

export function AsyncButton({ onClick, disabled, children, buttonClassName, ...rest }: AsyncButtonProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = React.useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            if (isLoading) return;
            setIsLoading(true);
            // Delegate all error handling to the provided onClick implementation
            // Ensure loading state resets whether onClick is sync or async
            void Promise.resolve()
                .then(() => onClick?.(e))
                .finally(() => setIsLoading(false));
        },
        [isLoading, onClick],
    );

    return (
        <div className={cn("relative", rest.className)}>
            {isLoading && (
                <Loader
                    id="buttonLoader"
                    className="size-4 animate-spin absolute top-1/2 left-1/2 -translate-1/2"
                    aria-hidden="true"
                />
            )}
            <Button
                {...rest}
                className={cn("group", buttonClassName, { "opacity-45": isLoading })}
                disabled={disabled || isLoading}
                aria-busy={isLoading || undefined}
                data-loading={isLoading ? "true" : undefined}
                onClick={handleClick}
            >
                {children}
            </Button>
        </div>
    );
}

export default AsyncButton;
