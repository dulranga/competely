import { Plus } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const FormBuilderSidebar: FC = () => {
    const rounds = ["Registration", "Round 1", "Round 2", "Semi Final", "Final"];
    return (
        <>
            <div className="space-y-3">
                {rounds.map((round) => (
                    <Button
                        key={round}
                        variant="ghost"
                        className="w-full justify-start h-14 rounded-2xl bg-white border border-[#e8e2de] text-[#0c0803] hover:bg-[#fbf6f3] px-6 font-semibold text-lg"
                    >
                        {round}
                    </Button>
                ))}
            </div>

            <div className="mt-auto pt-10">
                <Link href="/dashboard/forms/new" className="block w-full">
                    <Button className="w-full h-14 rounded-[2rem] bg-[#0c0803] hover:bg-black text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                        <Plus size={24} />
                        Add Form
                    </Button>
                </Link>
            </div>
        </>
    );
};
export default FormBuilderSidebar;
