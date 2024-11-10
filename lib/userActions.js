"use server";

import { cookies } from "next/headers";
import { setToken } from "./AssignToken";
import { revalidatePath } from "next/cache";

export async function loginAction(username, password) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    return {
      success: false,
      errors: data.errors,
    };
  }
  const data = await response.json();
  await setToken(data.token);
  return {
    success: true,
  };
}

export async function Register(username, password) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      success: false,
      errors: data.errors ? data.errors : "Sign up Failed",
    };
  }
  const data = await response.json();
  await setToken(data.token);
  return {
    success: true,
  };
}

export async function logoutAction() {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
    }
  );
  if (!response.ok) {
    return {
      success: false,
      error: "logout Failed",
    };
  }
  cookiesStore.delete("token");
  return {
    success: true,
  };
}

export async function ChangeUserSettingsAction(formData) {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, errors: errorData.errors };
  }
  revalidatePath("/");
  return { success: true };
}

export async function DeleteUserAction() {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, errors: errorData.errors };
  }
  cookiesStore.delete("token");
  return { success: true };
}

export async function RefreshTokenAction() {
  const cookiesStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
    }
  );

  if (!response.ok) {
    return { success: false };
  }
  const data = await response.json();
  await setToken(data.newToken);
  return { success: true };
}
