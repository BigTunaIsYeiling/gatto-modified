import TokenComponent from "@/components/TokenComponent";

export default async function Page({ params }) {
  const { token } = await params;
  return <TokenComponent token={token} />;
}
