"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from "./theme";
import ThemeContext from "./context";
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from "@mui/material";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<PaletteMode>("light");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loadTheme = localStorage.getItem('theme') as PaletteMode || 'light';
            if (!!loadTheme) {
                setTheme(loadTheme);
            }
        }
    }, []);

    const themeMode = useMemo(() => ({
        toggleTheme: () => {
            setTheme((prevTheme) => {
                const newTheme = prevTheme === 'light' ? 'dark' : 'light'
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("theme", newTheme)
                }
                return newTheme;
            });
        },
        theme: theme,
    }), [theme]);

    const appliedTheme = theme === 'light' ? lightTheme : darkTheme;


    return (
        <ThemeContext.Provider value={themeMode}>
            <MuiThemeProvider theme={appliedTheme}>
                {children}
                <CssBaseline />
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
};