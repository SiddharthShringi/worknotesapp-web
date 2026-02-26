"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isAuthReady) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthReady, router]);

  if (!isAuthReady) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
