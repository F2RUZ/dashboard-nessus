"use client";

import React from "react";
import Sidebar from "@/widgets/sidebar/Sidebar";
import Navbar from "@/widgets/navbar/Navbar";
import { Box, useTheme } from "@mui/joy";
import ProtectedRoute from "@/shared/lib/ProtectedRoute";

const SIDEBAR_WIDTH = 256;

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            display: { xs: "none", md: "initial" },
            ...(sidebarOpen && {
              display: { xs: "initial", md: "initial" },
            }),
          }}
        />

        <Box
          component="main"
          className="MainContent"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            bgcolor: "background.body",

            transition: "margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        >
          <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

          <Box
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              flexGrow: 1,
              overflowX: "hidden",
              pt: { xs: 8, sm: 10 },
              bgcolor: "background.surface",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
