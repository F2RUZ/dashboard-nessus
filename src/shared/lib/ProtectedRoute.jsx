"use client";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  const router = useRouter();
  const pathname = usePathname();
  // Serverda true, brauzerda useEffect bilan false qilinadi
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token && pathname === "/dashboard") {
      // Autentifikatsiyadan o'tmagan -> Login sahifasiga
      router.replace("/login");
    } else if (token && (pathname === "/login" || pathname === "/register")) {
      // Autentifikatsiyadan o'tgan, lekin Auth sahifasida -> Dashboardga
      router.replace("/dashboard/profile");
    }
    setIsLoading(false);
  }, [token, router, pathname]);

  // Agar token yo'q bo'lsa va Dashboardda bo'lsa, yuklanishni kutish.
  if (isLoading || (!token && pathname === "/dashboard/")) {
    return null;
  }

  return <>{children}</>;
}
