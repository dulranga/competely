"use client";

import { FC, useState, useMemo } from "react";
import { User, Shield, MoreHorizontal, Mail, Search } from "lucide-react";

const UsersPage: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const delegates = [
        { name: "John Doe", email: "john@example.com", role: "Delegate", status: "Active" },
        { name: "Sarah Smith", email: "sarah@stanford.edu", role: "Delegate", status: "Pending" },
        { name: "Alex Johnson", email: "alex@mit.edu", role: "Admin", status: "Active" },
        { name: "Emily Davis", email: "emily@harvard.edu", role: "Delegate", status: "Active" },
    ];

    // Filter users based on search query
    const filteredDelegates = useMemo(() => {
        if (!searchQuery.trim()) return delegates;
        const query = searchQuery.toLowerCase();
        return delegates.filter(user => 
            user.name.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="space-y-12 max-w-6xl">
            <div className="flex items-end justify-between gap-4">
                <div className="grid gap-3">
                    <h1 className="text-3xl font-black tracking-tight text-[#0c0803]">Management</h1>
                    <p className="text-[#0c0803]/50 text-base max-w-xl leading-relaxed">
                        Control user access and coordinate with your Organizing Committee. Review delegate profiles and
                        manage roles.
                    </p>
                </div>

                <div className="w-64 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0c0803]/30" size={16} />
                    <input
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-[#e8e2de]/60 text-sm focus:outline-none focus:border-[#e5ab7d]"
                        placeholder="Search delegates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-3xl bg-white border border-[#e8e2de]/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#e8e2de]/40">
                            {["User", "Role", "Status", "Actions"].map((th) => (
                                <th
                                    key={th}
                                    className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#0c0803]/30"
                                >
                                    {th}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8e2de]/40">
                        {filteredDelegates.length > 0 ? (
                            filteredDelegates.map((d, i) => (
                                <tr key={i} className="group hover:bg-[#fbf6f3]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#fbf6f3] border border-[#e8e2de]/40 flex items-center justify-center text-[#0c0803]/40">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-[#0c0803]">{d.name}</div>
                                                <div className="text-[11px] text-[#0c0803]/40">{d.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-xs text-[#0c0803]">
                                        <div className="flex items-center gap-2">
                                            {d.role === "Admin" && <Shield size={12} className="text-[#e5ab7d]" />}
                                            {d.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                                                d.status === "Active"
                                                    ? "bg-[#bcde8c]/10 text-[#0c0803]/60 border-[#bcde8c]/20"
                                                    : "bg-[#fbf6f3] text-[#0c0803]/40 border border-[#e8e2de]/60"
                                            }`}
                                        >
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white border border-transparent hover:border-[#e8e2de]/60 text-[#0c0803]/30 hover:text-[#0c0803] transition-all ml-auto">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-[#0c0803]/40">
                                    No delegates found matching "{searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
