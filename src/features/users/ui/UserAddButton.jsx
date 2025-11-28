// src/features/users/ui/UserAddButton.jsx
"use client";
import * as React from "react";
import { Button } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import UserFormModal from "./UserFormModal"; // Keyingi qadamda yaratamiz

export default function UserAddButton() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      {/* 1. Yangi foydalanuvchi qo'shish tugmasi */}
      <Button startDecorator={<AddIcon />} onClick={handleOpen} color="primary">
        Yangi Foydalanuvchi
      </Button>

      {/* 2. Forma Modali */}
      <UserFormModal
        open={open}
        onClose={handleClose}
        mode="add" // Qo'shish rejimini ko'rsatish
      />
    </React.Fragment>
  );
}
