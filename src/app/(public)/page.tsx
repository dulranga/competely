import { Hero } from "~/components/marketing/Hero";
import { Services } from "~/components/marketing/Services";
import { Footer } from "~/components/ui/footer";
import { FooterBottom } from "~/components/ui/footer-bottom";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
            <Hero />
            <Services />
            <Footer />
            <FooterBottom />
        </div>
    );
}
