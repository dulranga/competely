import { FC } from "react";
import { User, Shield, MoreHorizontal, Mail, Search } from "lucide-react";

const UsersPage: FC = () => {
    const delegates = [
        { name: "John Doe", email: "john@example.com", role: "Delegate", status: "Active" },
        { name: "Sarah Smith", email: "sarah@stanford.edu", role: "Delegate", status: "Pending" },
        { name: "Alex Johnson", email: "alex@mit.edu", role: "Admin", status: "Active" },
        { name: "Emily Davis", email: "emily@harvard.edu", role: "Delegate", status: "Active" },
    ];

    return (
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <div className="grid gap-6">
                    <h1 className="text-5xl font-black tracking-tight text-[#0c0803]">Management</h1>
                    <p className="text-[#0c0803]/60 text-xl max-w-2xl leading-relaxed">
                        Control user access and coordinate with your Organizing Committee. Review delegate profiles and
                        manage roles.
                    </p>
                </div>

                <div className="w-80 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0c0803]/40" size={20} />
                    <input
                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-[#e8e2de] focus:outline-none focus:border-[#e5ab7d]"
                        placeholder="Search delegates..."
                    />
                </div>
            </div>

            <div className="rounded-[3.5rem] bg-white border border-[#e8e2de] shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#e8e2de]">
                            {["User", "Role", "Status", "Actions"].map((th) => (
                                <th
                                    key={th}
                                    className="px-10 py-8 text-xs font-black uppercase tracking-widest text-[#0c0803]/40"
                                >
                                    {th}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8e2de]">
                        {delegates.map((d, i) => (
                            <tr key={i} className="group hover:bg-[#fbf6f3] transition-colors cursor-pointer">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#bcde8c] to-[#6dd594] flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-sm">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#0c0803]">{d.name}</div>
                                            <div className="text-sm text-[#0c0803]/40">{d.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-6 font-bold text-[#0c0803]">
                                    <div className="flex items-center gap-2">
                                        {d.role === "Admin" && <Shield size={14} className="text-[#e5ab7d]" />}
                                        {d.role}
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                            d.status === "Active"
                                                ? "bg-[#bcde8c]/20 text-[#0c0803]"
                                                : "bg-[#fbf6f3] text-[#0c0803]/40 border border-[#e8e2de]"
                                        }`}
                                    >
                                        {d.status}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-[#0c0803]/40 hover:text-[#0c0803] transition-all">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
