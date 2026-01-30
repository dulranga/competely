import { InterestsClient } from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Select Interests | Competely",
    description: "Choose your areas of interest to personalize your experience.",
};

export default function InterestsPage() {
    return <InterestsClient />;
}
