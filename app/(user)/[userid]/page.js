import Answers from "@/components/posts/Answers";
import GetRouteData from "@/lib/GetRouteData";
import GetUserData from "@/lib/GetUserData";
import { GetPosts } from "@/lib/postsActions";
export default async function Page({ params }) {
  const { userid } = await params;
  const signeduser = GetUserData();
  const routeUser = GetRouteData(userid);
  const routeuserposts = GetPosts(userid);
  const [routeUserData, signedUserData, routeUserPostsData] = await Promise.all(
    [routeUser, signeduser, routeuserposts]
  );
  return (
    <Answers
      userid={userid}
      SignedUser={signedUserData}
      PostsData={routeUserPostsData}
      RouteUserdata={routeUserData}
    />
  );
}
