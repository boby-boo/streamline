import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8d8dda',
            secondary: '#8d8dda47',
            header: '#d5d5ff',
            extraLight: '#d5d5ff69',
        },
        secondary: {
            main: '#f5f5f5',
            hover: '#f5f5f5b8',
        },
        light: {
            main: '#aa656a',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        warning: {
            main: '#ff9500',
            light: '#dc9a33',
        },
        text: {
            primary: 'rgba(18,18,18,0.87)',
            secondary: 'rgba(18,18,18,0.6)',
            disabled: 'rgba(107,95,95,0.38)',
            hint: '#6d6d6d',
        },
        info: {
            main: '#428caf',
        },
        divider: 'rgba(0,0,0,0.12)',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8d8dda',
            secondary: '#8d8dda47',
            header: '#404075',
            light: '#6a6ab3', // Трохи темніший варіант основного кольору
            extraLight: '#6a6ab369', // Напівпрозорий варіант
        },
        secondary: {
            main: '#363349', // Темний фон для карток
            hover: '#3b3753', // Трохи світліший при наведенні
        },
        light: {
            main: '#aa656a',
        },
        background: {
            default: '#0d0d10', // Головний темний фон
            paper: '#1e1e1e', // Темніші блоки
        },
        warning: {
            main: '#ff9500', // Не змінюємо, щоб зберегти яскравість
            light: '#dc9a33',
        },
        text: {
            primary: 'rgba(243,237,237,0.87)', // Світлий текст
            secondary: 'rgba(243,237,237,0.6)', // Трохи менш контрастний текст
            disabled: 'rgba(200,200,200,0.38)', // Приглушений текст
            hint: '#cacada', // Сірий відтінок підказок
        },
        info: {
            main: '#428caf', // Відповідає світлій темі
        },
        divider: 'rgba(255,255,255,0.12)', // Тонкі світлі роздільники
    },
});
