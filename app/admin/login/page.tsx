"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button, Input } from "@/components/admin/ui";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setup = searchParams.get("setup") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured() && !setup) {
      router.replace("/admin/login?setup=1");
    }
  }, [router, setup]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login xato");
        return;
      }
      const from = searchParams.get("from");
      router.push(from?.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Server bilan ulanishda xato");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-11 h-11 rounded-xl bg-[#4770FF] flex items-center justify-center text-white text-lg font-black">
              A
            </span>
            <div>
              <h1 className="text-xl font-bold text-head leading-tight">Admin Panel</h1>
              <p className="text-xs text-p">Portfolio boshqaruvi</p>
            </div>
          </div>

          {setup && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[13px] text-amber-600 leading-relaxed">
              <b>Sozlash kerak:</b> <code className="font-mono">.env.local</code> faylida{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> va{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
              qiymatlarini kiriting, s’ng serverni qayta ishga tushiring. SQL jadvali:{" "}
              <code className="font-mono">supabase/schema.sql</code>
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label="Parol"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Kirish..." : "Kirish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}