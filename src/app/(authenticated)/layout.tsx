import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ModalProvider } from "~/components/dashboard/modals/modal-provider";
import { auth } from "~/lib/auth";
import getCurrentPath from "~/lib/getCurrentPathServer";
import { Header } from "~/components/ui/header";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const pathname = await getCurrentPath();

    const session = await auth.api.getSession({
        headers: headersList,
    });
    if (!session) {
        redirect(`/login?callbackURL=${encodeURIComponent(pathname)}`);
    }

    return (
        <ModalProvider>
            <Header />
            {children}
        </ModalProvider>
    );
}
