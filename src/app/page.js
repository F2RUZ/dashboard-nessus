"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login"); 
    }
  }, [token, router]);

  return null;
}
