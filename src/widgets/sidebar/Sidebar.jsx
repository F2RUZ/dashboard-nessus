// src/widgets/sidebar/Sidebar.jsx

"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Button,
  IconButton,
  useTheme,
  Drawer,
} from "@mui/joy";

import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import { useDispatch, useSelector } from "react-redux"; // useSelector import qilindi
import { logout } from "@/features/auth/model/authSlice";
import { useRouter } from "next/navigation";


const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: DashboardRoundedIcon,
  },
  {
    name: "Analitika",
    path: "/dashboard/analytics",
    Icon: AnalyticsRoundedIcon,
  },
  {
    name: "Mening Profilim",
    path: "/dashboard/profile",
    Icon: PersonRoundedIcon,
  },
  {
    name: "Sozlamalar",
    path: "/dashboard/settings", 
    Icon: SettingsRoundedIcon,
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = React.useState(false); // Desktop rejim uchun

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 2. LOGIKA
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const toggleSidebar = () => {
    // Agar bu funksiya faqat desktopda kichraytirish uchun ishlatilsa
    setIsCollapsed((prev) => !prev);
  };

  const sidebarWidth = isCollapsed ? 70 : 240;

  const renderSidebarContent = (
    <Box
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

        {!isMobile && (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={toggleSidebar}
            sx={{ ml: isCollapsed ? 0 : "auto" }}
          >
            {isCollapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
          </IconButton>
        )}
      </Box>

      <List
        size="sm"
        sx={{
          "--ListItem-radius": "8px",
          "--List-gap": "4px",
          flexGrow: 1,
          "--ListItem-minHeight": isCollapsed ? "40px" : "36px",
        }}
      >
        {navigationItems.map((item) => {
          // Dashboardni to'g'ri faollashtirish mantiqi
          const isActive =
            pathname === item.path ||
            (item.path === "/dashboard" && pathname === "/dashboard");

          return (
            <ListItem key={item.path}>
              <ListItemButton
                component={Link}
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                sx={{
                  justifyContent: isCollapsed ? "center" : "flex-start",
                }}
              >
                <ListItemDecorator>
                  <item.Icon />
                </ListItemDecorator>
                {!isCollapsed && item.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

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
            "& .MuiButton-startDecorator": {
              marginRight: isCollapsed ? 0 : 1,
            },
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          {!isCollapsed ? "Chiqish" : null}
        </Button>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={false} // Bu holat Redux orqali layoutda boshqarilishi kerak
        onClose={() => {}}
        size="sm"
        sx={{
          "--Drawer-contentSize": "240px",
        }}
      >
        {renderSidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        minHeight: "100vh",
        width: sidebarWidth,
        flexShrink: 0,
        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        position: "sticky", // Desktopda doim ekranda turishi uchun
        top: 0,
        display: { xs: "none", sm: "block" }, // Mobil (xs) da butunlay yashiramiz
        transition: "width 0.2s",
      }}
    >
      {renderSidebarContent}
    </Box>
  );
}
