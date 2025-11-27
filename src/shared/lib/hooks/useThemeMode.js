"use client";

import { useState } from "react";

export const useThemeMode = () => {
  const [mode, setMode] = useState("light");

  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { mode, toggle };
};
