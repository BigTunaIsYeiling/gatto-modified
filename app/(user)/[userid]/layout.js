import UserProfile from "@/components/UserProfile";
import GetRouteData from "@/lib/GetRouteData";
import GetUserData from "@/lib/GetUserData";

export async function generateMetadata({ params }) {
  try {
    const { userid } = await params;
    const data = await GetRouteData(userid);

    return {
      title: `${data?.username || "User"}'s profile`,
      description: `View ${data?.username || "the user's"} profile and more!`,
      openGraph: {
        title: `${data?.username || "User"}'s profile`,
        description: `Discover more about ${data?.username || "this user"}.`,
        images: [
          {
            url: data?.avatar,
            width: 800,
            height: 600,
            alt: `${data?.username || "User"}'s Avatar`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${data?.username || "User"}'s profile`,
        description: `Learn more about ${data?.username || "this user"}.`,
        images: [data?.avatar],
      },
    };
  } catch (error) {
    console.error("Error fetching route data:", error);
    return {
      title: "User Profile",
      description: "View user profiles and learn more!",
    };
  }
}

export default async function Layout({ children, params }) {
  const { userid } = await params;

  const [routeUserData, signedUserData] = await Promise.all([
    GetRouteData(userid),
    GetUserData(),
  ]);

  return (
    <UserProfile
      data={routeUserData || {}}
      userdata={signedUserData || null}
      userid={userid}
    >
      {children}
    </UserProfile>
  );
}
