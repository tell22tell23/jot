import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Font } from "@/types";

interface FontState {
    font: Font;
    setFont: (font: Font) => void;
}

export const useFontStore = create<FontState>()(
    persist(
        (set) => ({
            font: "sans",
            setFont: (font) => set({ font }),
        }),
        {
            name: "font-storage",
        }
    )
);
