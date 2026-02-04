import { FC } from "react";
import EditThumbnailCard from "~/components/dashboard/editor/EditThumbnailCard";
import MainInformationSection from "~/components/dashboard/editor/MainInformationSection";
import { ContactInformationSection } from "~/components/dashboard/editor/contactsection/ContactInformationSection";

const EditorPage: FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Page Editor</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Personalize your competition's public profile. Add banners, descriptions, and rules to attract
                    delegates.
                </p>

                <div className="grid gap-8">
                    <EditThumbnailCard />
                    <MainInformationSection />
                    <ContactInformationSection />
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
