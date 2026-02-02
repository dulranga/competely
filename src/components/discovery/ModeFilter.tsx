"use client";

import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import type { Modes } from './types';

interface ModeFilterProps {
    modes?: Modes;
    onModesChange?: (modes: Modes) => void;
}

const modeItems = [
    { id: "physical", label: "Physical" },
    { id: "online", label: "Online" },
    { id: "hybrid", label: "Hybrid" }
];

export function ModeFilter({ modes, onModesChange }: ModeFilterProps) {
    const [internalModes, setInternalModes] = useState<Modes>({
        physical: true,
        online: true,
        hybrid: true
    });

    const currentModes = modes || internalModes;

    return (
        <div className="space-y-3">
            <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Mode</h3>
            <div className="space-y-2.5">
                {modeItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5">
                        <Checkbox
                            id={`mode-${item.id}`}
                            className="rounded-[4px] border-gray-500 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                            checked={currentModes[item.id as keyof Modes]}
                            onCheckedChange={(checked) => {
                                const newModes = { ...currentModes, [item.id]: !!checked } as Modes;
                                if (onModesChange) {
                                    onModesChange(newModes);
                                } else {
                                    setInternalModes(newModes);
                                }
                            }}
                        />
                        <Label
                            htmlFor={`mode-${item.id}`}
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
