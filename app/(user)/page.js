import Home from "@/components/HomePage";
import GetUsersList from "@/lib/GetUsersList";

export default async function Page() {
  const userslistData = await GetUsersList();
  return <Home usersData={userslistData} />;
}
