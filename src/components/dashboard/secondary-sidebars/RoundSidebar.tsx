import { Plus } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

const RoundSidebar: FC = () => {
    const rounds = ["Registration", "Round 1", "Round 2", "Semi Final", "Final"];
    return (
        <div className="flex flex-col h-full">
            <div className="px-2 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c0803]/30">
                    Competition Phases
                </h3>
            </div>

            <div className="flex-1 space-y-2">
                {rounds.map((round) => (
                    <Button
                        key={round}
                        variant="ghost"
                        className="w-full justify-start h-11 rounded-xl bg-white border border-[#e8e2de] text-[#0c0803]/60 hover:text-[#0c0803] hover:bg-[#fbf6f3] px-4 font-bold text-xs"
                    >
                        {round}
                    </Button>
                ))}
            </div>

            <div className="mt-8">
                <Button
                    variant="competely"
                    className="w-full h-11 rounded-xl text-xs uppercase tracking-widest font-black"
                >
                    <Plus size={16} />
                    Add Round
                </Button>
            </div>
        </div>
    );
};
export default RoundSidebar;
