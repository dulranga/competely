"use client";

import { FileText, Plus } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getFormsAction } from "~/app/(authenticated)/dashboard/forms/actions";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { useQuery } from "@tanstack/react-query";

const FormBuilderSidebar: FC = () => {
    const pathname = usePathname();

    const { data: forms = [] } = useQuery({
        queryKey: ["forms"],
        queryFn: () => getFormsAction(),
    });

    return (
        <div className="flex flex-col h-full">
            <div className="px-2 mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c0803]/30">Your Forms</h3>
            </div>

            <div className="flex-1 space-y-2">
                {forms.length === 0 ? (
                    <div className="px-4 py-8 rounded-2xl border-2 border-dashed border-[#e8e2de]/60 flex flex-col items-center gap-2 text-center">
                        <FileText size={20} className="text-[#0c0803]/10" />
                        <p className="text-[8px] font-bold text-[#0c0803]/30 uppercase tracking-widest leading-tight">
                            Create your first
                            <br />
                            competition form
                        </p>
                    </div>
                ) : (
                    forms.map((form) => {
                        const isActive = pathname === `/dashboard/forms/${form.id}`;
                        return (
                            <Link key={form.id} href={`/dashboard/forms/${form.id}`}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start h-12 rounded-xl px-4 transition-all duration-300 group",
                                        isActive
                                            ? "bg-[#0c0803] text-white shadow-md"
                                            : "bg-[#fbf6f3]/30 border border-transparent text-[#0c0803]/60 hover:bg-white hover:border-[#e8e2de] hover:text-[#0c0803]",
                                    )}
                                >
                                    <div className="flex flex-col items-start gap-0 overflow-hidden">
                                        <span className="font-bold text-xs truncate w-full max-w-40">{form.name}</span>
                                        <span
                                            className={cn(
                                                "text-[9px] uppercase tracking-tighter font-bold opacity-40",
                                                isActive ? "text-white/60" : "text-[#0c0803]/40",
                                            )}
                                        >
                                            {form.fields?.length || 0} Fields
                                        </span>
                                    </div>
                                </Button>
                            </Link>
                        );
                    })
                )}
            </div>

            <div className="mt-8">
                <Link href="/dashboard/forms/new" className="block w-full">
                    <Button
                        variant="competely"
                        className="w-full h-11 rounded-xl text-xs uppercase tracking-widest font-black"
                    >
                        <Plus size={16} />
                        New Form
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default FormBuilderSidebar;
