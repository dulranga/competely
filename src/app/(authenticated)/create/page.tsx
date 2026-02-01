import { CreatePageContent } from "~/components/create/CreatePageContent";
import { getUserCompetitions } from "~/data-access/competitions/getUserCompetitions";

export default async function CreatePage() {
    const competitions = await getUserCompetitions();

    return <CreatePageContent initialCompetitions={competitions} />;
}
