import { FC } from "react";
import { MousePointer2, Type, Hash, CheckSquare, Plus } from "lucide-react";

const FormBuilderPage: FC = () => {
    const components = [
        { name: "Short Answer", icon: Type },
        { name: "Long Text", icon: FileText },
        { name: "Numeric Only", icon: Hash },
        { name: "Multiple Choice", icon: CheckSquare },
    ];

    function FileText({ size }: { size: number }) {
        return <div className={`w-[${size}px] h-[${size}px] border-2 border-current rounded-sm opacity-60`} />;
    }

    return (
        <div className="space-y-12 h-full flex flex-col">
            <div className="grid gap-6">
                <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Form Builder</h1>
                <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                    Design custom registration forms and surveys. Drag and drop components to build the perfect entry
                    gateway.
                </p>
            </div>

            <div className="flex-1 flex gap-10 items-stretch min-h-[600px]">
                {/* Toolbox */}
                <div className="w-80 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-[#e8e2de] p-8 space-y-6 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#0c0803]/40">
                            Field Library
                        </h3>
                        <div className="grid gap-4">
                            {components.map((c, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-5 rounded-3xl bg-[#fbf6f3] border border-transparent hover:border-[#e5ab7d] transition-all cursor-grab active:scale-95 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0c0803]/60 group-hover:text-[#e5ab7d] group-hover:shadow-sm">
                                        <c.icon size={20} />
                                    </div>
                                    <span className="font-bold text-[#0c0803]">{c.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 rounded-[4rem] bg-white border-4 border-dashed border-[#e8e2de] flex flex-col items-center justify-center p-20 gap-8 hover:border-[#e5ab7d] transition-colors group cursor-pointer overflow-hidden relative">
                    <div className="w-20 h-20 rounded-[2rem] bg-[#fbf6f3] flex items-center justify-center text-[#0c0803]/20 group-hover:scale-110 group-hover:text-[#e5ab7d] transition-all">
                        <Plus size={40} />
                    </div>
                    <div className="text-center space-y-2 relative z-10">
                        <h3 className="text-2xl font-black text-[#0c0803]">Drop Components Here</h3>
                        <p className="text-[#0c0803]/40 text-lg">
                            Click or drag a field from the library to start building your form.
                        </p>
                    </div>

                    {/* Background Visual Mockup */}
                    <div className="absolute inset-0 p-10 flex flex-col gap-6 opacity-[0.03] grayscale group-hover:scale-105 transition-transform">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-black rounded-3xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormBuilderPage;
