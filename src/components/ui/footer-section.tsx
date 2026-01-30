import Link from "next/link";

export interface FooterLink {
    name: string;
    href: string;
}

interface FooterSectionProps {
    title: string;
    links: FooterLink[];
}

export function FooterSection({ title, links }: FooterSectionProps) {
    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
