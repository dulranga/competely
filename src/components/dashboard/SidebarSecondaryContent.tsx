"use client";

import { useEffect, ReactNode, FC } from "react";
import { useSidebar } from "./SidebarProvider";

export const SidebarSecondaryContent: FC<{ children: ReactNode }> = ({ children }) => {
    const { setRightSide } = useSidebar();

    useEffect(() => {
        setRightSide(children);
        // Clear on unmount
        return () => setRightSide(null);
    }, [children, setRightSide]);

    return null;
};
