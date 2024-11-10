"use server";

import { cookies } from "next/headers";

export async function setToken(token) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days,
    sameSite: "lax",
    secure: true,
  });
  return true;
}
