"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../model/authApi"; 
import { setCredentials } from "../model/authSlice";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Card,
  Alert,
  Link,
  Snackbar, 
  IconButton,
  FormHelperText, 
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  // 1. Lokal Holatlar
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [localErrors, setLocalErrors] = React.useState({});

  // 2. RTK Query Hook
  const [register, { isLoading, error }] = useRegisterMutation();

  // 3. Snackbar Holati
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    color: "success",
  });

  // Kirishdan oldin allaqachon kirilganligini tekshirish
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard/profile");
    }
  }, [isAuthenticated, router]);

  // 4. Lokal Validatsiya Funksiyasi
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Email Validatsiyasi
    if (!email.trim()) {
      newErrors.email = "Email kiritilishi shart.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "To'g'ri email formatini kiriting.";
      isValid = false;
    }

    // Parol Validatsiyasi
    if (!password.trim()) {
      newErrors.password = "Parol kiritilishi shart.";
      isValid = false;
    } else if (password.trim().length < 6) {
      newErrors.password = "Parol kamida 6ta belgidan iborat bo'lishi kerak.";
      isValid = false;
    }

    // Parollarni mosligini tekshirish
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmadi!";
      isValid = false;
    }

    setLocalErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 5. Lokal Validatsiyani Tekshirish
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Iltimos, barcha maydonlarni to'g'ri to'ldiring.",
        color: "warning",
      });
      return;
    }

    try {
      const userData = await register({ email, password }).unwrap();

      dispatch(setCredentials(userData));

      setSnackbar({
        open: true,
        message: "Muvaffaqiyatli ro'yxatdan o'tildi!",
        color: "success",
      });

      router.push("/dashboard/profile");
    } catch (err) {
      console.error("Register failed", err);

      const errorMessage =
        err?.data?.message || err?.error || "Noma'lum xato sodir bo'ldi.";
      setSnackbar({
        open: true,
        message: errorMessage,
        color: "danger",
      });
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackbar.open}
        variant="solid"
        color={snackbar.color}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={snackbar.color === "success" ? <CheckIcon /> : null}
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

      <Box
        sx={{ height: "100vh", display: "grid", placeItems: "center", px: 2 }}
      >
        <Card sx={{ width: 400, p: 4, borderRadius: "lg", boxShadow: "lg" }}>
          <Typography level="h3" textAlign="center" mb={2}>
            Ro'yxatdan O'tish
          </Typography>

          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error.data?.message || error.error || "Ulanish xatosi."}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }} error={!!localErrors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {localErrors.email && (
                <FormHelperText>{localErrors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }} error={!!localErrors.password}>
              <FormLabel>Parol</FormLabel>
              <Input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLocalErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              {localErrors.password && (
                <FormHelperText>{localErrors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }} error={!!localErrors.confirmPassword}>
              <FormLabel>Parolni Tasdiqlash</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setLocalErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
              />
              {localErrors.confirmPassword && (
                <FormHelperText>{localErrors.confirmPassword}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan O'tish"}
            </Button>
          </form>

          <Typography level="body-sm" mt={2} textAlign="center">
            Akkaunt bormi? <Link href="/login">Tizimga Kirish</Link>
          </Typography>
        </Card>
      </Box>
    </React.Fragment>
  );
}
