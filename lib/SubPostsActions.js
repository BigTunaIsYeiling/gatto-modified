"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function LikeSubPostAction({ postId, useridPosts, postParam }) {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/like`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
    body: JSON.stringify({ postId }),
  });
  if (!response.ok) {
    return { success: false };
  }
  revalidatePath(`/${useridPosts}/post/${postParam}`);
  return { success: true };
}

export async function DeleteSubPostAction({ postId, RouteuserId, postParam }) {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
      body: JSON.stringify({ postId }),
    }
  );
  if (!response.ok) {
    return { success: false };
  }
  revalidatePath(`/${RouteuserId}/post/${postParam}`);
  return { success: true };
}
