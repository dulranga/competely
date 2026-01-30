"use client";

import { Award, BarChart3, Clock, Eye, FileText, LayoutDashboard, Upload, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import EditorSidebar from "./secondary-sidebars/EditorSidebar";
import FormBuilderSidebar from "./secondary-sidebars/FormBuilder";

interface SidebarItem {
    title: string;
    href: string;
    icon: any;
    secondary?: FC;
}

interface DashboardSidebarProps {
    items: SidebarItem[];
    overriddenSecondary?: ReactNode;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ items, overriddenSecondary }) => {
    const pathname = usePathname();

    // Find the current active item based on the longest matching path
    const activeItem = [...items]
        .sort((a, b) => b.href.length - a.href.length)
        .find((item) => pathname.startsWith(item.href));

    const Secondary = activeItem?.secondary;
    const hasSecondary = !!(overriddenSecondary || Secondary);

    return (
        <div className="flex h-screen bg-[#fbf6f3] overflow-hidden select-none">
            {/* Left Static Sidebar */}
            <div className="w-24 flex flex-col items-center py-8 pb-10 bg-white/40 backdrop-blur-xl border-r border-[#e8e2de]/60 z-20">
                <div className="mb-10 group">
                    <Link
                        href="/dashboard"
                        className="text-4xl font-black tracking-tighter hover:scale-110 transition-all duration-300 block"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#0c0803] to-[#4b5563]">
                            C.
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center gap-5 w-full px-4">
                    <TooltipProvider delayDuration={0}>
                        {items.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "w-14 h-14 flex items-center justify-center rounded-[1.25rem] transition-all duration-500 relative group/item",
                                                isActive
                                                    ? "bg-[#0c0803] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] scale-105"
                                                    : "bg-white/50 text-[#0c0803]/40 hover:bg-white hover:text-[#0c0803] hover:shadow-sm",
                                            )}
                                        >
                                            <item.icon
                                                size={24}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                className={cn(
                                                    "transition-transform duration-300",
                                                    isActive ? "" : "group-hover/item:scale-110",
                                                )}
                                            />
                                            {isActive && (
                                                <div className="absolute -left-1 w-1.5 h-6 bg-[#0c0803] rounded-full" />
                                            )}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" sideOffset={10}>
                                        <p className="font-bold text-xs uppercase tracking-widest">{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </TooltipProvider>
                </div>

                <div className="px-4 w-full pt-6 border-t border-[#e8e2de]/40">
                    <Button
                        variant="default"
                        className="w-full h-14 rounded-2xl bg-[#0c0803] hover:bg-black text-white flex flex-col gap-1 p-0 text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-200"
                    >
                        <Upload size={16} />
                        Publish
                    </Button>
                </div>
            </div>

            {/* Right Dynamic Sidebar */}
            {hasSecondary && (
                <div className="w-80 flex flex-col h-full pl-3 relative z-10">
                    <div className="flex-1 overflow-hidden py-6 pr-3">
                        <div className="h-full bg-white/80 backdrop-blur-md rounded-[3.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-[#e8e2de]/30 flex flex-col overflow-hidden relative">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#bcde8c]/10 to-transparent rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />

                            <ScrollArea className="flex-1">
                                <div className="px-7 py-12 relative z-10 h-full flex flex-col">
                                    <div className="flex flex-col gap-4 flex-1">
                                        {overriddenSecondary || (Secondary && <Secondary />)}
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const sidebarItems = [
    {
        title: "Home",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Editor",
        href: "/dashboard/editor",
        icon: Award,
        secondary: EditorSidebar,
    },
    {
        title: "Timeline",
        href: "/dashboard/timeline",
        icon: Clock,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Form Builder",
        href: "/dashboard/forms",
        secondary: FormBuilderSidebar,
        icon: FileText,
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Preview",
        href: "/dashboard/preview",
        icon: Eye,
    },
];
