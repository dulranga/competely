"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type SubmissionStatus = "to_review" | "reviewed" | "finished";

export interface Submission {
    id: string;
    teamName: string;
    projectTitle: string;
    track: string;
    submittedAt: string;
    status: SubmissionStatus;
    score: number | null;
    marks: Record<string, number>;
    description: string;
    techStack: string[];
    repoLink: string;
    demoLink: string;
    content: string;
}

interface JudgeContextType {
    submissions: Submission[];
    getSubmission: (id: string) => Submission | undefined;
    updateMarks: (id: string, marks: Record<string, number>) => void;
    saveDraft: (id: string) => void;
    submitEvaluation: (id: string) => void;

}

const JudgeContext = createContext<JudgeContextType | null>(null);

const MOCK_SUBMISSIONS: Submission[] = [
    {
        id: "sub-001",
        teamName: "Quantum Leapers",
        projectTitle: "AI-Powered Waste Management",
        track: "Sustainability",
        submittedAt: "2 hrs ago",
        status: "to_review",
        score: null,
        marks: { innovation: 5, functionality: 5, uiux: 5, pitch: 5, impact: 5 },
        description: "A comprehensive solution using computer vision to segregate waste.",
        techStack: ["Python", "TensorFlow"],
        repoLink: "github.com/quantum",
        demoLink: "demo.app",
        content: "Full project details...",
    },
    {
        id: "sub-002",
        teamName: "Pixel Pioneers",
        projectTitle: "Decentralized Voting System",
        track: "Blockchain",
        submittedAt: "5 hrs ago",
        status: "to_review",
        score: null,
        marks: { innovation: 5, functionality: 5, uiux: 5, pitch: 5, impact: 5 },
        description: "Voting on blockchain.",
        techStack: ["Solidity", "React"],
        repoLink: "github.com/pixel",
        demoLink: "pixel.app",
        content: "Details...",
    },
    {
        id: "sub-003",
        teamName: "Cyber Sentinels",
        projectTitle: "Next-Gen Firewall",
        track: "Cybersecurity",
        submittedAt: "1 day ago",
        status: "reviewed",
        score: null, // Reviewed but not finished, so no final score yet public
        marks: { innovation: 8, functionality: 8, uiux: 7, pitch: 6, impact: 7 },
        description: "Firewall viz.",
        techStack: ["Rust", "Tauri"],
        repoLink: "github.com/cyber",
        demoLink: "cyber.app",
        content: "Details...",
    },
];

export function JudgeProvider({ children }: { children: ReactNode }) {
    const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);

    const getSubmission = (id: string) => submissions.find((s) => s.id === id);

    const updateMarks = (id: string, newMarks: Record<string, number>) => {
        setSubmissions((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, marks: newMarks } : s
            )
        );
    };

    const saveDraft = (id: string) => {
        setSubmissions((prev) =>
            prev.map((s) =>
                s.id === id && s.status === "to_review" ? { ...s, status: "reviewed" } : s
            )
        );
    };

    const submitEvaluation = (id: string) => {
        setSubmissions((prev) =>
            prev.map((s) => {
                if (s.id === id) {
                    const total = Object.values(s.marks).reduce((a, b) => a + b, 0);
                    return { ...s, status: "finished", score: total };
                }
                return s;
            })
        );
    };

    return (
        <JudgeContext.Provider value={{ submissions, getSubmission, updateMarks, saveDraft, submitEvaluation }}>
            {children}
        </JudgeContext.Provider>
    );
}

export function useJudge() {
    const context = useContext(JudgeContext);
    if (!context) throw new Error("useJudge must be used within JudgeProvider");
    return context;
}
