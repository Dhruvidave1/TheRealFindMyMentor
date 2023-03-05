import React, { useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSessionStorageState } from "../hooks/useSessionStorageState";

export const DarkModeContext = createContext();

export function DarkModeProvider(props) {
  const [darkMode, setDarkMode] = useSessionStorageState("darkMode", false);
  const contextValue = useMemo(() => {
    return { darkMode, setDarkMode };
  }, [darkMode, setDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <DarkModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}
