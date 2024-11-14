"use client";
import { RefreshTokenAction } from "@/lib/userActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundTokenRefresher() {
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      const result = await RefreshTokenAction();
      if (!result.success) {
        clearInterval(intervalId);
        router.push("/register");
      }
    };
    setTimeout(refreshToken, 2000);
  }, []);

  return null;
}
