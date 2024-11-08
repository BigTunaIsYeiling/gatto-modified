"use server";

import { cookies } from "next/headers";
import { setToken } from "./AssignToken";
import { redirect } from "next/navigation";

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
  redirect("/register");
}
