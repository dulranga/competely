"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";

export function RegisterButton({
    competitionId,
    className,
    variant = "default",
    size = "lg",
}: {
    competitionId: string;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleRegister = async () => {
        if (!session) {
            const callbackURL = encodeURIComponent(window.location.href);
            router.push(`/login?callbackURL=${callbackURL}`);
            return;
        }

        setIsPending(true);
        try {
            const result = await registerToCompetitionAction(competitionId);
            if ("error" in result) {
                toast.error(result.error);
            } else {
                toast.success("Successfully registered for the competition!");
            }
        } catch (error) {
            toast.error("Failed to register. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Button className={className} size={size} variant={variant} onClick={handleRegister} disabled={isPending}>
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registering...
                </>
            ) : (
                <>
                    Register Now <ArrowRight className="ml-2 w-5 h-5" />
                </>
            )}
        </Button>
    );
}
