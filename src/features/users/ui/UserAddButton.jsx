"use client";
import * as React from "react";
import { Button } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import UserFormModal from "./UserFormModal"; 

export default function UserAddButton() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button startDecorator={<AddIcon />} onClick={handleOpen} color="primary">
        Yangi Foydalanuvchi
      </Button>

      <UserFormModal
        open={open}
        onClose={handleClose}
        mode="add" 
      />
    </React.Fragment>
  );
}
