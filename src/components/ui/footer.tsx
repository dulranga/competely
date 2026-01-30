import { Logo } from "~/components/ui/logo";
import { FooterSection, type FooterLink } from "~/components/ui/footer-section";
import { SocialLink, SocialIcons } from "~/components/ui/social-link";

const footerLinks = {
    product: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Roadmap", href: "/roadmap" }
    ] as FooterLink[],
    company: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
    ] as FooterLink[],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Cookies", href: "/cookies" }
    ] as FooterLink[]
};

const socialLinks = [
    { label: "Twitter", href: "#", icon: SocialIcons.Twitter },
    { label: "GitHub", href: "#", icon: SocialIcons.GitHub },
    { label: "LinkedIn", href: "#", icon: SocialIcons.LinkedIn }
];

export function Footer() {
    return (
        <footer className="mt-auto border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo size="md" />
                        <p className="text-sm text-muted-foreground">
                            Empowering competitors worldwide to achieve their goals and reach new heights.
                        </p>
                    </div>

                    <FooterSection title="Product" links={footerLinks.product} />
                    <FooterSection title="Company" links={footerLinks.company} />
                    <FooterSection title="Legal" links={footerLinks.legal} />
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-border/40">
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
        </footer>
    );
}
