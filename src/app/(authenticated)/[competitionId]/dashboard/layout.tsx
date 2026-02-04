import { FC, ReactNode } from "react";
import { DashboardLayoutWrapper } from "~/components/dashboard/DashboardLayoutWrapper";

export const dynamic = "force-dynamic";

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ competitionId: string }>;
}

const DashboardLayout: FC<LayoutProps> = async ({ children, params }) => {
    const { competitionId } = await params;
    return <DashboardLayoutWrapper competitionId={competitionId}>{children}</DashboardLayoutWrapper>;
};

export default DashboardLayout;
