import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppBottomBar from "@/components/AppBottomBar";
import NavigationBar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Boomzo Partners",
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
        <Toaster />
      </body>
    </html>
  );
}
