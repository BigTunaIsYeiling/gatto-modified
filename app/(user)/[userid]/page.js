import GetRouteData from "@/lib/GetRouteData";
export default async function Page() {
  const { userid } = await params;
  const data = await GetRouteData(userid);
  return <div>{data.bio}</div>;
}
