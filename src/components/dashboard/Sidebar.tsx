"use client";

import { Award, BarChart3, Clock, Eye, FileText, LayoutDashboard, Upload, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import RoundSidebar from "./secondary-sidebars/RoundSidebar";
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
            <div className="w-20 flex flex-col items-center py-8 pb-10 bg-white/40 backdrop-blur-xl border-r border-[#e8e2de]/60 z-20">
                <div className="mb-10 group">
                    <Link
                        href="/dashboard"
                        className="text-2xl font-black tracking-tighter hover:scale-105 transition-all duration-300 block"
                    >
                        <span className="text-[#0c0803]">C.</span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center gap-4 w-full px-3">
                    <TooltipProvider delayDuration={0}>
                        {items.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group/item",
                                                isActive
                                                    ? "bg-[#0c0803] text-white shadow-md scale-105"
                                                    : "text-[#0c0803]/40 hover:text-[#0c0803] hover:bg-white/50",
                                            )}
                                        >
                                            <item.icon
                                                size={20}
                                                strokeWidth={isActive ? 2 : 1.5}
                                                className={cn(
                                                    "transition-transform duration-300",
                                                    isActive ? "" : "group-hover/item:scale-110",
                                                )}
                                            />
                                            {isActive && (
                                                <div className="absolute -left-1 w-1 h-4 bg-[#0c0803] rounded-full" />
                                            )}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" sideOffset={10}>
                                        <p className="font-bold text-[10px] uppercase tracking-widest">{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </TooltipProvider>
                </div>

                <div className="px-3 w-full pt-6 border-t border-[#e8e2de]/40">
                    <Button
                        variant="competely"
                        size="icon-lg"
                        className="w-full h-12 rounded-xl flex flex-col gap-0.5 p-0 text-[8px] font-black uppercase tracking-tighter"
                    >
                        <Upload size={14} />
                        Publish
                    </Button>
                </div>
            </div>

            {/* Right Dynamic Sidebar */}
            {hasSecondary && (
                <div className="w-72 flex flex-col h-full pl-2 relative z-10 transition-all duration-300">
                    <div className="flex-1 overflow-hidden py-4 pr-3">
                        <div className="h-full bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-[#e8e2de]/40 flex flex-col overflow-hidden relative">
                            <ScrollArea className="flex-1">
                                <div className="px-6 py-10 relative z-10 h-full flex flex-col">
                                    <div className="flex flex-col gap-3 flex-1">
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
    },
    {
        title: "Timeline",
        href: "/dashboard/timeline",
        icon: Clock,
        secondary: RoundSidebar,
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
