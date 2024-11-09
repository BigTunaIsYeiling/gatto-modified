import { cookies } from "next/headers";

export default async function GetRouteData(userid) {
  const cookiesStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/one/${userid}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookiesStore.get("token").value}`,
      },
      
    }
  );
  const data = await res.json();
  return data;
}
