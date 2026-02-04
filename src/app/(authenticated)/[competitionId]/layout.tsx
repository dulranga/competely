import "server-only";

import { redirect } from "next/navigation";
import { setActiveCompetition } from "~/data-access/competitions/setActiveCompetition";

export default async function CompetitionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{
        competitionId: string;
    }>;
}) {
    const { competitionId } = await params;

    try {
        await setActiveCompetition(competitionId);
    } catch (error) {
        console.error("Failed to set active competition", error);
        redirect("/create");
    }

    return (
        <>
            {children}
        </>
    );
}
