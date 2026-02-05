import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/providers/theme-provider";
import { QueryProvider } from "~/providers/query-provider";

import "./globals.css";

const fontSans = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Competely",
    description: "Browse, find, organize, and join competitions",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html className="light" style={{ colorScheme: "light" }} suppressHydrationWarning>
            <body className={`${fontSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <QueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        {children}

                        <Toaster />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
