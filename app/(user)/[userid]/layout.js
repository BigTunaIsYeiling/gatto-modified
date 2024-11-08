import GetRouteData from "@/lib/GetRouteData";

export async function generateMetadata({ params }) {
  const { userid } = await params;
  const data = await GetRouteData(userid);
  return {
    title: `${data.username}'s profile`,
    description: `${data.username}'s profile`,
  };
}
export default async function Layout({ children }) {
  return <div>{children}</div>;
}
