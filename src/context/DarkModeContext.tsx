import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext("dark-mode");

function DarkModeProvider({ children }: any) {
  const [isDark, setIsDark] = useLocalStorageState(true, "isDarkMode");

  useEffect(
    function () {
      if (!isDark) {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      }
    },
    [isDark]
  );
  function toggleDarkMode() {
    setIsDark((isDark: any) => !isDark);
  }

  return (
    // @ts-ignore
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkMode context was used outside of darkMode provider");
  return context;
}

export { DarkModeProvider, useDarkMode };
