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
} from "@mui/joy";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/model/authSlice";
import { useRouter } from "next/navigation";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: DashboardRoundedIcon,
  },
  {
    name: "Mening Profilim",
    path: "/dashboard/profile",
    Icon: PersonRoundedIcon,
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

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
        width: sidebarWidth,
        flexShrink: 0,
        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
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
          const isActive =
            pathname === item.path ||
            (item.path === "/dashboard" && pathname.startsWith("/dashboard/"));

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
}
