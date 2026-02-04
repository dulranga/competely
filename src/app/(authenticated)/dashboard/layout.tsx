import { FC, ReactNode } from "react";
import { DashboardLayoutWrapper } from "~/components/dashboard/DashboardLayoutWrapper";

export const dynamic = "force-dynamic";

interface LayoutProps {
    children: ReactNode;
}

const DashboardLayout: FC<LayoutProps> = async ({ children }) => {
    return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
};

export default DashboardLayout;
