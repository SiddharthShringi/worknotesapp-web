"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, NotebookPen, Folder, ClipboardList } from "lucide-react";

const navigation = [
  {
    label: "Time Tracker",
    href: "/tracker",
    icon: Clock,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Folder,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-16 border-r border-sidebar-border bg-sidebar lg:w-64">
      <div className="flex h-full flex-col px-2 py-5 sm:px-3 lg:px-4 lg:py-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="WorkNotes home"
          className="mb-8 flex h-10 items-center justify-center gap-2 lg:justify-start lg:px-2"
        >
          <NotebookPen className="h-5 w-5 shrink-0 text-brand" />

          <span className="hidden font-geist text-xl font-bold tracking-tight lg:inline">
            <span className="text-foreground">Work</span>
            <span className="text-brand">Notes</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="flex flex-col gap-1">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                title={label}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`
                  flex h-10 items-center justify-center gap-3 rounded-md
                  px-2 text-sm font-medium transition-colors
                  lg:justify-start lg:px-3
                  ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                  }
                `}
              >
                <Icon
                  className="h-[18px] w-[18px] shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="hidden lg:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
