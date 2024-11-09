import { cookies } from "next/headers";

export default async function GetUserData() {
  const cookiesStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookiesStore.get("token").value}`,
    },
    cache: "force-cache",
    next: { revalidate: 30 },
  });
  const data = await response.json();
  return data;
}
