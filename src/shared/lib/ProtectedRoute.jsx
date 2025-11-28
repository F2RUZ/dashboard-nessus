"use client";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token && pathname === "/dashboard") {
      router.replace("/login");
    } else if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/dashboard/profile");
    }
    setIsLoading(false);
  }, [token, router, pathname]);

  if (isLoading || (!token && pathname === "/dashboard/")) {
    return null;
  }

  return <>{children}</>;
}
