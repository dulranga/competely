"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, Download, FileText, Loader2, RefreshCcw, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getFormFieldsAction, getPaginatedFormResponsesAction } from "~/app/(authenticated)/dashboard/forms/actions";
import FormResponsesTable from "~/components/dashboard/FormResponsesTable";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";

interface Event {
    id: string;
    name: string;
    type: string;
    form?: {
        id: string;
        name: string;
    } | null;
}

interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

interface AnalyticsClientProps {
    events: Event[];
    selectedRound: Round | null;
}

export function AnalyticsClient({ events, selectedRound }: AnalyticsClientProps) {
    const [page, setPage] = useState(1);
    const limit = 20;

    const eventsWithForms = useMemo(() => events.filter((e) => e.form), [events]);

    const [selectedEventId, setSelectedEventId] = useState<string | null>(
        eventsWithForms.length > 0 ? eventsWithForms[0].id : null,
    );

    useEffect(() => {
        if (eventsWithForms[0]) setSelectedEventId(eventsWithForms[0].id);
    }, [eventsWithForms]);

    const selectedEvent = useMemo(
        () => eventsWithForms.find((e) => e.id === selectedEventId) || null,
        [eventsWithForms, selectedEventId],
    );

    const { data: fields = [], isLoading: isFieldsLoading } = useQuery({
        queryKey: ["form-fields", selectedEvent?.form?.id],
        queryFn: () => getFormFieldsAction(selectedEvent!.form!.id),
        enabled: Boolean(selectedEvent?.form?.id),
    });

    const {
        data: responsesData,
        isLoading: isResponsesLoading,
        refetch: refetchResponses,
    } = useQuery({
        queryKey: ["form-responses", selectedEvent?.form?.id, page],
        queryFn: () => getPaginatedFormResponsesAction(selectedEvent!.form!.id, page, limit),
        enabled: Boolean(selectedEvent?.form?.id),
    });

    if (!selectedRound) return null;

    if (eventsWithForms.length === 0) {
        return (
            <div className="space-y-8">
                <div className="grid gap-4">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803] uppercase">
                        {selectedRound.name} Analytics
                    </h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        No forms are linked to events in this round. Link a form in the timeline to view submissions
                        here.
                    </p>
                </div>
            </div>
        );
    }

    const isLoading = isFieldsLoading || isResponsesLoading;

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="grid gap-4">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803] uppercase">
                        {selectedRound.name} Analytics
                    </h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        View and manage submissions for forms in this phase.
                    </p>
                </div>

                {eventsWithForms.length > 1 && (
                    <div className="w-full md:w-72 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0c0803]/40">
                            Select Event Form
                        </label>
                        <Select value={selectedEventId || ""} onValueChange={setSelectedEventId}>
                            <SelectTrigger className="h-12 rounded-2xl border-[#e8e2de] bg-white">
                                <SelectValue placeholder="Select an event" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-[#e8e2de]">
                                {eventsWithForms.map((e) => (
                                    <SelectItem key={e.id} value={e.id} className="rounded-xl">
                                        {e.name} ({e.form?.name})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* Stats Overview for the current form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className=" border-[#e8e2de] hover:shadow-md transition-shadow">
                    <CardContent className=" space-y-4">
                        <div className="flex items-center gap-3 text-[#0c0803]/40">
                            <Users size={20} />
                            <span className="text-sm font-black uppercase tracking-widest">Total Responses</span>
                        </div>
                        <div className="text-5xl font-black tracking-tighter text-[#0c0803]">
                            {responsesData?.total || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className=" border-[#e8e2de] hover:shadow-md transition-shadow">
                    <CardContent className=" space-y-4">
                        <div className="flex items-center gap-3 text-[#0c0803]/40">
                            <FileText size={20} />
                            <span className="text-sm font-black uppercase tracking-widest">Form Name</span>
                        </div>
                        <div className="text-2xl font-black tracking-tight text-[#0c0803] line-clamp-1">
                            {selectedEvent?.form?.name || "N/A"}
                        </div>
                    </CardContent>
                </Card>

                <Card className=" border-[#e8e2de] hover:shadow-md transition-shadow">
                    <CardContent className=" space-y-4">
                        <div className="flex items-center gap-3 text-[#0c0803]/40">
                            <Clock size={20} />
                            <span className="text-sm font-black uppercase tracking-widest">Latest Submission</span>
                        </div>
                        <div className="text-2xl font-black tracking-tight text-[#0c0803]">
                            {responsesData?.data?.[0]
                                ? new Date(responsesData.data[0].submittedAt).toLocaleDateString()
                                : "No submissions"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[#0c0803]">Submissions</h2>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={isResponsesLoading}
                            onClick={() => refetchResponses()}
                            className="h-10 w-10 rounded-xl border-[#e8e2de] hover:border-primary hover:text-primary transition-all active:scale-95"
                        >
                            <RefreshCcw size={16} className={cn(isResponsesLoading && "animate-spin")} />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-10 px-5 rounded-xl border-[#e8e2de] text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95"
                        >
                            <Download size={14} className="mr-2" /> Export CSV
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-sm font-bold uppercase tracking-widest text-[#0c0803]/40">
                                Loading submissions...
                            </p>
                        </div>
                    ) : (
                        <FormResponsesTable
                            fields={fields}
                            responses={responsesData?.data || []}
                            total={responsesData?.total || 0}
                            page={page}
                            limit={limit}
                            onPageChange={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
