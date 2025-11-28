// src/features/auth/ui/RegisterForm.jsx
"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../model/authApi"; // Hook
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
} from "@mui/joy";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  // RTK Query Hook
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Parollar mos kelmadi!");
      return;
    }

    try {
      // API call
      const userData = await register({ email, password }).unwrap();
      // Save to store
      dispatch(setCredentials(userData));
      // Redirect
      router.push("/dashboard");
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: 400, p: 4, borderRadius: "lg", boxShadow: "lg" }}>
        <Typography level="h3" textAlign="center" mb={2}>
          Register
        </Typography>

        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error.data || "Xatolik yuz berdi"}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" required />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" required />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirmPassword" type="password" required />
          </FormControl>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>

        <Typography level="body-sm" mt={2} textAlign="center">
          Akkaunt bormi? <Link href="/login">Login</Link>
        </Typography>
      </Card>
    </Box>
  );
}
