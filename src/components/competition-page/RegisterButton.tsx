"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { getPublicCompetitionRegistrationDetails } from "~/data-access/competitions/public/get-details";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";
import { useModal } from "../dashboard/modals/modal-provider";

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
    const { openModal } = useModal();

    const { data: registrationDetails } = useQuery({
        queryKey: ["competition-registration-details", competitionId],
        queryFn: () => getPublicCompetitionRegistrationDetails(competitionId),
    });

    const handleRegister = async () => {
        if (!session) {
            const callbackURL = encodeURIComponent(window.location.href);
            router.push(`/login?callbackURL=${callbackURL}`);
            return;
        }

        if (registrationDetails?.form) {
            openModal("registrationForm", {
                competitionId,
                formName: registrationDetails.form.name,
                formDescription: registrationDetails.form.description || undefined,
                fields: registrationDetails.form.fields as any[],
            });
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
