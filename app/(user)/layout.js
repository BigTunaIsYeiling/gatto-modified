import { Roboto } from "next/font/google";
import "../globals.css";
import { cookies } from "next/headers";
import GetUserData from "@/lib/GetUserData";
import UserLayout from "@/components/UserLayout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
export const metadata = {
  title: "PurrGatto",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const data = await GetUserData(token);
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="gradient-container">
          <UserLayout data={data}>{children}</UserLayout>
        </div>
      </body>
    </html>
  );
}
