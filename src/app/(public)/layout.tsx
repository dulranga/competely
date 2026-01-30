import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-card">
            <div className="relative flex flex-1">
                <main className="flex-1 relative transition-all duration-300 flex flex-col">
                    <div className="grid-bg"></div>
                    <div className="flex-1">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
