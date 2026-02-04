export function CTASection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden bg-[#0c0803] rounded-3xl p-16 text-center text-[#fbf6f3] shadow-2xl">
                    {/* Decorative blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent rounded-full blur-3xl opacity-20"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready to Start Coding?</h2>
                        <p className="text-xl text-[#fbf6f3]/70 mb-10 max-w-2xl mx-auto font-medium">
                            Join hundreds of developers in the most exciting coding competition of 2026.
                        </p>
                        <button className="px-10 py-5 bg-primary text-[#0c0803] font-bold rounded-2xl shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 text-lg">
                            Register Your Team
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
