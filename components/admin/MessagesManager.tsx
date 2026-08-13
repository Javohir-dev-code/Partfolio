"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, EmptyState } from "@/components/admin/ui";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function MessagesManager() {
  const supabase = useMemo(() => (typeof window !== "undefined" ? createClient() : null), []);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const fetchAll = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setMessages((data ?? []) as Message[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xabarlar yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    const timer = setTimeout(fetchAll, 0);
    return () => clearTimeout(timer);
  }, [fetchAll]);

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const filtered = filter === "unread" ? messages.filter((m) => !m.is_read) : messages;

  async function toggleRead(m: Message) {
    if (!supabase) return;
    await supabase.from("messages").update({ is_read: !m.is_read }).eq("id", m.id);
    setMessages((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, is_read: !x.is_read } : x))
    );
    if (selected?.id === m.id) setSelected({ ...m, is_read: !m.is_read });
  }

  async function remove(id: string) {
    if (!supabase) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-head mb-1">Xabarlar</h1>
          <p className="text-sm text-p">
            {messages.length} ta xabar &middot; {unreadCount} ta o&apos;qilmagan
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filter === "all" ? "bg-[#4770FF]/10 text-[#4770FF]" : "text-p hover:text-head"
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filter === "unread" ? "bg-[#4770FF]/10 text-[#4770FF]" : "text-p hover:text-head"
            }`}
          >
            O’qilmagan {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 rounded-xl bg-mini-card animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState text="Xabarlar yo'q" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelected(m)}
              className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all hover:border-[#4770FF]/60 ${
                m.is_read ? "border-border" : "border-[#4770FF]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#4770FF]/10 text-[#4770FF] flex items-center justify-center font-bold text-sm">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-head text-sm truncate">{m.name}</h3>
                    <p className="text-xs text-p truncate">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!m.is_read && <span className="w-2 h-2 rounded-full bg-[#4770FF]" />}
                  <span className="text-[11px] text-p whitespace-nowrap">{formatDate(m.created_at)}</span>
                </div>
              </div>
              {m.subject && (
                <p className="text-[13px] font-semibold text-head mb-1">{m.subject}</p>
              )}
              <p className="text-[13px] text-p line-clamp-2 leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-xl bg-card rounded-2xl border border-border shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-head">{selected.name}</h3>
                <p className="text-xs text-p">
                  {selected.email} · {formatDate(selected.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-p hover:text-head hover:bg-mini-card transition-colors cursor-pointer"
                aria-label="Yopish"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              {selected.subject && (
                <p className="text-sm font-bold text-head mb-3">{selected.subject}</p>
              )}
              <p className="text-sm text-p leading-relaxed whitespace-pre-wrap mb-6">
                {selected.message}
              </p>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => toggleRead(selected)}>
                  {selected.is_read ? "O’qilmagan qilish" : "O’qilgan deb belgilash"}
                </Button>
                <Button variant="danger" onClick={() => remove(selected.id)}>
                  O’chirish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}