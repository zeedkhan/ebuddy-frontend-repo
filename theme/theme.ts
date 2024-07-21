import { createTheme, PaletteMode } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});


export const darkTheme = createTheme({
    palette: {
        mode: 'dark' as PaletteMode,
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light' as PaletteMode,
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});