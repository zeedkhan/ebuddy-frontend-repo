"use clinet";

import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import useTheme from './useTheme';

const ToggleTheme = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();


    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {theme === 'light' ? <LightMode /> : <DarkMode />}
        </IconButton>
    );
};

export default ToggleTheme;