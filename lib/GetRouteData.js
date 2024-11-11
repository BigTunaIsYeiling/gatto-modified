export default async function GetRouteData(userid) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/one/${userid}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}
