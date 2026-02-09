import { FC } from "react";
import EditThumbnailCard from "~/components/dashboard/editor/EditThumbnailCard";
import MainInformationSection from "~/components/dashboard/editor/MainInformationSection";
import { ContactInformationSection } from "~/components/dashboard/editor/contactsection/ContactInformationSection";
import { getActiveCompetition } from "~/data-access/competitions/getActiveCompetition";

import { getCompetitionMainInfo } from "~/data-access/competitions/getCompetitionMainInfo";
import { getCompetitionContacts } from "~/data-access/competitions/getCompetitionContacts";

const EditorPage: FC = async () => {
    const competition = await getActiveCompetition();
    const mainInfo = await getCompetitionMainInfo(competition!.id);
    const contacts = await getCompetitionContacts(competition!.id);
    console.log("DEBUG COMPETITION:", JSON.stringify(competition, null, 2));


    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Page Editor</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Personalize your competition's public profile. Add banners, descriptions, and rules to attract
                    delegates.
                </p>

                <div className="grid gap-8">
                    <EditThumbnailCard initialData={competition} />
                    <MainInformationSection competitionId={competition!.id} initialData={mainInfo} />
                    <ContactInformationSection competitionId={competition!.id} initialData={contacts} />
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
