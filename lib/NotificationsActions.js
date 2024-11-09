"use server";
import { revalidatePath } from "next/cache";
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

export async function DeleteNotiAction(id) {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
    }
  );
  if (!response.ok) {
    return { success: false };
  }
  revalidatePath("/notifications");
  return { success: true };
}
