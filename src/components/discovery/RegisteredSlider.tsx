"use client";

import { useState } from "react";
import { Slider } from "~/components/ui/slider";

interface RegisteredSliderProps {
    registeredRange?: [number, number];
    onRegisteredRangeChange?: (range: [number, number]) => void;
}

export function RegisteredSlider({ registeredRange, onRegisteredRangeChange }: RegisteredSliderProps) {
    const [internalRange, setInternalRange] = useState<[number, number]>([0, 1000]);
    const currentRange = registeredRange || internalRange;

    return (
        <div className="space-y-3">
            <h3 className="font-medium text-foreground text-sm tracking-wide text-gray-700">Registered</h3>
            <div className="space-y-3">
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={[currentRange[0], currentRange[1]]}
                    onValueChange={(value) => {
                        const newRange: [number, number] = [value[0] || 0, value[1] || 1000];
                        if (onRegisteredRangeChange) {
                            onRegisteredRangeChange(newRange);
                        } else {
                            setInternalRange(newRange);
                        }
                    }}
                    className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{currentRange[0]}</span>
                    <span>{currentRange[1]}+</span>
                </div>
            </div>
        </div>
    );
}
