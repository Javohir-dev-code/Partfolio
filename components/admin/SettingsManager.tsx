"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { ISiteSettings } from "@/types";
import { Button, Input } from "@/components/admin/ui";
import { ImageField } from "@/components/admin/ImageField";

export function SettingsManager() {
  const supabase = useMemo(() => (typeof window !== "undefined" ? createClient() : null), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [form, setForm] = useState<ISiteSettings>({ ...DEFAULT_SETTINGS });

  const set = (key: keyof ISiteSettings, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const fetchSettings = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (err) throw err;
      if (data) {
        setRowId(data.id);
        setForm({ ...DEFAULT_SETTINGS, ...data });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sozlamalar yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(fetchSettings, 0);
    return () => clearTimeout(timer);
  }, [fetchSettings]);

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const payload: Omit<ISiteSettings, "id" | "updated_at"> = {
        full_name: form.full_name || DEFAULT_SETTINGS.full_name,
        role: form.role,
        avatar_url: form.avatar_url,
        phone: form.phone,
        telegram: form.telegram,
        instagram: form.instagram,
        github: form.github,
      };
      let err: { message: string } | null = null;
      if (rowId) {
        const { error } = await supabase
          .from("site_settings")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", rowId);
        err = error;
      } else {
        const { error } = await supabase.from("site_settings").insert(payload);
        err = error;
      }
      if (err) throw err;
      setSuccess(true);
      await fetchSettings();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Saqlashda xato");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-head mb-1">Profil sozlamalari</h1>
        <p className="text-sm text-p">
          Ism, rasm, telefon va ijtimoiy tarmoq linklari — darhol saytda ko&apos;rinadi.
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-600">
          Saqlandi — saytda yangilandi.
        </div>
      )}

      {loading ? (
        <div className="h-64 rounded-xl bg-mini-card animate-pulse" />
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl">
          <div className="space-y-5">
            <ImageField
              label="Profil rasmi (avatar)"
              hint="Rasm yuklang — saytning hamma joyida shu rasm ko'rinadi (Profil kartasi, About)"
              folder="profile"
              value={form.avatar_url}
              onChange={(url) => set("avatar_url", url)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="To'liq ism"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                placeholder="Javohir Turayev"
              />
              <Input
                label="Lavozim (role)"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="Front-end Developer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Telefon"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+998 97 070 17 02"
              />
              <Input
                label="Telegram"
                value={form.telegram}
                onChange={(e) => set("telegram", e.target.value)}
                placeholder="https://t.me/turayevdev"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Instagram"
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                placeholder="https://instagram.com/username"
              />
              <Input
                label="GitHub"
                value={form.github}
                onChange={(e) => set("github", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button onClick={save} loading={saving}>
                Saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}