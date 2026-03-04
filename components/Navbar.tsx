import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-end px-6">
        {/* Left — Logo */}

        {/* Right — Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
