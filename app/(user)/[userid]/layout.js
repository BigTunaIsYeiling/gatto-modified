import UserProfile from "@/components/UserProfile";
import GetRouteData from "@/lib/GetRouteData";
import GetUserData from "@/lib/GetUserData";

export async function generateMetadata({ params }) {
  const { userid } = await params;
  const data = await GetRouteData(userid);
  return {
    title: `${data.username}'s profile`,
    description: `${data.username}'s profile`,
  };
}
export default async function Layout({ children, params }) {
  const { userid } = await params;
  const signeduser = GetUserData();
  const routeUser = GetRouteData(userid);
  const [routeUserData, signedUserData] = await Promise.all([
    routeUser,
    signeduser,
  ]);
  return (
    <UserProfile
      data={routeUserData}
      userdata={signedUserData ? signedUserData : null}
      userid={userid}
    >
      {children}
    </UserProfile>
  );
}
