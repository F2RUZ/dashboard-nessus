// src/app/dashboard/page.jsx
import ProtectedRoute from "@/shared/lib/ProtectedRoute";
import { Typography } from "@mui/joy";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Typography level="h1">Foydalanuvchilar Paneli (Dashboard)</Typography>
      <Typography level="body-md" sx={{ mt: 2, color: "text.secondary" }}>
        Bu sahifa keyingi bosqichda jadval bilan to'ldiriladi.
      </Typography>
    </ProtectedRoute>
  );
}
