import create from 'zustand';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(set => ({
  theme: 'light',
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === Theme.Dark ? Theme.Light : Theme.Dark,
    })),
}));
