import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import useAuth from "../hooks/useAuth";

function ThemeSetting({ children }: { children: React.ReactNode }) {
  const userData = useAuth();
  const theme = createTheme({
    palette: {
      primary: {
        // light: "#B793FD",
        main: userData?.color || "#7C4BF9",
        // main: "#7C4BF9",
        // dark: "#4525B3",
        contrastText: "white",
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeSetting;
