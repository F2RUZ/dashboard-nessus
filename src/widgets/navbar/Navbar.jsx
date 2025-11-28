// src/widgets/navbar/Navbar.jsx
"use client";
import * as React from "react";
import { Box, Typography, IconButton, useColorScheme } from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

// Theme Toggle uchun alohida komponent
function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration xatosidan qochish (avval muhokama qilinganidek)
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" />;
  }

  return (
    <IconButton
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

export default function Navbar() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        gap: 2,
        bgcolor: "background.surface",
        borderBottom: "1px solid",
        borderColor: "divider",
        height: "60px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography level="h5" component="h1">
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Dark/Light mode tugmasi */}
        <ColorSchemeToggle />
      </Box>
    </Box>
  );
}
