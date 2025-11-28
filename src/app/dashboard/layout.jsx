// src/app/dashboard/layout.jsx
import Sidebar from "@/widgets/sidebar/Sidebar";
import Navbar from "@/widgets/navbar/Navbar";
import { Box } from "@mui/joy";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* 1. Sidebar (Qattiq en) */}
      <Sidebar />

      {/* 2. Asosiy kontent maydoni (MainContent) */}
      <Box
        component="main"
        className="MainContent"
        sx={{
          // MUHIM TUZATISH: flexGrow: 1 qo'shildi!
          // Bu MainContent ni qolgan bo'sh joyni to'liq egallashga majbur qiladi.
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // Minimum eni 0 bo'lishi shart, bu flexbox uchun standart usul
          minWidth: 0,
          bgcolor: "background.body",
        }}
      >
        {/* Navbar (Navbar ichkarida 100% bo'ladi) */}
        <Navbar />

        {/* Sahifa kontenti */}
        <Box sx={{ p: 4, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
