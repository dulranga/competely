"use client";

import Link from "next/link";
import { Logo } from "~/components/ui/logo";
import { Button } from "~/components/ui/button";
import { Bell, User, Home, Compass, Trophy, Plus, Bookmark, LogOut } from "lucide-react";
import { cn } from "~/lib/utils";
import { authClient } from "~/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Discover", href: "/discover", icon: Compass },
    { name: "Competitions", href: "/my-competitions", icon: Trophy },
    { name: "Create", href: "/create", icon: Plus },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
];

interface HeaderProps {
    currentPath?: string;
}

export function HeaderAuthenticated({ currentPath = "/" }: HeaderProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        toast("Signed out successfully");
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/home" className="flex items-center">
                    <Logo size="sm" />
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                                {item.name === "Bookmarks" && (
                                    <span
                                        className={cn(
                                            "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                                            isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground",
                                        )}
                                    >
                                        10
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Notification Icon */}
                    <Button variant="ghost" size="icon" className="relative" asChild>
                        <Link href="/notifications">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                            {/* Notification badge */}
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </Link>
                    </Button>

                    {/* Profile Icon */}
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/profile">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Profile</span>
                        </Link>
                    </Button>

                    {/* Sign Out Button */}
                    <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Sign Out</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden border-t border-border/40">
                <div className="container mx-auto px-4 py-2 flex justify-around">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 px-2 py-1 rounded-md transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-xs">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}
