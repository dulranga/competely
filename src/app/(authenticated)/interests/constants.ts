import {
    Brain,
    Code,
    Gamepad2,
    BarChart3,
    Bot,
    Cpu,
    TrendingUp,
    Aperture,
    Music,
    ShieldCheck,
    Mic,
    Globe2,
    Feather,
} from "lucide-react";

export type Interest = {
    id: string;
    label: string;
    description: string[];
    icon: React.ElementType;
    className?: string; // For flex widths (e.g. md:w-[30%])
    color: {
        main: string;
        light: string;
        dark: string;
    };
};

export const INTERESTS: Interest[] = [
    // ROW 1: AI (Medium) + Software (Long) + IM (Long) -> ~100% (3 items)
    {
        id: "ai-ml",
        label: "AI & ML",
        description: ["Artificial Intelligence", "Machine Learning"],
        icon: Brain,
        className: "md:w-[28%]",
        color: {
            main: "bg-red-400",
            light: "bg-red-200/50",
            dark: "border-red-400",
        },
    },
    {
        id: "software-dev",
        label: "Software Development",
        description: ["Web Development", "Mobile App Development"],
        icon: Code,
        className: "md:w-[38%]",
        color: {
            main: "bg-purple-400",
            light: "bg-purple-200/50",
            dark: "border-purple-400",
        },
    },
    {
        id: "interactive-media",
        label: "Immersive Media",
        description: ["Game Development", "VR & AR"],
        icon: Gamepad2,
        className: "md:w-[30%]",
        color: {
            main: "bg-cyan-400",
            light: "bg-cyan-200/50",
            dark: "border-cyan-400",
        },
    },

    // ROW 2: Data Science (Short) + Engineering (Short) + IOT (Short) + Entrepreneurship (Short) -> ~100% (4 items)
    {
        id: "data-science",
        label: "Data Science",
        description: ["Analysis", "Big Data"],
        icon: BarChart3,
        className: "md:w-[23%]",
        color: {
            main: "bg-pink-500",
            light: "bg-pink-200/50",
            dark: "border-pink-500",
        },
    },
    {
        id: "engineering",
        label: "Engineering",
        description: ["Robotics", "Automation"],
        icon: Bot,
        className: "md:w-[23%]",
        color: {
            main: "bg-blue-400",
            light: "bg-blue-200/50",
            dark: "border-blue-400",
        },
    },
    {
        id: "iot",
        label: "IOT",
        description: ["Electronics", "Industry 4.0"],
        icon: Cpu,
        className: "md:w-[23%]",
        color: {
            main: "bg-orange-400",
            light: "bg-orange-200/50",
            dark: "border-orange-400",
        },
    },
    {
        id: "entrepreneurship",
        label: "Startups",
        description: ["Hackathon", "Business"],
        icon: TrendingUp,
        className: "md:w-[23%]",
        color: {
            main: "bg-green-400",
            light: "bg-green-200/50",
            dark: "border-green-400",
        },
    },

    // ROW 3: Design (Long) + Music (Short) + Cyber (Medium) -> ~100% (3 items)
    {
        id: "design-creative",
        label: "Design & Creative",
        description: ["Graphic Design", "Filmmaking"],
        icon: Aperture,
        className: "md:w-[35%]",
        color: {
            main: "bg-yellow-400",
            light: "bg-yellow-200/50",
            dark: "border-yellow-400",
        },
    },
    {
        id: "music-arts",
        label: "Music & Arts",
        description: ["Performance", "Dance"],
        icon: Music,
        className: "md:w-[25%]",
        color: {
            main: "bg-amber-600",
            light: "bg-amber-200/50",
            dark: "border-amber-600",
        },
    },
    {
        id: "cybersecurity",
        label: "Cybersecurity",
        description: ["Ethical Hacking", "Cloud"],
        icon: ShieldCheck,
        className: "md:w-[35%]",
        color: {
            main: "bg-indigo-500",
            light: "bg-indigo-200/50",
            dark: "border-indigo-500",
        },
    },

    // ROW 4: Comm (Short) + Social (Medium) + Media (Medium) -> ~100% (3 items)
    {
        id: "communication",
        label: "Communication",
        description: ["Pitching", "Debate"],
        icon: Mic,
        className: "md:w-[24%]",
        color: {
            main: "bg-violet-400",
            light: "bg-violet-200/50",
            dark: "border-violet-400",
        },
    },
    {
        id: "social-impact",
        label: "Social Impact",
        description: ["SDG Challenges", "Community"],
        icon: Globe2,
        className: "md:w-[35%]",
        color: {
            main: "bg-emerald-400",
            light: "bg-emerald-200/50",
            dark: "border-emerald-400",
        },
    },
    {
        id: "media-academia",
        label: "Media & Academia",
        description: ["Research", "Journalism"],
        icon: Feather,
        className: "md:w-[35%]",
        color: {
            main: "bg-rose-400",
            light: "bg-rose-200/50",
            dark: "border-rose-400",
        },
    },
];
