import { FC } from "react";
import { ModalProvider } from "~/components/dashboard/modals/modal-provider";

export const dynamic = "force-dynamic";

const DashboardLayout: FC<LayoutProps<"/[lang]">> = async ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-card">
            <div className="relative flex flex-1">
                <main className="flex-1 relative transition-all duration-300 flex flex-col">
                    <div className="flex-1 relative z-10 p-6">
                        <ModalProvider>{children}</ModalProvider>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
