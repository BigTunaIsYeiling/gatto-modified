import { cookies } from "next/headers";

export default async function GetUsersList() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/users`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("token").value}`,
      },
      
    }
  );
  const data = await response.json();
  return data;
}
