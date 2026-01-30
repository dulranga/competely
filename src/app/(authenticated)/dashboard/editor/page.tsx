import { FC } from "react";

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
                    {/* Demo Content: Competition Branding */}
                    <div className="rounded-[3rem] bg-white border border-[#e8e2de] shadow-sm overflow-hidden">
                        <div className="aspect-[21/9] bg-gradient-to-br from-[#e5ab7d] to-[#bcde8c] flex items-center justify-center relative group">
                            <span className="text-white/40 font-black text-2xl group-hover:scale-110 transition-transform cursor-pointer">
                                Upload Header Image
                            </span>
                        </div>
                        <div className="p-10 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-3xl bg-[#fbf6f3] border-4 border-white shadow-lg -mt-20 flex items-center justify-center overflow-hidden">
                                    <span className="text-xs font-bold text-[#0c0803]/40">Logo</span>
                                </div>
                                <div className="space-y-1 pt-4">
                                    <h3 className="text-2xl font-black">Competition Title</h3>
                                    <p className="text-[#0c0803]/60 italic">
                                        Your competition's catchphrase goes here.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <label className="text-xs font-black uppercase tracking-widest text-[#0c0803]/40">
                                    About the event
                                </label>
                                <div className="w-full h-32 rounded-2xl bg-[#fbf6f3] border border-[#e8e2de] p-6 text-[#0c0803]/40">
                                    Describe your event's mission and what makes it unique...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
