// src/widgets/sidebar/Sidebar.jsx (Yakuniy Tuzatishlar bilan)
"use client";
import * as React from "react";
// ... (Joy UI importlari)
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Button,
  IconButton,
} from "@mui/joy";
// ... (Ikonka va Redux importlari)
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

// ... (Redux va Router hooklari)
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/model/authSlice";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  // Endi hech qanday prop qabul qilmaymiz
  const dispatch = useDispatch();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const sidebarWidth = isCollapsed ? 70 : 240;

  return (
    <Box
      component="nav"
      sx={{
        p: 2,
        minHeight: "100vh",
        // MUHIM: width dinamik va flexShrink: 0 qo'shildi!
        width: sidebarWidth,
        flexShrink: 0, // Bu Sidebar ning qisqarmasligini kafolatlaydi

        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
      }}
    >
      {/* 1. LOGOTIP va Yig'ish tugmasi */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          pb: 2,
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {!isCollapsed && (
          <Typography
            level="h4"
            component="div"
            sx={{ fontWeight: "xl", fontSize: "md" }}
          >
            Platform
          </Typography>
        )}

        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          onClick={toggleSidebar}
          sx={{ ml: isCollapsed ? 0 : "auto" }}
        >
          {isCollapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
        </IconButton>
      </Box>

      {/* 2. MENYU */}
      <List
        size="sm"
        sx={{
          "--ListItem-radius": "8px",
          "--List-gap": "4px",
          flexGrow: 1,
          // Qisqarganda yozuvni yashirish uchun
          "--ListItem-minHeight": isCollapsed ? "40px" : "36px",
        }}
      >
        <ListItem>
          <ListItemButton selected>
            <ListItemDecorator>
              <DashboardRoundedIcon />
            </ListItemDecorator>
            {!isCollapsed && "Dashboard"}
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
          sx={{
            width: "100%",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          {/* Faqat Yig'ilmaganda yozuvni ko'rsatish */}
          {!isCollapsed ? "Chiqish" : <LogoutRoundedIcon />}
        </Button>
      </Box>
    </Box>
  );
}
