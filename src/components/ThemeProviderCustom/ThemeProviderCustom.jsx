import { ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../../theme.js';

const ThemeContext = createContext(null);

export const ThemeProviderCustom = ({ children }) => {
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem('theme') || 'light',
    );

    useEffect(() => {
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProviderCustom;
