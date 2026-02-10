import { CompetitionPageContent } from "~/components/competition-page/CompetitionPageContent";
import { getPublicCompetitionDetails } from "~/data-access/competitions/public/get-details";

type Params = Promise<{ competitionId: string }>;

export default async function CodeFest2026(props: { params: Params }) {
    const params = await props.params;
    const data = await getPublicCompetitionDetails(params.competitionId);

    if (!data) {
        return <div>Competition not found</div>;
    }

    return <CompetitionPageContent data={data} competitionId={params.competitionId} isPreview={false} />;
}
