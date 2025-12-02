import React, { createContext, useMemo, useState, useContext, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ColorModeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => { },
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem("theme") as ThemeMode) || "light"
  );

  const colorMode = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prevMode) => {
          const next = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#f5c518", // IMDb yellow
            contrastText: "#000",
          },
          secondary: {
            main: mode === "light" ? "#000" : "#f5c518",
          },
          info: {
            main: mode === "light" ? "#0E63BE" : "#5799EF"
          },
          background: {
            default: mode === "light" ? "#fafafa" : "#0f0f0f",
            paper: mode === "light" ? "#ffffff" : "#1c1c1c",
          },
          text: {
            primary: mode === "light" ? "#000" : "#fff",
            secondary: mode === "light" ? "#0000008a" : "#ccc",
          },
        },
        typography: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          h6: {
            fontWeight: 700,
          },
          body1: {
            fontSize: "1rem",
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "light" ? "#f5c518" : "#1c1c1c",
                color: mode === "light" ? "#000" : "#f5c518",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              containedPrimary: {
                color: "#000",
                fontWeight: 600,
              },
            },
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1024,
            xl: 1200,
          },
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
