"use client";

import { useFontStore } from "@/hooks/use-font-store";
import { cn } from "@/lib/utils";

export default function TextArea() {
    const { font } = useFontStore();
    console.log(font);
    return (
        <textarea
            style={{ fontFamily: font === "sans" ? "var(--font-geist-sans)" : font === "serif" ? "var(--font-source-serif)" : "var(--font-geist-mono)" }}
            className={cn("light:bg-transparent dark:bg-transparent shadow-none focus-visible:outline-0 focus-visible:ring-0 rounded-none border-none w-full h-full p-4 resize-none")}
        />
    );
}
