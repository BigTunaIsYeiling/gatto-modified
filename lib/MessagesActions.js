"use server";
import { cookies } from "next/headers";

export async function SendMessage({ body }) {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
}


export async function GetMessages() {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/message/`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
