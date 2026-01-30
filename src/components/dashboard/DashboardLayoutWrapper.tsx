"use client";

import { Award, BarChart3, Clock, Eye, FileText, LayoutDashboard, Plus, Users } from "lucide-react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { DashboardSidebar } from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import { ModalProvider } from "./modals/modal-provider";

interface DashboardLayoutWrapperProps {
    children: ReactNode;
}

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

const DashboardLayoutInner: FC<DashboardLayoutWrapperProps> = ({ children }) => {
    const { rightSide } = useSidebar();

    const sidebarItems = [
        {
            title: "Home",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Editor",
            href: "/dashboard/editor",
            icon: Award,
            secondary: EditorSidebar,
        },
        {
            title: "Timeline",
            href: "/dashboard/timeline",
            icon: Clock,
        },
        {
            title: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart3,
        },
        {
            title: "Form Builder",
            href: "/dashboard/forms",
            icon: FileText,
        },
        {
            title: "Users",
            href: "/dashboard/users",
            icon: Users,
        },
        {
            title: "Preview",
            href: "/dashboard/preview",
            icon: Eye,
        },
    ];
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#fbf6f3]">
            <DashboardSidebar items={sidebarItems} overriddenSecondary={rightSide} />
            <main className="flex-1 relative overflow-y-auto">
                <div className="p-10 pt-16">
                    <ModalProvider>{children}</ModalProvider>
                </div>
            </main>
        </div>
    );
};

export const DashboardLayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SidebarProvider>
            <DashboardLayoutInner>{children}</DashboardLayoutInner>
        </SidebarProvider>
    );
};
