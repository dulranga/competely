"use client";

import { JudgeProvider } from "./judge-context";

export default function JudgeDashboardLayout({ children }: { children: React.ReactNode }) {
    return <JudgeProvider>{children}</JudgeProvider>;
}
