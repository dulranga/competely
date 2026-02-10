import { CompetitionPageContent } from "~/components/competition-page/CompetitionPageContent";
import { getActiveCompetition } from "~/data-access/competitions/getActiveCompetition";
import { getPublicCompetitionDetails } from "~/data-access/competitions/public/get-details";

export default async function PreviewPage() {
    const activeCompetition = await getActiveCompetition();

    if (!activeCompetition) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">No active competition found to preview.</p>
            </div>
        );
    }

    const data = await getPublicCompetitionDetails(activeCompetition.id);

    if (!data) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">Failed to load competition details.</p>
            </div>
        );
    }

    return (
        <CompetitionPageContent
            data={data}
            competitionId={activeCompetition.id}
            isPreview={true}
        />
    );
}
