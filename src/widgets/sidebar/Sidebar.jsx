// src/widgets/sidebar/Sidebar.jsx
"use client";
import * as React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Button,
} from "@mui/joy";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/model/authSlice"; // Logout action
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Redux store dan tokenni o'chirish
    dispatch(logout());
    // Login sahifasiga yo'naltirish
    router.replace("/login");
  };

  return (
    <Box
      component="nav"
      sx={{
        p: 2,
        minHeight: "100vh",
        width: { xs: "100%", md: 240 },
        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 1. LOGOTIP */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", pb: 2 }}>
        <Typography level="h4" component="div" sx={{ fontWeight: "xl" }}>
          Platform Logo
        </Typography>
      </Box>

      {/* 2. MENYU */}
      <List
        size="sm"
        sx={{
          "--ListItem-radius": "8px",
          "--List-gap": "4px",
          flexGrow: 1,
        }}
      >
        <ListItem>
          <ListItemButton selected>
            {" "}
            {/* Hozircha faqat Dashboard */}
            <ListItemDecorator>
              <DashboardRoundedIcon />
            </ListItemDecorator>
            Dashboard
          </ListItemButton>
        </ListItem>
      </List>

      {/* 3. CHIQISH TUGMASI */}
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          startDecorator={<LogoutRoundedIcon />}
          variant="plain"
          color="danger"
          onClick={handleLogout}
          sx={{ width: "100%", justifyContent: "flex-start" }}
        >
          Chiqish
        </Button>
      </Box>
    </Box>
  );
}
