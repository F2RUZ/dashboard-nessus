// src/features/users/ui/UsersTable.jsx
"use client";
import React, { useState, useMemo } from "react";
import { useGetUsersQuery } from "@/shared/api/randomUsersApi";

// Joy UI importlari
import {
  Box,
  Typography,
  Table,
  Sheet,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
  Input,
} from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

// Ikonkalar importlari
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search"; // Search ikonkasini qo'shamiz

// Material UI importlari
import Pagination from "@mui/material/Pagination";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const materialTheme = createTheme();

// Sanani o'qiladigan formatga o'tkazish
const formatDate = (dateString) => {
  if (!dateString) return "Noma'lum";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "Xato sana";
  }
};

export default function UsersTable() {
  const theme = useTheme();

  // 1. STATE HOOKS
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 15;

  // 2. RTK QUERY HOOK
  const { data, error, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit,
    search: searchTerm,
  });

  // 3. DATA MANIPULATSIYASI VA FILTRLASH (useMemo)
  const innerData = data?.data;
  const rawUsers = innerData?.data;
  const allUsers = Array.isArray(rawUsers) ? rawUsers : [];

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  // useMemo yordamida frontend filtrlash
  const filteredUsers = useMemo(() => {
    if (!normalizedSearchTerm) {
      return allUsers;
    }

    return allUsers.filter((user) => {
      // Qidiruv maydonlari
      const fullName = `${user.name?.first || ""} ${
        user.name?.last || ""
      }`.toLowerCase();
      const email = user.email?.toLowerCase();
      const location = `${user.location?.city || ""}, ${
        user.location?.state || ""
      }`.toLowerCase();

      return (
        fullName.includes(normalizedSearchTerm) ||
        email.includes(normalizedSearchTerm) ||
        location.includes(normalizedSearchTerm)
      );
    });
  }, [allUsers, normalizedSearchTerm]);

  const users = filteredUsers; // Jadval uchun filtrlangan ro'yxat
  const totalPages = innerData?.totalPages || 1;

  // 4. HANDLER FUNKSIYALARI
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    // setPage o'zgarganda qidiruvni tozalash shart emas, chunki u avtomatik yangi API so'rov yuboradi
  };

  const handleSearchChange = (event) => {
    // Qidiruv qiymati o'zgarganda sahifani 1-ga qaytarish muhim
    setPage(1);
    setSearchTerm(event.target.value);
  };

  // 5. EARLY RETURN (yuklanish/xato holati) - Barcha Hook'lar chaqirilgandan keyin keladi

  if (isLoading && page === 1) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert color="danger" variant="solid" sx={{ mt: 3 }}>
        Foydalanuvchilarni yuklashda xatolik yuz berdi.
      </Alert>
    );
  }

  // 6. KOMPONENTNI RENDERLASH
  return (
    <React.Fragment>
      {/* Qidiruv Inputi */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Input
          placeholder="Ism, email yoki manzil bo'yicha qidiruv..."
          variant="outlined"
          size="sm"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: 300 } }}
          startDecorator={<SearchIcon />}
        />
      </Box>

      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          minWidth: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          borderRadius: "md",
          overflow: "auto",
          minHeight: "60vh",
        }}
      >
        <Table
          aria-label="Users table with actions"
          stickyHeader
          hoverRow={false}
          size="sm"
        >
          <thead
            style={{
              background: `linear-gradient(90deg, ${theme.palette.primary[500]} 0%, ${theme.palette.neutral[700]} 100%)`,
            }}
          >
            <tr>
              <th style={{ width: "5%", color: "white" }}>Rasm</th>
              <th style={{ width: "15%", color: "white" }}>Ism</th>
              <th style={{ width: "8%", color: "white" }}>Jinsi</th>
              <th
                style={{
                  width: "22%",
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                Email
              </th>
              <th style={{ width: "15%", color: "white" }}>Telefon</th>
              <th
                style={{
                  width: "20%",
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                Manzil
              </th>
              <th
                style={{
                  width: "15%",
                  color: "white",
                  background: theme.palette.background[700],
                }}
              >
                Hodisalar
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching && page > 1 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <CircularProgress size="sm" />
                </td>
              </tr>
            )}

            {users.map((user, index) => (
              <tr
                key={user.login?.uuid || index}
                sx={{
                  backgroundColor:
                    user.gender === "male"
                      ? theme.palette.primary[50]
                      : theme.palette.danger[50],

                  "&:hover": {
                    backgroundColor:
                      user.gender === "male"
                        ? theme.palette.primary[100]
                        : theme.palette.danger[100],
                  },

                  "& td:last-child": {
                    backgroundColor: theme.palette.neutral[50],
                  },
                }}
              >
                <td>
                  <Avatar
                    size="sm"
                    src={user.picture?.thumbnail}
                    alt={`${user.name?.first}'s picture`}
                    sx={{ "--Avatar-size": "32px" }}
                  />
                </td>
                <td>{`${user.name?.first} ${user.name?.last}`}</td>
                <td>{user.gender}</td>

                <td sx={{ overflowWrap: "break-word" }}>{user.email}</td>

                <td>{user.phone}</td>

                <td
                  sx={{ overflowWrap: "break-word" }}
                >{`${user.location?.city}, ${user.location?.state}`}</td>

                <td>
                  <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="primary"
                      onClick={() => alert(`Ko'rish: ${user.name?.first}`)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="warning"
                      onClick={() => alert(`Tahrirlash: ${user.name?.first}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => alert(`O'chirish: ${user.name?.first}`)}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}

            {users.length === 0 && !isFetching && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Typography level="body-sm" sx={{ py: 1 }}>
                    {normalizedSearchTerm
                      ? `"${searchTerm}" bo'yicha ma'lumot topilmadi.`
                      : "Ma'lumot topilmadi."}
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <MuiThemeProvider theme={materialTheme}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: theme.palette.text.primary,
                },

                "& .Mui-selected": {
                  backgroundColor: theme.palette.primary[500] + " !important",
                  color: "white",
                  boxShadow: theme.shadow.sm,
                },
              }}
            />
          </MuiThemeProvider>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
