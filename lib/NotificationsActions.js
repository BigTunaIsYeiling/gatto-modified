"use server";
import { cookies } from "next/headers";

export async function GetNotifications() {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
  });
  const data = await response.json();
  return data;
}
