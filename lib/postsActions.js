"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GetPosts(userid) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${userid}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function GetPostsRouteAction({ userid, postid }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${userid}/p/${postid}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

export async function LikePostAction({ postId, useridPosts }) {
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
  revalidatePath(`/${useridPosts}`);
  return { success: true };
}

export async function AddReplyonPost(body) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/message/reply`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
}

export async function DeletePostAction({ postId, useridPosts }) {
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
  revalidatePath(`/${useridPosts}`);
  return { success: true };
}
