"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Clock, Mail, BarChart3, Folder } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isAuthReady, router]);

  if (!isAuthReady) return null;
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex bg-brand-yellow items-center justify-center p-12">
        <div className="max-w-md space-y-12">
          {/* Brand */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-brand-graphite">
              WorkNotes
            </h1>

            <p className="text-xl text-brand-black">
              Wake up to proof of your work.
            </p>
          </div>

          {/* 3 Step System */}
          <div className="space-y-4 text-sm text-brand-graphite">
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5" />
              <p>Log focused sessions with start and end time.</p>
            </div>

            <div className="flex items-start gap-3">
              <Folder size={18} className="mt-0.5" />
              <p>Tag projects and attach notes to real work.</p>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5" />
              <p>Receive a 4 AM summary of what you did yesterday.</p>
            </div>

            <div className="flex items-start gap-3">
              <BarChart3 size={18} className="mt-0.5" />
              <p>Review weekly analytics to track consistency.</p>
            </div>
          </div>

          {/* Email Preview Card */}
          <div className="bg-foreground p-5 rounded-xl shadow-md space-y-4 text-sm text-background">
            <div className="flex items-center gap-2 font-medium">
              <Mail size={16} />
              Daily Report
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Clock size={16} />
                4h 10m total · 6 sessions
              </div>
              <div className="text-xs opacity-70">
                Compared to yesterday: +45m
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Folder size={16} />
                  WorkNotes App — 2h 30m
                </div>
                <ul className="ml-6 list-disc space-y-1 text-xs opacity-80">
                  <li>Improved auth layout</li>
                  <li>Refactored summary email service</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Folder size={16} />
                  CS50 — 1h 40m
                </div>
                <ul className="ml-6 list-disc space-y-1 text-xs opacity-80">
                  <li>Memory lecture notes</li>
                  <li>Practiced pointer problems</li>
                </ul>
              </div>
              <p className="text-sm text-brand-black opacity-60">
                Discipline is not intensity. It&apos;s showing up.
              </p>
            </div>
          </div>

          {/* Philosophy Line */}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
