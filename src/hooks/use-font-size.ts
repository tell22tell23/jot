import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FontSizeState {
    fontSize: number;
    setFontSize: (size: number) => void;
}

export const useFontSize = create<FontSizeState>()(
    persist(
        (set) => ({
            fontSize: 18,
            setFontSize: (fontSize) => set({ fontSize }),
        }),
        {
            name: "font-size",
        }
    )
);
