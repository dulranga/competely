import Link from "next/link";
import { Logo } from "~/components/ui/logo";
import { Button } from "~/components/ui/button";
import { SearchBar } from "~/components/ui/search-bar";

export function HeaderPublic() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Logo size="sm" />
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-2xl">
                    <SearchBar className="w-full" redirectToDiscover={true} />
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden">
                <div className="container mx-auto px-4 pb-3">
                    <SearchBar className="w-full" redirectToDiscover={true} />
                </div>
            </div>
        </header>
    );
}
