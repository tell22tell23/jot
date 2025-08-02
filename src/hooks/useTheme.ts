import { useEffect, useState } from "react";

type THEME = "light" | "dark" | "sepia";

export function useTheme() {
    const [theme, setTheme] = useState<THEME>("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "sepia") {
            setTheme(stored);
            applyTheme(stored);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const defaultTheme: THEME = prefersDark ? "dark" : "light";
            setTheme(defaultTheme);
            applyTheme(defaultTheme);
        }
    }, []);

    const applyTheme = (mode: THEME) => {
        const root = document.documentElement;
        root.classList.remove("dark", "sepia");
        if (mode !== "light") {
            root.classList.add(mode);
        }
        localStorage.setItem("theme", mode);
    }

    const setNewTheme = (mode: THEME) => {
        setTheme(mode);
        applyTheme(mode);
    };

    return { theme, setTheme: setNewTheme };
}
