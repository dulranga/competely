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
    color: {
        main: string;
        light: string;
        dark: string;
    };
};

export const INTERESTS: Interest[] = [
    {
        id: "ai-ml",
        label: "AI & ML",
        description: ["Artificial Intelligence", "Machine Learning", "Computer Vision"],
        icon: Brain,
        color: {
            main: "bg-red-400",
            light: "bg-red-200/50",
            dark: "border-red-400",
        },
    },
    {
        id: "software-dev",
        label: "Software Development",
        description: ["Web Development", "Mobile App Development", "SaaS"],
        icon: Code,
        color: {
            main: "bg-purple-400",
            light: "bg-purple-200/50",
            dark: "border-purple-400",
        },
    },
    {
        id: "interactive-media",
        label: "Immersive & Interactive Media",
        description: [
            "Game Development",
            "3D Simulation & Design",
            "Virtual Reality & Augmented Reality",
        ],
        icon: Gamepad2,
        color: {
            main: "bg-cyan-400",
            light: "bg-cyan-200/50",
            dark: "border-cyan-400",
        },
    },
    {
        id: "data-science",
        label: "Data Science",
        description: ["Data Analysis", "Data Visualization", "Big Data Systems"],
        icon: BarChart3,
        color: {
            main: "bg-pink-500",
            light: "bg-pink-200/50",
            dark: "border-pink-500",
        },
    },
    {
        id: "engineering",
        label: "Engineering",
        description: ["Robotics", "Mechatronics", "Automation Systems"],
        icon: Bot,
        color: {
            main: "bg-blue-400",
            light: "bg-blue-200/50",
            dark: "border-blue-400",
        },
    },
    {
        id: "iot",
        label: "IOT",
        description: ["Electronics", "Internet of Things", "Industry 4.0 Systems"],
        icon: Cpu,
        color: {
            main: "bg-orange-400",
            light: "bg-orange-200/50",
            dark: "border-orange-400",
        },
    },
    {
        id: "entrepreneurship",
        label: "Entrepreneurship",
        description: ["Hackathon & Ideathon", "Business Model Design", "Case Study"],
        icon: TrendingUp,
        color: {
            main: "bg-green-400",
            light: "bg-green-200/50",
            dark: "border-green-400",
        },
    },
    {
        id: "design-creative",
        label: "Design & Creative Media",
        description: ["Art & Graphic Design", "Photography", "Videography & Film Making"],
        icon: Aperture,
        color: {
            main: "bg-yellow-400",
            light: "bg-yellow-200/50",
            dark: "border-yellow-400",
        },
    },
    {
        id: "music-arts",
        label: "Music & Performance Arts",
        description: [
            "Vocal & Instrumental Performance",
            "Dance & Movement Arts",
            "Theatre & Spoken Performance",
        ],
        icon: Music,
        color: {
            main: "bg-amber-600",
            light: "bg-amber-200/50",
            dark: "border-amber-600",
        },
    },
    {
        id: "cybersecurity",
        label: "Cybersecurity",
        description: ["Ethical Hacking", "Cloud Computing & Networking", "Dev Ops"],
        icon: ShieldCheck,
        color: {
            main: "bg-indigo-500",
            light: "bg-indigo-200/50",
            dark: "border-indigo-500",
        },
    },
    {
        id: "communication",
        label: "Communication",
        description: ["Idea Pitching", "Public Speaking", "Debate"],
        icon: Mic,
        color: {
            main: "bg-violet-400",
            light: "bg-violet-200/50",
            dark: "border-violet-400",
        },
    },
    {
        id: "social-impact",
        label: "Social Impact",
        description: ["SDG Challenges", "Climate Innovation", "Community Development"],
        icon: Globe2,
        color: {
            main: "bg-emerald-400",
            light: "bg-emerald-200/50",
            dark: "border-emerald-400",
        },
    },
    {
        id: "media-academia",
        label: "Media & Academia",
        description: ["Research", "Creative Writing", "Journalism"],
        icon: Feather,
        color: {
            main: "bg-rose-400",
            light: "bg-rose-200/50",
            dark: "border-rose-400",
        },
    },
];
