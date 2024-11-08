import { Toaster } from "react-hot-toast";
import "../globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Log in",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            style: {
              background: "linear-gradient(180deg, #f8f4f0, #fdecd2)",
              color: "#000",
              borderRadius: "10px",
              fontSize: "12px",
            },
            duration: 1800,
          }}
        />
        {children}
      </body>
    </html>
  );
}
