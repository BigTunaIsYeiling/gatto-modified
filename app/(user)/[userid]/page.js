import GetRouteData from "@/lib/GetRouteData";
export default async function Page({params}) {
  const { userid } = await params;
  const data = await GetRouteData(userid);
  return <h1>{data.bio}</h1>;
}
