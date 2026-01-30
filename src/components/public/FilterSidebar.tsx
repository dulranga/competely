"use client";

import { X, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export function FilterSidebar({ className }: { className?: string }) {
    const [keywords, setKeywords] = useState(["C#", "Web Dev", "Rotract"]);
    const [newKeyword, setNewKeyword] = useState("");

    // Status State
    const [statusFilters, setStatusFilters] = useState({
        upcoming: true,
        ongoing: true,
        closed: true,
        registered: true,
        bookmarked: true
    });

    // Category State
    const [categories, setCategories] = useState({
        open: true,
        university: true,
        school: true
    });

    // Mode State
    const [modes, setModes] = useState({
        physical: true,
        online: true,
        hybrid: true
    });

    // Registered Range
    const [registeredRange, setRegisteredRange] = useState([0, 100]);

    const removeKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    const addKeyword = () => {
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addKeyword();
        }
    };

    return (
        <div className={cn("w-64 shrink-0 bg-white rounded-xl shadow-sm border border-border/40 p-5 space-y-7", className)}>
            {/* Keywords Section */}
            <div className="space-y-3">
                <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                    {keywords.map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            {tag}
                            <X
                                className="h-3 w-3 cursor-pointer text-gray-500 hover:text-black"
                                onClick={() => removeKeyword(tag)}
                            />
                        </div>
                    ))}
                    <div className="relative w-full mt-1">
                        <Input
                            className="h-8 text-xs pr-8"
                            placeholder="Add keyword..."
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Plus
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-black"
                            onClick={addKeyword}
                        />
                    </div>
                </div>
            </div>

            {/* Status Section */}
            <div className="space-y-3">
                <div className="space-y-2.5">
                    {[
                        { id: 'upcoming', label: 'Upcoming' },
                        { id: 'ongoing', label: 'Ongoing' },
                        { id: 'closed', label: 'Closed' },
                        { id: 'registered', label: 'Registered' },
                        { id: 'bookmarked', label: 'Bookmarked' },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                            <Checkbox
                                id={item.id}
                                className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                                checked={statusFilters[item.id as keyof typeof statusFilters]}
                                onCheckedChange={(checked) =>
                                    setStatusFilters(prev => ({ ...prev, [item.id]: !!checked }))
                                }
                            />
                            <Label
                                htmlFor={item.id}
                                className="text-sm font-normal text-gray-600 cursor-pointer"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registered Range Slider */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700 text-sm">Registered</h3>
                    <span className="text-xs text-gray-500 font-medium">
                        {registeredRange[0]}-{registeredRange[1]}
                    </span>
                </div>
                <div className="pt-2">
                    <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={registeredRange}
                        onValueChange={setRegisteredRange}
                        className="py-1"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
                <h3 className="font-medium text-gray-700 text-sm">Category</h3>
                <div className="space-y-2.5">
                    {[
                        { id: 'open', label: 'Open' },
                        { id: 'university', label: 'University' },
                        { id: 'school', label: 'School' },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                            <Checkbox
                                id={`cat-${item.id}`}
                                className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                                checked={categories[item.id as keyof typeof categories]}
                                onCheckedChange={(checked) =>
                                    setCategories(prev => ({ ...prev, [item.id]: !!checked }))
                                }
                            />
                            <Label
                                htmlFor={`cat-${item.id}`}
                                className="text-sm font-normal text-gray-600 cursor-pointer"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mode */}
            <div className="space-y-3">
                <h3 className="font-medium text-gray-700 text-sm">Mode</h3>
                <div className="space-y-2.5">
                    {[
                        { id: 'physical', label: 'Physical' },
                        { id: 'online', label: 'Online' },
                        { id: 'hybrid', label: 'Hybrid' },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                            <Checkbox
                                id={`mode-${item.id}`}
                                className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                                checked={modes[item.id as keyof typeof modes]}
                                onCheckedChange={(checked) =>
                                    setModes(prev => ({ ...prev, [item.id]: !!checked }))
                                }
                            />
                            <Label
                                htmlFor={`mode-${item.id}`}
                                className="text-sm font-normal text-gray-600 cursor-pointer"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full bg-[#404b5c] hover:bg-[#323c4a] text-white rounded-full h-10 font-medium tracking-wide mt-2 shadow-[0_4px_14px_0_rgba(64,75,92,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(64,75,92,0.23)] hover:-translate-y-0.5 active:translate-y-0">
                Apply Filters
            </Button>
        </div>
    );
}
