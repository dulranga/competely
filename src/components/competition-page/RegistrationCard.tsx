"use client";

import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { registerToCompetitionAction } from "~/data-access/delegate/actions";
import { authClient } from "~/lib/auth-client";

export function RegistrationCard({ competitionId }: { competitionId: string }) {
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
        <Card className="rounded-3xl border-border shadow-sm text-center overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Ready to Win? Register Now</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    Join the competition today and show what you're capable of. Register now to lock in your spot,
                    challenge yourself, and compete for exciting prizes alongside others just like you.
                </p>

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

                    <Button variant="outline" className="w-full font-bold" size="lg">
                        <FileText className="w-4 h-4 mr-2" /> Get guidelines
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
