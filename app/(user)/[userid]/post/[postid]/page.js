import PostOnePosts from "@/components/posts/PostRoute";
import GetRouteData from "@/lib/GetRouteData";
import GetUserData from "@/lib/GetUserData";
import { GetPostsRouteAction } from "@/lib/postsActions";

export default async function Page({ params }) {
  const { userid, postid } = await params;
  const signeduser = GetUserData();
  const routeUser = GetRouteData(userid);
  const Posts = GetPostsRouteAction({ userid, postid });
  const [routeUserData, signedUserData, PostsData] = await Promise.all([
    routeUser,
    signeduser,
    Posts,
  ]);
  return (
    <PostOnePosts
      userid={userid}
      postid={postid}
      data={routeUserData}
      posts={PostsData}
      userData={signedUserData ? signedUserData : null}
    />
  );
}
