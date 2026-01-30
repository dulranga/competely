"use client";

import { FileText, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getFormsAction } from "~/app/(authenticated)/dashboard/forms/actions";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const FormBuilderSidebar: FC = () => {
    const [forms, setForms] = useState<any[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        getFormsAction().then(setForms);
    }, []);

    return (
        <>
            <div className="space-y-4">
                <div className="px-2 mb-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0c0803]/30">Your Forms</h3>
                </div>

                <div className="space-y-2">
                    {forms.length === 0 ? (
                        <div className="px-6 py-10 rounded-[2rem] border-2 border-dashed border-[#e8e2de] flex flex-col items-center gap-3 text-center">
                            <FileText size={24} className="text-[#0c0803]/10" />
                            <p className="text-[10px] font-bold text-[#0c0803]/30 uppercase tracking-widest">
                                No forms yet
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
                                            "w-full justify-start h-16 rounded-2xl px-6 transition-all duration-300 group",
                                            isActive
                                                ? "bg-[#0c0803] text-white shadow-lg scale-[1.02]"
                                                : "bg-white border border-[#e8e2de] text-[#0c0803]/60 hover:border-[#e5ab7d] hover:bg-[#fbf6f3] shadow-sm",
                                        )}
                                    >
                                        <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                                            <span className="font-bold text-sm truncate w-full">{form.name}</span>
                                            <span
                                                className={cn(
                                                    "text-[10px] uppercase tracking-widest font-black opacity-40",
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
            </div>

            <div className="mt-auto pt-10">
                <Link href="/dashboard/forms/new" className="block w-full">
                    <Button className="w-full h-16 rounded-[2rem] bg-gradient-to-br from-[#0c0803] to-[#4b5563] hover:opacity-90 text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                        <Plus size={24} strokeWidth={3} />
                        New Form
                    </Button>
                </Link>
            </div>
        </>
    );
};
export default FormBuilderSidebar;
