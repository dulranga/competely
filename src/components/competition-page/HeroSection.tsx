"use client"

import Image from "next/image"
import { Badge } from "~/components/ui/badge"

export function HeroSection() {
    return (
        <section className="relative w-full h-[300px] md:h-[400px] bg-muted">
            {/* Background Image - Pure, no gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center" />
            </div>

            {/* Upcoming Badge */}
            <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-bold uppercase rounded-sm">
                    Upcoming
                </Badge>
            </div>

            {/* Logo Overlay - Positioned to overlap the bottom edge */}
            <div className="relative w-full h-full max-w-7xl mx-auto z-20 pointer-events-none">
                <div className="absolute -bottom-16 right-4 md:right-10 pointer-events-auto">
                    <div className="text-center flex flex-col items-center">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-background rounded-full flex items-center justify-center p-1 border border-border shadow-xl">
                            {/* Logo Image */}
                            <div className="w-full h-full relative flex items-center justify-center bg-background rounded-full overflow-hidden">
                                <Image
                                    src="https://ui-avatars.com/api/?name=Tec+Dev&background=0D8ABC&color=fff&size=128"
                                    alt="Tec Dev Club"
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-xs md:text-sm font-medium text-muted-foreground hidden md:block">Tec Dev club</p>
                        <p className="text-[10px] text-muted-foreground hidden md:block">University of colombia</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
