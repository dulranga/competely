import { Logo } from "~/components/ui/logo";
import { FooterSection, type FooterLink } from "~/components/ui/footer-section";

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
            </div>
        </footer>
    );
}
