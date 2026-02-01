"use client";

import { FC, PropsWithChildren, ReactNode } from "react";
import { DashboardSidebar, sidebarItems } from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarProvider";

interface DashboardLayoutWrapperProps {
    children: ReactNode;
}

const DashboardLayoutInner: FC<DashboardLayoutWrapperProps> = ({ children }) => {
    const { rightSide } = useSidebar();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#fbf6f3]">
            <DashboardSidebar items={sidebarItems} overriddenSecondary={rightSide} />
            <main className="flex-1 relative overflow-y-auto">
                <div className="p-10 pt-16">{children}</div>
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
