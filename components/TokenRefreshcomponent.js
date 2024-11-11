"use client";
import { RefreshTokenAction } from "@/lib/userActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundTokenRefresher() {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const result = await RefreshTokenAction();
      if (!result.success) {
        clearInterval(intervalId);
        router.push("/register");
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [router]);

  return null;
}
