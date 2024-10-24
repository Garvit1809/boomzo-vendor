import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppBottomBar from "@/components/AppBottomBar";
import NavigationBar from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Coupon Vendor App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}  antialiased`}>
        <div className="hidden md:block">
          {" "}
          <NavigationBar />
        </div>
        {children}
        <div className="block sm:hidden">
          <AppBottomBar />
        </div>
      </body>
    </html>
  );
}
