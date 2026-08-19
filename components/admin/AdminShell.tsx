"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/admin/ui";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M4 13h6V4H4v9zm10 7h6v-9h-6v9zM4 21h6v-4H4v4zM14 4v4h6V4h-6z" },
  { href: "/admin/projects", label: "Loyihalar", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { href: "/admin/blogs", label: "Blog postlar", icon: "M4 2h13a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V2zm14 7h-6M14 12h-2M14 15h-2" },
  { href: "/admin/skills", label: "Texnologiyalar", icon: "m8 9-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" },
  { href: "/admin/experiences", label: "Ish tajriba", icon: "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" },
  { href: "/admin/certificates", label: "Sertifikatlar", icon: "M22 9h-5M18 5l4 4-4 4M1 3h4v18H1zM5 3h10v18H5zM9 8h2M9 12h2M9 16h2" },
  { href: "/admin/messages", label: "Xabarlar", icon: "M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5zM9 10h6M9 14h4" },
  { href: "/admin/settings", label: "Profil sozlamalari", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 w-[240px] hidden md:flex flex-col bg-card border-r border-border z-40">
        <div className="px-6 h-16 flex items-center border-b border-border">
          <Link href="/admin" className="flex items-center gap-2.5 no-underline">
            <span className="w-8 h-8 rounded-lg bg-[#4770FF] flex items-center justify-center text-white text-sm font-black">
              A
            </span>
            <span className="font-bold text-head">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-[#4770FF]/10 text-[#4770FF]"
                    : "text-p hover:text-head hover:bg-mini-card"
                }`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-p hover:text-head hover:bg-mini-card no-underline transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Saytni ko&apos;rish
          </Link>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-p hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loggingOut ? <Spinner /> : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            )}
            Chiqish
          </button>
        </div>
      </aside>

      <div className="md:pl-[240px]">
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-8 bg-card/80 backdrop-blur border-b border-border">
          <span className="text-sm text-p hidden sm:block">
            <span className="text-head font-semibold">Wow, </span>
            barcha ma&apos;lumotlar shu yerdan boshqariladi
          </span>
          <span className="md:hidden font-bold text-head text-sm">Admin</span>
          <Link
            href="https://supabase.com/dashboard"
            target="_blank"
            className="flex items-center gap-2 text-xs font-medium text-p hover:text-[#4770FF] transition-colors no-underline"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
            Supabase
          </Link>
        </header>

        <nav className="md:hidden sticky top-16 z-30 bg-card border-b border-border flex overflow-x-auto px-3 py-2 gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-colors ${
                  active ? "bg-[#4770FF]/10 text-[#4770FF]" : "text-p hover:text-head"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="p-4 sm:p-8 max-w-[1100px]">{children}</main>
      </div>
    </div>
  );
}