"use client";
import * as React from "react";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "@/shared/api/randomUsersApi";

import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Divider,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  Snackbar,
  IconButton,
} from "@mui/joy";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const initialUserState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "male",
};

export default function UserFormModal({
  open,
  onClose,
  mode,
  initialData = {},
}) {
  const isEdit = mode === "edit";

  const [
    addUser,
    { isLoading: isAdding, isError: isAddError, reset: resetAdd },
  ] = useAddUserMutation();

  const [
    updateUser,
    { isLoading: isUpdating, isError: isUpdateError, reset: resetUpdate },
  ] = useUpdateUserMutation();

  const [formData, setFormData] = React.useState(initialUserState);
  const [errors, setErrors] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    color: "success",
  });

  React.useEffect(() => {
    if (open) {
      if (isEdit && initialData.name) {
        setFormData({
          firstName: initialData.name?.first || "",
          lastName: initialData.name?.last || "",
          email: initialData.email || "",
          gender: initialData.gender || "male",
        });
      } else if (!isEdit) {
        setFormData(initialUserState);
      }
      setErrors({});
    }
    setSnackbar({ open: false, message: "", color: "success" });
  }, [open, isEdit, initialData]);

  React.useEffect(() => {
    if (!open) {
      setFormData(initialUserState);
      setErrors({});
      resetAdd();
      resetUpdate();
      return;
    }

    if (isAddError || isUpdateError) {
      setSnackbar({
        open: true,
        message: "Xatolik: Mutatsiya amalga oshmadi. Konsolni tekshiring.",
        color: "danger",
      });
      resetAdd();
      resetUpdate();
    }
  }, [open, isAddError, isUpdateError, resetAdd, resetUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ism kiritilishi shart.";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya kiritilishi shart.";
      isValid = false;
    }

    const emailValue = formData.email.trim();
    if (!emailValue) {
      newErrors.email = "Email kiritilishi shart.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      newErrors.email = "To'g'ri email formatini kiriting.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setSnackbar({
        open: true,
        message: "Iltimos, barcha majburiy maydonlarni to'g'ri to'ldiring.",
        color: "warning",
      });
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (!isEdit) {
          await addUser({
            name: {
              first: formData.firstName,
              last: formData.lastName,
            },
            email: formData.email,
            gender: formData.gender,
          }).unwrap();

          setSnackbar({
            open: true,
            message: "Foydalanuvchi muvaffaqiyatli qo'shildi! (Mock).",
            color: "success",
          });
        } else {
          await updateUser({
            login: initialData.login,
            name: {
              first: formData.firstName,
              last: formData.lastName,
            },
            email: formData.email,
            gender: formData.gender,
            picture: initialData.picture,
            location: initialData.location,
          }).unwrap();

          setSnackbar({
            open: true,
            message: "Ma'lumotlar muvaffaqiyatli tahrirlandi (Mock).",
            color: "success",
          });
        }

        onClose();
      } catch (error) {
        console.error("Mutatsiya xatosi:", error);

        setSnackbar({
          open: true,
          message: "Kutilmagan xato. Konsolni tekshiring.",
          color: "danger",
        });
      }
    }
  };

  const isSubmitting = isAdding || isUpdating;

  const title = isEdit
    ? `Foydalanuvchini Tahrirlash: ${initialData.name?.first} ${initialData.name?.last}`
    : "Yangi Foydalanuvchi Qo'shish";

  return (
    <React.Fragment>
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

      <Modal open={open} onClose={onClose}>
        <ModalDialog
          sx={{
            width: "clamp(90%, 500px, 95%)",
            maxWidth: "800px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ModalClose onClick={onClose} />
          <Typography level="h4" component="h2" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Divider />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(auto-fit, minmax(280px, 1fr))",
                },
              }}
            >
              <FormControl error={!!errors.firstName}>
                <FormLabel>Ism</FormLabel>
                <Input
                  name="firstName"
                  placeholder="Ismini kiriting"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <FormHelperText>{errors.firstName}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.lastName}>
                <FormLabel>Familiya</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Familiyasini kiriting"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <FormHelperText>{errors.lastName}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Jinsi</FormLabel>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  orientation="horizontal"
                >
                  <Radio value="male" label="Erkak" />
                  <Radio value="female" label="Ayol" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mt: "auto" }} />
            <Box
              sx={{
                pt: 2,
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="plain"
                color="neutral"
                onClick={onClose}
                type="button" 
              >
                Bekor qilish
              </Button>
              <Button
                variant="solid"
                color="primary"
                startDecorator={<SaveIcon />}
                loading={isSubmitting}
              >
                {isEdit ? "Saqlash" : "Qo'shish"}
              </Button>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
