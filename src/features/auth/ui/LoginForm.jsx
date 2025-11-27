// src/features/auth/ui/LoginForm.jsx
"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../model/authApi"; // Hook
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

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  // RTK Query Hook
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: 400, p: 4, borderRadius: "lg", boxShadow: "lg" }}>
        <Typography level="h3" textAlign="center" mb={2}>
          Login
        </Typography>

        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error.data || "Xatolik"}
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

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <Typography level="body-sm" mt={2} textAlign="center">
          Akkaunt yo‘qmi? <Link href="/register">Register</Link>
        </Typography>
      </Card>
    </Box>
  );
}
