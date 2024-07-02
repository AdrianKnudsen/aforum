"use client";

import { Inter, Josefin_Sans } from "next/font/google";
import "../Css/globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isStudioRoute = pathname.startsWith("/studio");

  return (
    <html lang="en">
      <body className={`${inter.className} ${josefinSans.className}`}>
        {!isStudioRoute && <Navbar />}
        {children}
      </body>
    </html>
  );
}
