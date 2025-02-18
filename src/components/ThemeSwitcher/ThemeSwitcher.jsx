import { useThemeContext } from '../ThemeProviderCustom/ThemeProviderCustom';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

const ThemeSwitcher = () => {
    const { themeMode, toggleTheme } = useThemeContext();

    return (
        <IconButton
            aria-label="theme switcher"
            size="large"
            onClick={toggleTheme}
        >
            {themeMode === 'dark' ? (
                <LightModeIcon fontSize="inherit" />
            ) : (
                <ModeNightIcon fontSize="inherit" />
            )}
        </IconButton>
    );
};

export default ThemeSwitcher;
