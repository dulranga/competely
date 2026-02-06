"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { CompetitionRole, MyCompetitionCard } from "~/components/create/MyCompetitionCard";
import { useModal } from "~/components/dashboard/modals/modal-provider";
import { Button } from "~/components/ui/button";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getRandomAvatar } from "~/lib/getRandomAvatar";
import { cn, getFileUrlById, slugify } from "~/lib/utils";
import { toast } from "sonner";
import { joinCompetitionAction } from "~/app/(authenticated)/create/actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

interface Competition {
    id: string;
    name: string;
    role: string;
    bannerId: string | null;
}

interface CreatePageContentProps {
    initialCompetitions: Competition[];
}

export function CreatePageContent({ initialCompetitions }: CreatePageContentProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const { openModal } = useModal();
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [isJoining, setIsJoining] = useState(false);

    const handleJoin = async (formData: FormData) => {
        setIsJoining(true);
        const result = await joinCompetitionAction(formData);
        setIsJoining(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.success);
            setIsJoinDialogOpen(false);
        }
    };

    const filteredCompetitions = useMemo(() => {
        return initialCompetitions.filter((comp) => comp.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [initialCompetitions, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">

            <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 space-y-10">
                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    {/* Search - Gray Style */}
                    <div className="relative w-full md:max-w-xl">
                        <Input
                            className="w-full h-11 pl-11 pr-4 rounded-lg border-0 bg-gray-200/60 focus:bg-white transition-colors placeholder:text-muted-foreground"
                            placeholder="Search contributions"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button
                            className="flex-1 md:flex-none bg-[#1a1b25] hover:bg-[#2c2e3f] text-white"
                            onClick={() => openModal("createCompetition", {})}
                        >
                            New Competition
                        </Button>
                        <Button
                            className="flex-1 md:flex-none bg-[#1a1b25] hover:bg-[#2c2e3f] text-white"
                            onClick={() => setIsJoinDialogOpen(true)}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                {/* Content Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-3xl font-bold text-[#1a1b25]">My Competitions</h1>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 hover:bg-transparent",
                                viewMode === "grid" ? "text-foreground" : "text-muted-foreground",
                            )}
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 hover:bg-transparent",
                                viewMode === "list" ? "text-foreground" : "text-muted-foreground",
                            )}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Content Grid/List */}
                <div className="bg-[#fcf8f6] rounded-3xl p-6 md:p-10 min-h-[500px]">
                    {filteredCompetitions.length > 0 ? (
                        <div
                            className={cn(
                                viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "flex flex-col gap-4",
                            )}
                        >
                            {filteredCompetitions.map((comp) => (
                                <MyCompetitionCard
                                    key={comp.id}
                                    id={comp.id}
                                    name={comp.name}
                                    role={comp.role as CompetitionRole}
                                    imageUrl={comp.bannerId ? getFileUrlById(comp.bannerId) : getRandomAvatar(comp.id)}
                                    variant={viewMode}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-lg text-muted-foreground">No competitions found.</p>
                            <Button
                                variant="link"
                                onClick={() => setSearchQuery("")}
                                className="text-primary font-bold"
                            >
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination (Stateless for now) */}
                <div className="flex items-center justify-center gap-4 pt-4 pb-12">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            size="icon"
                            className="h-9 w-9 bg-[#1a1b25] hover:bg-[#2c2e3f] text-white font-medium"
                        >
                            1
                        </Button>
                    </div>
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </main>
            <FooterBottom />

            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#1a1b25]">Join OC Panel</DialogTitle>
                        <DialogDescription>
                            Enter your details to join the Organizing Committee.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <form action={handleJoin} id="join-form">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-left font-bold text-[#1a1b25]">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        className="col-span-3 rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-left font-bold text-[#1a1b25]">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="col-span-3 rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="competitionCode" className="text-left font-bold text-[#1a1b25]">
                                        Competition Code
                                    </Label>
                                    <Input
                                        id="competitionCode"
                                        name="competitionCode"
                                        placeholder="COMP-123456"
                                        className="col-span-3 rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-left font-bold text-[#1a1b25]">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="col-span-3 rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            form="join-form"
                            className="w-full rounded-xl bg-[#1a1b25] text-white font-bold hover:bg-[#2c2e3f]"
                            disabled={isJoining}
                        >
                            {isJoining ? "Connecting..." : "Connect"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
