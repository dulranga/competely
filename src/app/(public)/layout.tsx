import { FC } from "react";
import { Header } from "~/components/ui/header";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <div className="relative flex flex-1 flex-col">
                <main className="flex-1 relative transition-all duration-300 flex flex-col">
                    <div className="flex-1 w-full">{children}</div>
                </main>
            </div>
            {/* <PublicFooter /> */}
        </div>
    );
};

export default Layout;
