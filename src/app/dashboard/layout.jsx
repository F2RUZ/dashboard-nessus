// // src/app/dashboard/layout.jsx (Tuzatilgan)
// import Sidebar from "@/widgets/sidebar/Sidebar";
// import Navbar from "@/widgets/navbar/Navbar";
// import { Box } from "@mui/joy";

// // Sidebar ning standart kengligini belgilaymiz
// const SIDEBAR_WIDTH = "250px";

// export default function DashboardLayout({ children }) {
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* 1. Sidebar (Qattiq en) */}
//       <Sidebar
//         // MUHIM TUZATISH: Sidebar ga qattiq en beramiz
//         sx={{
//           width: SIDEBAR_WIDTH,
//           flexShrink: 0, // Flex konteyner ichida qisqarmasligini ta'minlaydi
//         }}
//       />

//       {/* 2. Asosiy kontent maydoni (MainContent) */}
//       <Box
//         component="main"
//         className="MainContent"
//         sx={{
//           flexGrow: 1, // Qolgan bo'shliqni egallaydi
//           display: "flex",
//           flexDirection: "column",
//           // minWidth: 0 flexbox xatolarini oldini oladi
//           minWidth: 0,
//           bgcolor: "background.body",
//           flexGrow: 1,
//           minWidth: 0,
//           // MainContent qismini Sidebar_Width miqdoricha suramiz (Agar Sidebar absolute bo'lsa. Bu holatda kerak emas, lekin Flexbox eng yaxshi yechim)
//         }}
//       >
//         {/* Navbar (Navbar ichkarida 100% bo'ladi) */}
//         <Navbar />

       
//         <Box sx={{ p: 4, flexGrow: 1, overflowX: "hidden" }}>{children}</Box>
//       </Box>
//     </Box>
//   );
// }


// src/app/dashboard/layout.jsx (Tuzatilgan)
import Sidebar from "@/widgets/sidebar/Sidebar";
import Navbar from "@/widgets/navbar/Navbar";
import { Box } from "@mui/joy";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* 1. Sidebar: Hech qanday width yoki sx propini bermaymiz! */}
      <Sidebar />

      {/* 2. Asosiy kontent maydoni (MainContent) */}
      <Box
        component="main"
        className="MainContent"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // Main content uchun eng muhim qoida!
          minWidth: 0, 
          bgcolor: "background.body",
        }}
      >
        <Navbar />
        {/* Sahifa kontenti */}
        <Box sx={{ p: 4, flexGrow: 1, overflowX: 'hidden' }}>{children}</Box>
      </Box>
    </Box>
  );
}