"use client";

import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import type { Categories } from './types';

interface CategoryFilterProps {
    categories?: Categories;
    onCategoriesChange?: (categories: Categories) => void;
}

const categoryItems = [
    { id: "open", label: "Open" },
    { id: "university", label: "University" },
    { id: "school", label: "School" },
    { id: "other", label: "Other" }
];

export function CategoryFilter({ categories, onCategoriesChange }: CategoryFilterProps) {
    const [internalCategories, setInternalCategories] = useState<Categories>({
        open: true,
        university: true,
        school: true,
        other: true
    });

    const currentCategories = categories || internalCategories;

    return (
        <div className="space-y-3">
            <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Category</h3>
            <div className="space-y-2.5">
                {categoryItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5">
                        <Checkbox
                            id={`cat-${item.id}`}
                            className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                            checked={currentCategories[item.id as keyof Categories]}
                            onCheckedChange={(checked) => {
                                const newCategories = { ...currentCategories, [item.id]: !!checked } as Categories;
                                if (onCategoriesChange) {
                                    onCategoriesChange(newCategories);
                                } else {
                                    setInternalCategories(newCategories);
                                }
                            }}
                        />
                        <Label
                            htmlFor={`cat-${item.id}`}
                            className="text-xs font-normal cursor-pointer select-none text-gray-600"
                        >
                            {item.label}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
