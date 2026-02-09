"use client";

import { FileText, Loader2, Link as LinkIcon, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";

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
    const [isRegistrationClosed, setIsRegistrationClosed] = useState(() =>
        checkDeadlinePassed(registrationDeadline)
    );
    const router = useRouter();
    const { data: session } = authClient.useSession();

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
                        <Button
                            key={resource.id}
                            variant="outline"
                            className="w-full font-bold"
                            size="lg"
                            asChild
                        >
                            <a
                                href={resource.type === "url" ? (resource.url || "#") : `/api/upload?file_id=${resource.file?.id}&download=true`}
                                target={resource.type === "url" ? "_blank" : undefined}
                                rel={resource.type === "url" ? "noopener noreferrer" : undefined}
                            >
                                {resource.type === "url" ? (
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                ) : (
                                    <FileText className="w-4 h-4 mr-2" />
                                )}
                                {resource.label || (resource.type === "document" ? resource.file?.fileName : "Resource")}
                            </a>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
