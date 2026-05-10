"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { updateTimezone } from "@/lib/api/user.api";
import { TimeZoneParams } from "@/types/auth.types";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthReady, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isAuthReady) {
      router.replace("/login");
    }
    if (isAuthenticated && isAuthReady && user) {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detectedTimezone !== user.timezone) {
        const params: TimeZoneParams = { user: { timezone: detectedTimezone } };
        updateTimezone(params);
      }
    }
  }, [isAuthenticated, isAuthReady, router, user]);

  if (!isAuthReady) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
