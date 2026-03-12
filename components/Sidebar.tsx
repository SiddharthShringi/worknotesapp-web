"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, NotebookPen, FileText } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
      pathname === path
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent/60"
    }`;

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col p-6 gap-8">
        {/* Section Title */}
        <Link
          href="/"
          className="flex items-center font-semibold tracking-tight"
        >
          <span className="text-brand-yellow dark:text-brand-yellow p-2">
            <NotebookPen className="h-5 w-5" />
          </span>
          <p className="text-2xl font-geist font-bold text-brand-yellow dark:text-brand-yellow">
            WorkNotes
          </p>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <Link href="/tracker" className={linkClass("/tracker")}>
            <span>
              <Clock className="h-5 w-5" />
            </span>
            <span className="text-base font-medium">Time Tracker</span>
          </Link>
          <Link href="/projects" className={linkClass("/projects")}>
            <span>
              <FileText className="h-5 w-5" />
            </span>
            <span className="text-base font-medium">Projects</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
