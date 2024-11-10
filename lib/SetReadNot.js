"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function SetReadNot() {
  const cookiesStore = await cookies();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/Read`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
  });
  return revalidatePath("/");
}
