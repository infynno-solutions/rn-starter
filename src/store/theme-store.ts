import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {DarkTheme, DefaultTheme} from '../styles/themes';

interface ThemeSlice {
  theme: any;
  changeTheme: (theme: string) => void;
  resetTheme: () => void;
}

const initialState = {
  theme: DefaultTheme,
};

export const useThemeStore = create<ThemeSlice>()(
  persist(
    set => ({
      ...initialState,
      changeTheme: (theme: any) =>
        set(() => ({theme: theme === 'Dark' ? DarkTheme : DefaultTheme})),
      resetTheme: () => set(() => initialState),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
