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
        const params: TimeZoneParams = {
          user: { timezone: detectedTimezone },
        };

        updateTimezone(params);
      }
    }
  }, [isAuthenticated, isAuthReady, router, user]);

  if (!isAuthReady || !isAuthenticated) return null;

  return (
    <div className="flex min-h-dvh overflow-x-hidden">
      <Sidebar />

      <div className="ml-16 flex min-w-0 flex-1 flex-col lg:ml-64">
        <Navbar />

        <main className="min-w-0 flex-1">
          <div className="px-4 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
