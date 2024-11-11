import EditUser from "@/components/ChangeUserSettings";
import GetUserData from "@/lib/GetUserData";
export default async function Page() {
  const UserData = await GetUserData();
  return (
    <EditUser
      isTwitter={UserData.isTwitter}
      avatar={UserData.avatar}
      data={UserData}
    />
  );
}
