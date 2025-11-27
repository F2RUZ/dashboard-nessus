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

export default function RegisterForm() {
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
          Register
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

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </FormControl>

          <Button type="submit" fullWidth sx={{ mt: 1 }}>
            Register
          </Button>
        </form>

        <Typography level="body-sm" mt={2} textAlign="center">
          Akkaunt bormi? <Link href="/login">Login</Link>
        </Typography>
      </Card>
    </Box>
  );
}
