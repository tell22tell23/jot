"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useFontStore } from "@/hooks/use-font-store";
import { type Font } from "@/types";
import { Slider } from "../ui/slider";
import { useFontSizeStore } from "@/hooks/use-font-size";

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

type Theme = "light" | "dark" | "sepia";

export function Footer() {
    const { theme, setTheme } = useTheme();
    const { font, setFont } = useFontStore();
    const { fontSize, setFontSize } = useFontSizeStore();
    const myThemes: Theme[] = ["light", "dark", "sepia"];
    const myFonts: Font[] = ["sans", "serif", "mono"];

    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }, 60 * 1000); // Update every minute

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    return (
        <footer className="w-full px-5 py-3 flex items-center gap-x-4">
            <span className="text-sm text-muted-foreground">
                {time}
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-x-4 px-3 py-1 rounded-md border border-border focus-visible:outline-none focus-visible:border-foreground">
                    <span className="text-sm">{capitalize(theme as string)}</span>
                    <ChevronDown className="text-foreground size-3 font-bold" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {myThemes.map((t) => {
                        if (t === theme) return null;
                        return (
                            <DropdownMenuItem
                                key={t}
                                onClick={() => setTheme(t)}
                                className="cursor-pointer hover:bg-gray-700"
                            >
                                {capitalize(t)}
                            </DropdownMenuItem>
                        )}
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-x-4 px-3 py-1 rounded-md border border-border focus-visible:outline-none focus-visible:border-foreground">
                    <span className="text-sm">{capitalize(font)}</span>
                    <ChevronDown className="text-foreground size-3 font-bold" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {myFonts.map((f) => {
                        if (f === font) return null;
                        return (
                            <DropdownMenuItem
                                key={f}
                                onClick={() => setFont(f)}
                                className="cursor-pointer hover:bg-gray-700"
                            >
                                {capitalize(f)}
                            </DropdownMenuItem>
                        )}
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-x-2">
                <Slider
                    defaultValue={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    max={32}
                    min={12}
                    step={1}
                    className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                    {fontSize} px
                </span>
            </div>
        </footer>
    );
}
