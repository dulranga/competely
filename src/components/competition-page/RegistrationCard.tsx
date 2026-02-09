"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Link as LinkIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export function RegistrationCard({ competitionId, resources = [] }: { competitionId: string; resources?: Resource[] }) {
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
        <Card className="rounded-3xl border-border shadow-sm text-center overflow-hidden">
            <CardContent className="pt-6">
                <div className="space-y-3">
                    <Button className="w-full font-bold" size="lg" onClick={handleRegister} disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Registering...
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
