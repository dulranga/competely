import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  isVisible: boolean;
  delay: number;
  variant?: "primary" | "secondary";
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  isVisible,
  delay,
  variant = "primary",
}: ServiceCardProps) {
  const isPrimary = variant === "primary";
  const glowColor = isPrimary ? "rgba(0,242,255,0.3)" : "rgba(168,85,247,0.3)";
  const borderColor = isPrimary ? "primary" : "secondary";
  const iconBg = isPrimary ? "primary" : "secondary";
  const checkColor = isPrimary ? "primary" : "secondary";

  return (
    <Card
      className={`group hover:shadow-[0_0_30px_${glowColor}] transition-all duration-500 border-${borderColor}/20 hover:border-${borderColor}/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div
          className={`w-12 h-12 bg-${iconBg}/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${iconBg}/20 transition-colors`}
        >
          <Icon className={`h-6 w-6 text-${iconBg}`} />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 text-${checkColor}`}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
