// src/features/auth/model/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper funksiya: Tokenni faqat Klient tomonida olishni ta'minlaydi
const getTokenFromStorage = () => {
  // SSR (Server-Side Rendering) vaqtida window obyektiga kirish xatosini oldini oladi
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const initialState = {
  token: getTokenFromStorage(),
  user: null,
  isAuthenticated: !!getTokenFromStorage(), // Token mavjud bo'lsa true
  isLoading: false, // Kelajakdagi API chaqiruvlari uchun
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true; // Kirish muvaffaqiyatli
      state.isLoading = false;

      // LocalStoragega yozish
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
    },

    // Kelajakda Loading holatini boshqarish uchun qo'shildi
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false; // Chiqish
      state.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
