"use client";

import { X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

export function FilterSidebar() {
    return (
        <div className="w-64 shrink-0 space-y-8 bg-card p-1">
            {/* Keywords Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-foreground/80 text-sm tracking-wide">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                    {["C#", "Web Dev", "Rotract"].map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-normal text-muted-foreground hover:bg-muted/80"
                        >
                            {tag}
                            <X className="h-3 w-3 cursor-pointer hover:text-foreground" />
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Registered Slider (Custom Implementation) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground/80 text-sm tracking-wide">Registered</h3>
                    <span className="text-xs text-muted-foreground">0-100</span>
                </div>
                <div className="relative h-1.5 w-full rounded-full bg-muted">
                    <div className="absolute left-0 top-0 h-full w-full rounded-full bg-muted-foreground/30">
                        {/* This would be a real Slider component in prod */}
                        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-border bg-background shadow-sm" />
                        <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-border bg-foreground shadow-sm" />
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="space-y-4">
                <h3 className="font-semibold text-foreground/80 text-sm tracking-wide">Category</h3>
                <div className="space-y-3">
                    {["Open", "University", "School"].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${item}`} />
                            <Label
                                htmlFor={`cat-${item}`}
                                className="text-sm font-normal text-muted-foreground peer-data-[state=checked]:text-foreground"
                            >
                                {item}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mode */}
            <div className="space-y-4">
                <h3 className="font-semibold text-foreground/80 text-sm tracking-wide">Mode</h3>
                <div className="space-y-3">
                    {["Physical", "Online", "Hybrid"].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={`mode-${item}`} />
                            <Label
                                htmlFor={`mode-${item}`}
                                className="text-sm font-normal text-muted-foreground peer-data-[state=checked]:text-foreground"
                            >
                                {item}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full bg-slate-700 text-white hover:bg-slate-800 rounded-full mt-4">
                Apply Filters
            </Button>
        </div>
    );
}
