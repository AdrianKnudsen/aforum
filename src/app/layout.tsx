"use client";

import { Inter, Josefin_Sans } from "next/font/google";
import "../Css/globals.css";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import { usePathname } from "next/navigation";
import styles from "@/Css/layout.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  const [isWideScreen, setIsWideScreen] = useState(false);

  // Checks screen width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} ${josefinSans.className}`}>
        {!isStudioRoute && <Navbar />}
        <div className={styles.layout}>
          {isWideScreen && <Aside />}{" "}
          {/* Render Sidebar only on wide screens */}
          <div className={styles.mainContent}>{children}</div>{" "}
          {/* Main Content */}
        </div>
      </body>
    </html>
  );
}
