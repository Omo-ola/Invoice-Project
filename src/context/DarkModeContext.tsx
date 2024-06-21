import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { ChildrenProps } from "../types/Interface";
export type DarkModeContextType = {
  isDark: boolean;
  toggleDarkMode: () => void;
};
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

function DarkModeProvider({ children }: ChildrenProps) {
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
    setIsDark((isDark: string) => !isDark);
  }
  return (
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
