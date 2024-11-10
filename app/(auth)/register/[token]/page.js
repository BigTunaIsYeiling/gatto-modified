export default async function Page({ params }) {
  const { token } = await params;
  return <div>token: {token}</div>;
}
