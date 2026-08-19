import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const resources = [
  { href: "/admin/projects", label: "Loyihalar", table: "projects", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { href: "/admin/blogs", label: "Blog postlar", table: "blogs", icon: "M4 2h13a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V2zm14 7h-6M14 12h-2M14 15h-2" },
  { href: "/admin/skills", label: "Texnologiyalar", table: "skills", icon: "m8 9-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" },
  { href: "/admin/experiences", label: "Ish tajriba", table: "experiences", icon: "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" },
  { href: "/admin/certificates", label: "Sertifikatlar", table: "certificates", icon: "M22 9h-5M18 5l4 4-4 4M1 3h4v18H1zM5 3h10v18H5zM9 8h2M9 12h2M9 16h2" },
  { href: "/admin/messages", label: "Xabarlar", table: "messages", icon: "M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5zM9 10h6M9 14h4" },
  { href: "/admin/settings", label: "Profil sozlamalari", table: "site_settings", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0" },
];

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const counts: Record<string, number> = {};
  for (const r of resources) {
    const { count } = await supabase
      .from(r.table)
      .select("*", { count: "exact", head: true });
    counts[r.table] = count ?? 0;
  }

  const { data: unread } = await supabase
    .from("messages")
    .select("id")
    .eq("is_read", false)
    .limit(100);

  const unreadCount = unread?.length ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-head mb-1">Dashboard</h1>
        <p className="text-sm text-p">Sayt kontentini boshqaring - o&apos;zgarishlar darhol saytda ko&apos;rinadi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <Link
            key={r.table}
            href={r.href}
            className="group bg-card border border-border rounded-2xl p-5 no-underline transition-all hover:border-[#4770FF] hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#4770FF]/10 text-[#4770FF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={r.icon} />
                </svg>
              </div>
              {r.table === "messages" && unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[11px] font-bold">
                  {unreadCount} yangi
                </span>
              )}
            </div>
            <h3 className="font-bold text-head mb-0.5">{r.label}</h3>
            <p className="text-sm text-p">
              <span className="text-xl font-bold text-[#4770FF]">{counts[r.table]}</span>{" "}
              ta yozuv
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-p group-hover:text-[#4770FF] transition-colors">
              Boshqarish
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}