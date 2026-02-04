import { redirect } from "next/navigation";
import { setActiveCompetition } from "~/data-access/competitions/setActiveCompetition";

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;

    const competitionId = params.id;

    if (typeof competitionId !== "string") {
        redirect("/create");
    }

    await setActiveCompetition(competitionId);

    redirect("/dashboard");
}
