"use client";

import { CompetitionCard } from "~/components/public/CompetitionCard";

export default function CompetitionRowPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-8">
            <h1 className="text-3xl font-bold">Competition Card - Row Variant</h1>

            <div className="max-w-4xl mx-auto space-y-4">
                <CompetitionCard
                    variant="list"
                    status="Ongoing"
                    title="HackExtreme 2026"
                    category="University"
                    registeredCount={150}
                    deadline="Jan 20, 2026"
                    organizerName="UCSC IEEE"
                />
                <CompetitionCard
                    variant="list"
                    status="Upcoming"
                    title="Dev Vanguard"
                    category="Open"
                    registeredCount={45}
                    deadline="Feb 10, 2026"
                    organizerName="FOSS Community"
                    isBookmarked={true}
                />
                <CompetitionCard
                    variant="list"
                    status="Closed"
                    title="Design Wars"
                    category="School"
                    registeredCount={200}
                    deadline="Dec 25, 2025"
                    organizerName="Design Circle"
                />
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Grid Variant (Comparison)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CompetitionCard status="Ongoing" />
                    <CompetitionCard status="Upcoming" />
                    <CompetitionCard status="Closed" />
                </div>
            </div>
        </div>
    );
}
