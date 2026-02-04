"use client";

import { FC, PropsWithChildren, ReactNode } from "react";
import { DashboardSidebar, sidebarItems } from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarProvider";

interface DashboardLayoutWrapperProps {
    children: ReactNode;
    competitionId: string;
}

const DashboardLayoutInner: FC<DashboardLayoutWrapperProps> = ({ children, competitionId }) => {
    const { rightSide } = useSidebar();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#fbf6f3]">
            <DashboardSidebar competitionId={competitionId} items={sidebarItems} overriddenSecondary={rightSide} />
            <main className="flex-1 relative overflow-y-auto">
                <div className="p-10 pt-16">{children}</div>
            </main>
        </div>
    );
};

export const DashboardLayoutWrapper: FC<PropsWithChildren<{ competitionId: string }>> = ({ children, competitionId }) => {
    return (
        <SidebarProvider>
            <DashboardLayoutInner competitionId={competitionId}>{children}</DashboardLayoutInner>
        </SidebarProvider>
    );
};
