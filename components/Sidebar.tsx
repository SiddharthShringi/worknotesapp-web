"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderMinus, Clock8, NotebookPen } from "lucide-react";

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
          <Link href="/projects" className={linkClass("/projects")}>
            <span>
              <FolderMinus className="h-4 w-4" />
            </span>
            <span className="text-base">Projects</span>
          </Link>

          <Link href="/time-tracker" className={linkClass("/time-tracker")}>
            <span>
              <Clock8 className="h-4 w-4" />
            </span>
            <span className="text-base">Time Tracker</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
