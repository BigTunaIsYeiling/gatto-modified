"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GetPosts(userid) {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${userid}`,
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

export async function AddPost(body) {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
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
  revalidatePath("/messages");
  return { success: true };
}

export async function AddPostForReply(body) {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/reply`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  revalidatePath("/messages");
  return { success: true };
}
