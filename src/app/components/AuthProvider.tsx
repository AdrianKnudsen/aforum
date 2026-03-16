"use client";

import { SupabaseAuthProvider } from "@/app/context/AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
