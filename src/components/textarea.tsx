"use client";

import { useFontSizeStore } from "@/hooks/use-font-size";
import { useFontStore } from "@/hooks/use-font-store";
import { cn } from "@/lib/utils";

export default function Textarea() {
    const { font } = useFontStore();
    const { fontSize } = useFontSizeStore();

    return (
        <div className="overflow-hidden h-full">
            <div className="h-full relative shadow-inner-border rounded-sm bg-card pt-9">
                <div className="absolute origin-top-right bg-background w-[200px] h-9 right-0 top-0 border-l border-l-border border-b border-b-border rounded-bl-sm flex items-center justify-start px-4">
                    <span>Untitled</span>
                    <div className="absolute bg-background w-2 h-2 top-0 -left-2">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                    <div className="absolute bg-background w-2 h-2 -bottom-2 right-0">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                </div>
                <textarea
                    style={{
                        fontFamily:
                        font === "sans"
                            ? "var(--font-geist-sans)"
                            : font === "serif"
                                ? "var(--font-source-serif)"
                                : "var(--font-geist-mono)",
                        fontSize: `${fontSize}px`,
                    }}
                    className={cn(
                        "focus-visible:outline-0 focus-visible:ring-0 w-full h-full py-2 px-6 resize-none leading-[1.5] text-foreground",
                    )}
                    aria-label="Text input area"
                />
            </div>
        </div>
    );
}
