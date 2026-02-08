"use client"

export function CountdownSection() {
    return (
        <div className="py-8">
            <div className="flex items-center gap-4 md:gap-8">
                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            0
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            3
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">Days</p>
                </div>

                <div className="text-6xl md:text-8xl font-black pb-12 text-foreground">:</div>

                <div className="text-center">
                    <div className="flex gap-2">
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            1
                        </div>
                        <div className="bg-primary text-primary-foreground text-6xl md:text-8xl font-black p-4 md:p-6 rounded-lg w-20 md:w-32 flex items-center justify-center shadow-sm">
                            2
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4 uppercase tracking-widest text-foreground">Hours</p>
                </div>
            </div>
        </div>
    )
}
