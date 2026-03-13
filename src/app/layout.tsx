// Root layout — wraps every page with the Navbar and optional Aside sidebar.
// "use client" is required here because we use hooks (usePathname, useState, useEffect).
"use client";

import { Inter, Josefin_Sans } from "next/font/google";
import "../Css/globals.css";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import { usePathname } from "next/navigation";
import styles from "@/Css/layout.module.css";
import { useEffect, useState } from "react";

// Load Google Fonts with latin subset
const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Skip the normal layout for the Sanity Studio editor route
  const isStudioRoute = pathname.startsWith("/studio");

  // Hide the Aside sidebar on narrow screens (below 768px)
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
        {isStudioRoute ? (
          // Render Sanity Studio without the forum layout
          children
        ) : (
          <div className={styles.pageWrapper}>
            <Navbar />
            <div className={styles.layout}>
              {/* Aside is only shown on screens wider than 768px */}
              {isWideScreen && <Aside />}
              <div className={styles.mainContent}>{children}</div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
