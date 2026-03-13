"use client";

import { SessionProvider } from "next-auth/react";

// Wraps the app in NextAuth's SessionProvider so useSession() works in client components
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
