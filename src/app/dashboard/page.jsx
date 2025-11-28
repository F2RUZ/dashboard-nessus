// src/app/dashboard/page.jsx
import ProtectedRoute from "@/shared/lib/ProtectedRoute";
import UsersTable from "@/features/users/ui/UsersTable"; // UsersTable import qilindi
import { Typography } from "@mui/joy";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Typography level="h1" sx={{ mb: 4 }}>
        Foydalanuvchilar Ro'yxati
      </Typography>

      {/* Users Jadvali qo'shildi */}
      <UsersTable />
    </ProtectedRoute>
  );
}
