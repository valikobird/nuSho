import { type Context, createContext, useContext } from 'react';
import type { GlobalContextType } from '../interfaces';

export const GlobalContext: Context<GlobalContextType> = createContext<GlobalContextType>({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
