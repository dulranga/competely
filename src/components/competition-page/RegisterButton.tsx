"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { getPublicCompetitionRegistrationDetails } from "~/data-access/competitions/public/get-details";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";
import { useModal } from "../dashboard/modals/modal-provider";

function checkDeadlinePassed(deadline: Date | null | undefined): boolean {
    if (!deadline) return false;
    return new Date(deadline).getTime() < new Date().getTime();
}

export function RegisterButton({
    competitionId,
    className,
    variant = "default",
    size = "lg",
    registrationDeadline,
}: {
    competitionId: string;
    className?: string;
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    registrationDeadline?: Date | null;
}) {
    const [isPending, setIsPending] = useState(false);
    const [isRegistrationClosed, setIsRegistrationClosed] = useState(() => checkDeadlinePassed(registrationDeadline));
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const { openModal } = useModal();

    const { data: registrationDetails } = useQuery({
        queryKey: ["competition-registration-details", competitionId],
        queryFn: () => getPublicCompetitionRegistrationDetails(competitionId),
    });

    // Auto-check deadline every second (UX: updates UI even without refresh)
    useEffect(() => {
        if (!registrationDeadline || isRegistrationClosed) return;

        const timer = setInterval(() => {
            if (checkDeadlinePassed(registrationDeadline)) {
                setIsRegistrationClosed(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [registrationDeadline, isRegistrationClosed]);

    const handleRegister = async () => {
        if (isRegistrationClosed) {
            toast.error("Registration is closed.");
            return;
        }

        if (!session) {
            const callbackURL = encodeURIComponent(window.location.href);
            router.push(`/login?callbackURL=${callbackURL}`);
            return;
        }

        if (registrationDetails?.form) {
            openModal("registrationForm", {
                competitionId,
                formId: registrationDetails.form.id,
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
        <Button
            className={className}
            size={size}
            variant={isRegistrationClosed ? "outline" : variant}
            onClick={handleRegister}
            disabled={isPending || isRegistrationClosed}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registering...
                </>
            ) : isRegistrationClosed ? (
                <>
                    <XCircle className="mr-2 h-5 w-5" />
                    Registration Closed
                </>
            ) : (
                <>
                    Register Now <ArrowRight className="ml-2 w-5 h-5" />
                </>
            )}
        </Button>
    );
}
