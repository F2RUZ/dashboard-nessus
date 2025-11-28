"use client";
import * as React from "react";
import {
  Typography,
  Card,
  Box,
  Input,
  Button,
  Grid,
  FormLabel,
  FormControl,
  Divider,
  CircularProgress,
  Avatar,
  Stack,
  Snackbar,
} from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ProfileFeature() {
  const { user: authUser } = useSelector((state) => state.auth);

  // 1. Lokal holatlar
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState(null);

  // Loading holatlarini qo'lda boshqaramiz
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  // Snackbar holati
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    color: "success",
    icon: <CheckCircleOutlineIcon />,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("user_profile_data");

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFirstName(parsedData.firstName || authUser?.username || "");
          setEmail(parsedData.email || authUser?.email || "");
          setAvatarPreview(parsedData.avatar || null);
        } else {
          setFirstName(authUser?.username || "");
          setEmail(authUser?.email || "");
        }
      } catch (error) {
        console.error("LocalStorage xatosi:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [authUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatarPreview(base64String);

        const currentData = JSON.parse(
          localStorage.getItem("user_profile_data") || "{}"
        );
        const newData = {
          ...currentData,
          avatar: base64String,
          firstName,
          email,
        }; // Hozirgi datalarni ham qo'shib qo'yamiz
        localStorage.setItem("user_profile_data", JSON.stringify(newData));

        setIsUploading(false);

        setSnackbar({
          open: true,
          message: "Rasm muvaffaqiyatli saqlandi!",
          color: "success",
          icon: <CheckCircleOutlineIcon />,
        });
      };

      reader.onerror = () => {
        setIsUploading(false);
        setSnackbar({
          open: true,
          message: "Rasmni o'qishda xatolik!",
          color: "danger",
          icon: <ErrorOutlineIcon />,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    setTimeout(() => {
      try {
        const currentData = JSON.parse(
          localStorage.getItem("user_profile_data") || "{}"
        );

        const newData = {
          ...currentData,
          firstName: firstName,
          email: email,
          avatar: avatarPreview, 
        };

        localStorage.setItem("user_profile_data", JSON.stringify(newData));


        setSnackbar({
          open: true,
          message: "Profil ma'lumotlari LocalStorage-ga saqlandi!",
          color: "success",
          icon: <CheckCircleOutlineIcon />,
        });
      } catch (err) {
        console.error(err);
        setSnackbar({
          open: true,
          message: "Saqlashda xatolik yuz berdi.",
          color: "danger",
          icon: <ErrorOutlineIcon />,
        });
      } finally {
        setIsUpdating(false);
      }
    }, 800); 
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography level="h2" component="h1" mb={1}>
        {firstName || "Foydalanuvchi"} Profil Sozlamalari
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography level="h3" mb={3}>
          Asosiy Ma'lumotlar va Rasm
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center" mb={4}>
          <Avatar
            size="lg"
            src={avatarPreview} 
            sx={{ width: 80, height: 80 }}
          >
            {!avatarPreview && <PermIdentityIcon />}
          </Avatar>
          <Box>
            <Typography level="body-md">Profil rasmi</Typography>
            <Button
              component="label"
              variant="outlined"
              size="sm"
              loading={isUploading}
              sx={{ mt: 1 }}
            >
              {isUploading ? "Yuklanmoqda..." : "Rasm yuklash"}
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </Button>
          </Box>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Ism va Familiya</FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ismingiz"
                  required
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email manzilingiz"
                  required
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            sx={{ mt: 3 }}
            loading={isUpdating}
            disabled={isUpdating}
          >
            {isUpdating ? "Saqlanmoqda..." : "O'zgarishlarni Saqlash"}
          </Button>
        </form>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        variant="solid"
        color={snackbar.color}
        startDecorator={snackbar.icon}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          minWidth: 300,
        }}
      >
        {snackbar.message}
      </Snackbar>
    </Box>
  );
}
