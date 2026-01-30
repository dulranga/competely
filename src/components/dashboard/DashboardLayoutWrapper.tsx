"use client";

import { Award, BarChart3, Clock, Eye, FileText, LayoutDashboard, Plus, Users } from "lucide-react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { DashboardSidebar, sidebarItems } from "./Sidebar";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import { ModalProvider } from "./modals/modal-provider";

interface DashboardLayoutWrapperProps {
    children: ReactNode;
}

const DashboardLayoutInner: FC<DashboardLayoutWrapperProps> = ({ children }) => {
    const { rightSide } = useSidebar();

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
