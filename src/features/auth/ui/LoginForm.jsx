"use client";

import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Card,
  Link,
} from "@mui/joy";

export default function LoginForm() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          p: 4,
          borderRadius: "lg",
          boxShadow: "lg",
        }}
      >
        <Typography level="h3" textAlign="center" mb={2}>
          Login
        </Typography>

        <form>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="example@gmail.com" />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="••••••••" />
          </FormControl>

          <Button type="submit" fullWidth sx={{ mt: 1 }}>
            Login
          </Button>
        </form>

        <Typography level="body-sm" mt={2} textAlign="center">
          Akkaunt yo‘qmi? <Link href="/register">Register</Link>
        </Typography>
      </Card>
    </Box>
  );
}
