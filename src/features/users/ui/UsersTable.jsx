"use client";
import React, { useState, useMemo } from "react";

// RTK Query importlari
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/shared/api/randomUsersApi";

// Modallar importlari (UserViewModal qo'shildi)
import UserFormModal from "./UserFormModal";
import UserViewModal from "./UserViewModal";

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
  Modal,
  ModalDialog,
  Divider,
  Snackbar,
  Button as JoyButton,
} from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

// Ikonkalar importlari
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";

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

  // FORM MODAL HOLATI
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formModalMode, setFormModalMode] = useState("add");
  const [formInitialData, setFormInitialData] = useState({});

  // KO'RISH MODALI HOLATI <<<< QO'SHILDI
  const [openViewModal, setOpenViewModal] = useState(false);
  const [userToView, setUserToView] = useState(null);

  // O'CHIRISH MODALI HOLATI
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // SNACKBAR HOLATI
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });

  // 2. RTK QUERY HOOKS
  const { data, error, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit,
    search: searchTerm,
  });

  const [
    deleteUser,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      reset: resetDelete,
    },
  ] = useDeleteUserMutation();

  // O'chirish natijasini boshqarish
  React.useEffect(() => {
    if (isDeleteSuccess) {
      setSnackbar({
        open: true,
        message: `${userToDelete?.name?.first} muvaffaqiyatli o'chirildi! (Mock data)`,
        color: "success",
      });
      setOpenDeleteModal(false);
      setUserToDelete(null);
      resetDelete();
    }
    if (isDeleteError) {
      setSnackbar({
        open: true,
        message: "Xatolik: O'chirish amalga oshmadi (Mock API javobi).",
        color: "danger",
      });
      setOpenDeleteModal(false);
      setUserToDelete(null);
      resetDelete();
    }
  }, [isDeleteSuccess, isDeleteError, userToDelete, resetDelete]);

  // 3. DATA MANIPULATSIYASI VA FILTRLASH (useMemo)
  const innerData = data?.data;
  const rawUsers = innerData?.data;
  const allUsers = Array.isArray(rawUsers) ? rawUsers : [];

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  const filteredUsers = useMemo(() => {
    if (!normalizedSearchTerm) {
      return allUsers;
    }
    return allUsers.filter((user) => {
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

  const users = filteredUsers;
  const totalPages = innerData?.totalPages || 1;

  // 4. HANDLER FUNKSIYALARI
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setPage(1);
    setSearchTerm(event.target.value);
  };

  // FORM MODAL HANDLERLARI (Qo'shish/Tahrirlash)
  const handleOpenAddModal = () => {
    setFormModalMode("add");
    setFormInitialData({});
    setOpenFormModal(true);
  };

  const handleOpenEditModal = (user) => {
    setFormModalMode("edit");
    setFormInitialData(user);
    setOpenFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
    setFormInitialData({});
  };

  // KO'RISH MODALI HANDLERLARI <<<< QO'SHILDI
  const handleViewClick = (user) => {
    setUserToView(user);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setUserToView(null);
  };

  // O'CHIRISH HANDLERLARI
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.login.uuid).unwrap();
      } catch (error) {
        console.error("Delete mutatsiyasi xatosi:", error);
      }
    }
  };

  // 5. EARLY RETURN (yuklanish/xato holati)
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
      {/* 6.1. Qo'shish/Tahrirlash Modali */}
      <UserFormModal
        open={openFormModal}
        onClose={handleCloseFormModal}
        mode={formModalMode}
        initialData={formInitialData}
      />

      {/* 6.2. Ko'rish Modali <<<< QO'SHILDI */}
      <UserViewModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        userData={userToView}
      />

      {/* 6.3. O'chirishni Tasdiqlash Modali (AlertDialog) */}
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <Typography
            component="h2"
            id="alert-dialog-title"
            level="h4"
            startDecorator={<WarningIcon color="danger" />}
          >
            Foydalanuvchini o'chirishni tasdiqlaysizmi?
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-description"
            textColor="text.tertiary"
            sx={{ my: 2 }}
          >
            Siz haqiqatan ham **{userToDelete?.name?.first}{" "}
            {userToDelete?.name?.last}** foydalanuvchisini o'chirmoqchimisiz?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <JoyButton
              variant="plain"
              color="neutral"
              onClick={() => setOpenDeleteModal(false)}
              disabled={isDeleting}
            >
              Bekor qilish
            </JoyButton>
            <JoyButton
              variant="solid"
              color="danger"
              onClick={handleConfirmDelete}
              loading={isDeleting}
            >
              O'chirishni tasdiqlash
            </JoyButton>
          </Box>
        </ModalDialog>
      </Modal>

      {/* 6.4. Snackbar Komponenti */}
      <Snackbar
        open={snackbar.open}
        variant="solid"
        color={snackbar.color}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        endDecorator={
          <IconButton
            onClick={() => setSnackbar({ ...snackbar, open: false })}
            size="sm"
            variant="plain"
            sx={{ "--IconButton-size": "24px" }}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {snackbar.message}
      </Snackbar>

      {/* 6.5. Qidiruv va Qo'shish Tugmasi */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <JoyButton
          startDecorator={<AddIcon />}
          onClick={handleOpenAddModal}
          size="sm"
          sx={{ minWidth: 150 }}
        >
          Yangi qo'shish
        </JoyButton>
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

      {/* 6.6. Jadval Kontenti */}
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
                    sx={{ "--Avatar-size": "35px" }}
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
                      onClick={() => handleViewClick(user)} // <<< Ko'rish Modali ochiladi
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="warning"
                      onClick={() => handleOpenEditModal(user)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => handleDeleteClick(user)}
                      disabled={isDeleting}
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
