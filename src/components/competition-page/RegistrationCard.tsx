"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Link as LinkIcon, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { getPublicCompetitionRegistrationDetails } from "~/data-access/competitions/public/get-details";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";
import { useModal } from "../dashboard/modals/modal-provider";

type Resource = {
    id: string;
    label: string;
    type: "document" | "url";
    url?: string | null;
    file?: { id: string; fileName: string } | null;
};

function checkDeadlinePassed(deadline: Date | null | undefined): boolean {
    if (!deadline) return false;
    return new Date(deadline).getTime() < new Date().getTime();
}

export function RegistrationCard({
    competitionId,
    resources = [],
    registrationDeadline,
}: {
    competitionId: string;
    resources?: Resource[];
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
        <Card className="rounded-3xl border-border shadow-sm text-center overflow-hidden">
            <CardContent className="pt-6">
                <div className="space-y-3">
                    <Button
                        className="w-full font-bold"
                        size="lg"
                        variant={isRegistrationClosed ? "outline" : "default"}
                        onClick={handleRegister}
                        disabled={isPending || isRegistrationClosed}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Registering...
                            </>
                        ) : isRegistrationClosed ? (
                            <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Registration Closed
                            </>
                        ) : (
                            "Register →"
                        )}
                    </Button>

                    {resources.map((resource) => (
                        <Button key={resource.id} variant="outline" className="w-full font-bold" size="lg" asChild>
                            <a
                                href={
                                    resource.type === "url"
                                        ? resource.url || "#"
                                        : `/api/upload?file_id=${resource.file?.id}&download=true`
                                }
                                target={resource.type === "url" ? "_blank" : undefined}
                                rel={resource.type === "url" ? "noopener noreferrer" : undefined}
                            >
                                {resource.type === "url" ? (
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                ) : (
                                    <FileText className="w-4 h-4 mr-2" />
                                )}
                                {resource.label ||
                                    (resource.type === "document" ? resource.file?.fileName : "Resource")}
                            </a>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
