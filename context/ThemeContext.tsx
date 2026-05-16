import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: typeof Colors.light;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  mode: 'system',
  setMode: () => {},
  colors: Colors.light,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const theme = mode === 'system' ? (systemColorScheme ?? 'light') : mode;
  const colors = Colors[theme];
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
