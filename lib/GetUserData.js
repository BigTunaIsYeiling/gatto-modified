export default async function GetUserData(token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
