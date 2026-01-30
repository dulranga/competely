"use client";

import { useEffect, useState } from "react";
import { Search, Rocket, BarChart } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

const services = [
    {
        icon: Search,
        title: "Find Competitions",
        description: "Discover your global stage.",
        features: [
            "Curated Opportunities: (TBA)",
            "Global Reach: (TBA)",
            "Smart Filtering: (TBA)"
        ],
        variant: "primary" as const,
        delay: 0
    },
    {
        icon: Rocket,
        title: "Organize Competitions",
        description: "Launch with impact.",
        features: [
            "Intutive Setup: (TBA)",
            "Customizable Controls: (TBA)",
            "Seamless Promotion: (TBA)"
        ],
        variant: "secondary" as const,
        delay: 150
    },
    {
        icon: BarChart,
        title: "Manage Competitions",
        description: "Complete control simplified.",
        features: [
            "Centralized Dashboard: (TBA)",
            "Automated Workflows: (TBA)",
            "Efficient Judging: (TBA)"
        ],
        variant: "primary" as const,
        delay: 300
    }
];

export function Services() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="py-20 px-4 relative">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the features that make Competely the perfect choice for your competitive journey
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            features={service.features}
                            isVisible={isVisible}
                            delay={service.delay}
                            variant={service.variant}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
