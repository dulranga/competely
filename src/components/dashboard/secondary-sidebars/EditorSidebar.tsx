import { Plus } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

const EditorSidebar: FC = () => {
    const rounds = ["Registration", "Round 1", "Round 2", "Semi Final", "Final"];
    return (
        <>
            <div className="space-y-3">
                {rounds.map((round) => (
                    <Button
                        key={round}
                        variant="ghost"
                        className="w-full justify-start h-14 rounded-2xl bg-[#4b5563] text-white hover:bg-[#374151] hover:text-white px-6 font-semibold text-lg"
                    >
                        {round}
                    </Button>
                ))}
            </div>

            <div className="mt-auto pt-10">
                <Button className="w-full h-14 rounded-[2rem] bg-[#0c0803] hover:bg-black text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                    <Plus size={24} />
                    Add Round
                </Button>
            </div>
        </>
    );
};
export default EditorSidebar;
