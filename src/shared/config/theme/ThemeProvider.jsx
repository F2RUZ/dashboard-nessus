// src/shared/config/theme/ThemeProvider.jsx
"use client";

import * as React from "react";
// MUI Material/Core o'rniga MUI Joy UI dan kerakli narsalarni import qilamiz
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import IconButton from "@mui/joy/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

// Bu joyda sizda Light/Dark mode borligi uchun Navbar.jsx dan olib kelgan toggle mantiqini qo'yamiz
function ThemeModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration xatosini oldini olish uchun (oldinda muhokama qilinganidek)
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
// Bu funksiyani asosan Navbar.jsx ichida ishlatamiz, bu yerda faqat kerakli importlar ko'rsatildi.

export default function ThemeProvider({ children }) {
  return (
    // createTheme va MuiThemeProvider o'rniga Joy UI ning CssVarsProvider ishlatiladi
    <CssVarsProvider defaultMode="dark">
      {/* CssBaseline bu yerda ham zarur */}
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
