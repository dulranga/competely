"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { FC, use, useState } from "react";
import FormResponsesTable from "~/components/dashboard/FormResponsesTable";
import { getFormByIdAction, getPaginatedFormResponsesAction } from "../../actions";

interface FormResponsesPageProps {
    params: Promise<{ id: string }>;
}

const FormResponsesPage: FC<FormResponsesPageProps> = ({ params }) => {
    const { id } = use(params);
    const [page, setPage] = useState(1);
    const limit = 20;

    // Fetch form details
    const { data: form, isLoading: isLoadingForm } = useQuery({
        queryKey: ["form", id],
        queryFn: () => getFormByIdAction(id),
    });

    // Fetch paginated responses
    const { data: responseData, isLoading: isLoadingResponses } = useQuery({
        queryKey: ["form-responses", id, page],
        queryFn: () => getPaginatedFormResponsesAction(id, page, limit),
    });

    if (isLoadingForm) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-[#e5ab7d] animate-spin" />
                <p className="text-[#0c0803]/40 font-black uppercase tracking-widest text-sm">Loading responses...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col gap-8">
                <Link
                    href="/dashboard/forms"
                    className="flex items-center gap-2 text-[#0c0803]/40 hover:text-[#0c0803] transition-colors group"
                >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e2de]/60 flex items-center justify-center group-hover:border-[#e5ab7d]/40 group-hover:text-[#e5ab7d] transition-all">
                        <ChevronLeft size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Forms</span>
                </Link>

                <div className="flex items-end justify-between">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#fbf6f3] border border-[#e8e2de]/40 flex items-center justify-center text-[#e5ab7d]">
                                <FileText size={20} />
                            </div>
                            <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">{form?.name}</h1>
                        </div>
                        <p className="text-[#0c0803]/50 text-xl max-w-2xl leading-relaxed">[tempory page]</p>
                    </div>
                </div>
            </div>

            <FormResponsesTable
                fields={form?.fields ?? []}
                responses={responseData?.data || []}
                total={responseData?.total || 0}
                page={page}
                limit={limit}
                onPageChange={setPage}
            />
        </div>
    );
};

export default FormResponsesPage;
