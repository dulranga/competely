import { FC } from "react";
import { Plus, FileText, Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getUserSession } from "~/data-access/getCurrentUser";
import { getFormsByUser } from "~/data-access/forms";

const FormsListPage: FC = async () => {
    const session = await getUserSession();
    const forms = await getFormsByUser(session.user.id);

    return (
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <div className="grid gap-6">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">My Forms</h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        Manage your competition registration forms and delegate surveys.
                    </p>
                </div>

                <Link
                    href="/dashboard/forms/new"
                    className="h-16 px-10 rounded-2xl bg-[#0c0803] text-white font-black text-lg flex items-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
                >
                    <Plus size={24} /> Create New Form
                </Link>
            </div>

            {forms.length === 0 ? (
                <div className="rounded-[4rem] bg-white border-4 border-dashed border-[#e8e2de] flex flex-col items-center justify-center p-32 gap-8">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-[#fbf6f3] flex items-center justify-center text-[#0c0803]/20">
                        <FileText size={48} />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-[#0c0803]">No Forms Created</h3>
                        <p className="text-[#0c0803]/40 text-lg max-w-md">
                            You haven't built any forms yet. Start by creating a registration gateway for your
                            delegates.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {forms.map((form) => (
                        <Link
                            key={form.id}
                            href={`/dashboard/forms/${form.id}`}
                            className="group p-10 rounded-[3rem] bg-white border border-[#e8e2de] hover:border-[#e5ab7d] hover:shadow-xl transition-all flex flex-col justify-between aspect-square"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-[#fbf6f3] flex items-center justify-center group-hover:bg-[#e5ab7d]/10 group-hover:text-[#e5ab7d] transition-colors border border-[#e8e2de]/50">
                                    <FileText size={28} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                            form.published
                                                ? "bg-[#bcde8c]/20 text-[#0c0803]"
                                                : "bg-[#fbf6f3] text-[#0c0803]/40 border border-[#e8e2de]"
                                        }`}
                                    >
                                        {form.published ? "Live" : "Draft"}
                                    </span>
                                    <button className="p-3 text-[#0c0803]/20 hover:text-[#0c0803] transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-3xl font-black text-[#0c0803] leading-tight line-clamp-2">
                                    {form.name}
                                </h3>
                                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#0c0803]/40">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} /> {new Date(form.createdAt).toLocaleDateString()}
                                    </span>
                                    <span>•</span>
                                    <span>{form.fields.length} Fields</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormsListPage;
