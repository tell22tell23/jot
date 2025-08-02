"use client";

import { useFontStore } from "@/hooks/use-font-store";
import { cn } from "@/lib/utils";

export default function TextArea() {
    const { font } = useFontStore();
    return (
        <div className="overflow-hidden h-full">
            <div className="h-full relative shadow-inner-border rounded-sm bg-card">
                <div className="absolute origin-top-right bg-background w-[200px] h-9 right-0 top-0 border-l border-l-border border-b border-b-border rounded-bl-sm">
                    <div className="absolute bg-background w-2 h-2 top-0 -left-2">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                    <div className="absolute bg-background w-2 h-2 -bottom-2 right-0">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
