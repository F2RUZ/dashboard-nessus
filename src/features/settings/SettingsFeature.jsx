"use client";
import * as React from "react";
import {
  Box,
  Typography,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Option,
  Stack,
  Button,
  useColorScheme,
  Snackbar,
} from "@mui/joy";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SettingsFeature() {
  const { mode, setMode } = useColorScheme();

  const [language, setLanguage] = React.useState("uz");
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [pushNotif, setPushNotif] = React.useState(false);

  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = JSON.parse(
        localStorage.getItem("app_settings") || "{}"
      );
      if (savedSettings.language) setLanguage(savedSettings.language);
      if (savedSettings.emailNotif !== undefined)
        setEmailNotif(savedSettings.emailNotif);
      if (savedSettings.pushNotif !== undefined)
        setPushNotif(savedSettings.pushNotif);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      language,
      emailNotif,
      pushNotif,
    };

    localStorage.setItem("app_settings", JSON.stringify(settings));

    setSnackbar({
      open: true,
      message: "Sozlamalar muvaffaqiyatli saqlandi!",
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography level="h2" mb={1}>
        Sozlamalar
      </Typography>
      <Typography level="body-md" color="neutral" mb={3}>
        Platformani o'zingizga moslashtiring.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Card variant="outlined">
          <Box sx={{ mb: 2 }}>
            <Typography
              level="title-lg"
              startDecorator={<DarkModeRoundedIcon />}
            >
              Tashqi Ko'rinish
            </Typography>
            <Typography level="body-sm">
              Ilova mavzusini tanlang (Yorug' yoki Qorong'u).
            </Typography>
          </Box>
          <FormControl>
            <FormLabel>Mavzu rejimi</FormLabel>
            <Select
              value={mode}
              onChange={(event, newValue) => setMode(newValue)}
              sx={{ maxWidth: 300 }}
            >
              <Option value="system">Tizim (Avtomatik)</Option>
              <Option value="light">
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <LightModeRoundedIcon /> Yorug' (Light)
                </Box>
              </Option>
              <Option value="dark">
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <DarkModeRoundedIcon /> Qorong'u (Dark)
                </Box>
              </Option>
            </Select>
          </FormControl>
        </Card>

        <Card variant="outlined">
          <Box sx={{ mb: 2 }}>
            <Typography
              level="title-lg"
              startDecorator={<LanguageRoundedIcon />}
            >
              Til va Hudud
            </Typography>
            <Typography level="body-sm">
              Platforma interfeysi tilini o'zgartirish.
            </Typography>
          </Box>
          <FormControl>
            <FormLabel>Tilni tanlang</FormLabel>
            <Select
              value={language}
              onChange={(event, newValue) => setLanguage(newValue)}
              sx={{ maxWidth: 300 }}
            >
              <Option value="uz">O'zbek tili</Option>
              <Option value="en">English</Option>
              <Option value="ru">Русский</Option>
            </Select>
          </FormControl>
        </Card>

        <Card variant="outlined">
          <Box sx={{ mb: 2 }}>
            <Typography
              level="title-lg"
              startDecorator={<NotificationsRoundedIcon />}
            >
              Bildirishnomalar
            </Typography>
            <Typography level="body-sm">
              Xabarlarni qanday qabul qilishni xohlaysiz?
            </Typography>
          </Box>

          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Email xabarnomalari</Typography>
              <Switch
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
              />
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Push xabarnomalari (Brauzer)</Typography>
              <Switch
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
              />
            </Box>
          </Stack>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button size="lg" onClick={handleSaveSettings}>
            O'zgarishlarni Saqlash
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        color="success"
        variant="solid"
        startDecorator={<CheckCircleOutlineIcon />}
      >
        {snackbar.message}
      </Snackbar>
    </Box>
  );
}
