import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import checkDefaultTheme from '../../utils/theme';
import type { GlobalContextType } from '../../interfaces';

const HomeLayout = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(checkDefaultTheme());

  const toggleDarkTheme = (): void => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme.toString());
  };

  const globalContext: GlobalContextType = {
    isDarkTheme,
    toggleDarkTheme,
  };

  return (
    <>
      <Outlet context={globalContext} />
    </>
  );
};

export default HomeLayout;
