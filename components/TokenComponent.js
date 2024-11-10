"use client";
import { setToken } from "@/lib/AssignToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokenComponent({ token }) {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const settwittertoken = async () => {
        await setToken(token);
        router.push("/");
      };
      settwittertoken();
    }
  }, [token, router]);

  return null;
}
