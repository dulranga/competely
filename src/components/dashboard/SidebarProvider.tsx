"use client";

import { createContext, useContext, useState, ReactNode, FC } from "react";

interface SidebarContextType {
    rightSide: ReactNode;
    setRightSide: (content: ReactNode) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [rightSide, setRightSide] = useState<ReactNode>(null);

    return <SidebarContext.Provider value={{ rightSide, setRightSide }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
