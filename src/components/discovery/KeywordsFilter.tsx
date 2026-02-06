"use client";

import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface KeywordsFilterProps {
    keywords?: string[];
    onKeywordsChange?: (keywords: string[]) => void;
}

export function KeywordsFilter({ keywords, onKeywordsChange }: KeywordsFilterProps) {
    const [internalKeywords, setInternalKeywords] = useState<string[]>([]);
    const [newKeyword, setNewKeyword] = useState("");

    const currentKeywords = keywords || internalKeywords;
    
    console.log('KeywordsFilter render:', { keywords, currentKeywords, hasOnKeywordsChange: !!onKeywordsChange }); // Debug log

    const removeKeyword = (keyword: string) => {
        const newKeywords = currentKeywords.filter(k => k !== keyword);
        console.log('Removing keyword:', keyword, 'new keywords array:', newKeywords); // Debug log
        if (onKeywordsChange) {
            onKeywordsChange(newKeywords);
        } else {
            setInternalKeywords(newKeywords);
        }
    };

    const addKeyword = () => {
        if (newKeyword.trim() && !currentKeywords.includes(newKeyword.trim())) {
            const newKeywords = [...currentKeywords, newKeyword.trim()];
            console.log('Adding keyword:', newKeyword.trim(), 'new keywords array:', newKeywords); // Debug log
            if (onKeywordsChange) {
                onKeywordsChange(newKeywords);
            } else {
                setInternalKeywords(newKeywords);
            }
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
        <div className="space-y-3">
            <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {currentKeywords.map((tag) => (
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-gray-500 hover:text-black"
                        onClick={addKeyword}
                    />
                </div>
            </div>
        </div>
    );
}
