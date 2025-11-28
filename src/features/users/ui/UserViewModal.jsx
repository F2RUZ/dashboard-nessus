"use client";
import * as React from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Divider,
  Box,
  Avatar,
  Grid,
} from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

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

export default function UserViewModal({ open, onClose, userData }) {
  if (!userData) return null;

  const fullName = `${userData.name?.first || ""} ${userData.name?.last || ""}`;
  const address = `${userData.location?.street?.name || ""}, ${
    userData.location?.city || ""
  }, ${userData.location?.country || ""}`;
  const registeredDate = formatDate(userData.registered?.date);

  const DetailItem = ({ icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {React.cloneElement(icon, { color: "primary", fontSize: "small" })}
      <Typography level="body-sm" sx={{ minWidth: 70, fontWeight: "lg" }}>
        {label}:
      </Typography>
      <Typography level="body-md" sx={{ flexGrow: 1 }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: "clamp(90%, 500px, 95%)",
          maxWidth: "700px",
        }}
      >
        <ModalClose onClick={onClose} />
        <Typography level="h4" component="h2" sx={{ mb: 1 }}>
          Foydalanuvchi Ma'lumotlari
        </Typography>
        <Divider />

        <Box
          sx={{ mt: 2, p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              pb: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Avatar
              size="lg"
              src={userData.picture?.large}
              alt={fullName}
              sx={{ "--Avatar-size": "80px", boxShadow: "md" }}
            />
            <Box>
              <Typography level="h3">{fullName}</Typography>
              <Typography level="body-md" color="neutral">
                @{userData.login?.username}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <DetailItem
                icon={<EmailIcon />}
                label="Email"
                value={userData.email}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <DetailItem
                icon={<PersonIcon />}
                label="Jinsi"
                value={userData.gender}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <DetailItem
                icon={<PhoneIcon />}
                label="Telefon"
                value={userData.phone}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <DetailItem
                icon={<PersonIcon />}
                label="Ro'yxatdan"
                value={registeredDate}
              />
            </Grid>
            <Grid xs={12}>
              <DetailItem
                icon={<LocationOnIcon />}
                label="Manzil"
                value={address}
              />
            </Grid>
          </Grid>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
