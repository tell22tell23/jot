"use client";

import { useFontSize } from "@/hooks/use-font-size";
import { useFont } from "@/hooks/use-font";
import { cn } from "@/lib/utils";
import { useFileStore } from "@/hooks/use-file-store";

export default function Textarea() {
    const { font } = useFont();
    const { fontSize } = useFontSize();
    const { setFileContent, getFileContent, currentFileId } = useFileStore();
    if (!currentFileId) {
        return <div className="text-center text-muted-foreground py-4 text-sm">No file selected</div>;
    }

    const file = getFileContent(currentFileId);

    return (
        <div className="overflow-hidden h-full">
            <div className="h-full relative shadow-inner-border rounded-sm bg-card pt-9">
                <div className="absolute origin-top-right bg-background w-[200px] h-9 right-0 top-0 border-l border-l-border border-b border-b-border rounded-bl-sm flex items-center justify-start px-4">
                    <span className="truncate text-sm">{file?.title}</span>
                    <div className="absolute bg-background w-2 h-2 top-0 -left-2">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                    <div className="absolute bg-background w-2 h-2 -bottom-2 right-0">
                        <div className="w-full h-full rounded-tr-full bg-card border-t border-r border-t-border border-r-border"/>
                    </div>
                </div>
                { file ? (
                    <textarea
                        value={file?.content || ""}
                        onChange={(e) => {
                            const content = e.target.value;
                            setFileContent(file.id, { ...file, content });
                        }}
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
                ) : (
                        <p className="py-2 px-6 text-muted-foreground text-sm pt-4">
                            No file content available. Please select a file.
                        </p>
                    )}
            </div>
        </div>
    );
}
