import { SocialLink, SocialIcons } from "~/components/ui/social-link";

const socialLinks = [
    { label: "Twitter", href: "#", icon: SocialIcons.Twitter },
    { label: "GitHub", href: "#", icon: SocialIcons.GitHub },
    { label: "LinkedIn", href: "#", icon: SocialIcons.LinkedIn }
];

export function FooterBottom() {
    return (
        <div className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2026 Competely. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {socialLinks.map((social) => (
                            <SocialLink
                                key={social.label}
                                href={social.href}
                                icon={social.icon}
                                label={social.label}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
