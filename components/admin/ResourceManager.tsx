"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Checkbox, ConfirmModal, EmptyState, Input, Modal, Textarea } from "@/components/admin/ui";
import { ImageField } from "@/components/admin/ImageField";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "image";

export interface ResourceField {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  full?: boolean;
}

export interface ResourceConfig {
  table: string;
  title: string;
  singular: string;
  folder: string;
  fields: ResourceField[];
  searchKeys: string[];
}

interface Row {
  id: string;
  [key: string]: unknown;
}

function toFormValue(row: Row | null, fields: ResourceField[]) {
  const form: Record<string, unknown> = {};
  for (const f of fields) {
    form[f.name] = row ? (row[f.name] ?? "") : f.type === "number" ? 0 : f.type === "checkbox" ? false : "";
  }
  return form;
}

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const supabase = useMemo(() => (typeof window !== "undefined" ? createClient() : null), []);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from(config.table)
        .select("*")
        .order("order_index", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: true });
      if (err) throw err;
      setRows((data ?? []) as Row[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ma'lumot yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, [supabase, config.table]);

  useEffect(() => {
    const timer = setTimeout(fetchAll, 0);
    return () => clearTimeout(timer);
  }, [fetchAll]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      config.searchKeys.some((key) =>
        String(row[key] ?? "").toLowerCase().includes(q)
      )
    );
  }, [rows, search, config.searchKeys]);

  function openCreate() {
    setEditingId(null);
    setForm(toFormValue(null, config.fields));
    setModalOpen(true);
  }

  function openEdit(row: Row) {
    setEditingId(row.id);
    setForm(toFormValue(row, config.fields));
    setModalOpen(true);
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {};
      const hasOrderField = config.fields.some((f) => f.name === "order_index");
      for (const f of config.fields) {
        let v = form[f.name];
        if (f.type === "checkbox") v = Boolean(v);
        if (f.type === "number") v = Number(v) || 0;
        if (f.type !== "checkbox" && f.type !== "number" && v === "") v = null;
        payload[f.name] = v;
      }

      if (editingId) {
        const { error: err } = await supabase
          .from(config.table)
          .update(payload)
          .eq("id", editingId);
        if (err) throw err;
      } else {
        if (hasOrderField && !payload["order_index"]) {
          const nextOrder =
            rows.length > 0
              ? Math.max(...rows.map((r) => Number(r.order_index ?? 0))) + 1
              : 1;
          payload["order_index"] = nextOrder;
        }
        const { error: err } = await supabase.from(config.table).insert(payload);
        if (err) throw err;
      }
      setModalOpen(false);
      await fetchAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Saqlashda xato");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!supabase) return;
    setSaving(true);
    try {
      const { error: err } = await supabase.from(config.table).delete().eq("id", id);
      if (err) throw err;
      setDeletingId(null);
      await fetchAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "O’chirishda xato");
    } finally {
      setSaving(false);
    }
  }

  async function move(id: string, dir: -1 | 1) {
    if (!supabase) return;
    const index = rows.findIndex((r) => r.id === id);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= rows.length) return;

    const reordered = [...rows];
    const [item] = reordered.splice(index, 1);
    reordered.splice(target, 0, item);

    const updates = reordered.map((r, i) =>
      supabase
        .from(config.table)
        .update({ order_index: i + 1 })
        .eq("id", r.id)
    );
    const results = await Promise.all(updates);
    if (results.some((r) => r.error)) {
      setError("Tartibni saqlashda xato");
      return;
    }
    await fetchAll();
  }

  const displayFields = config.fields.filter((f) => f.type !== "textarea" && f.type !== "image" && f.type !== "checkbox").slice(0, 3);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-head mb-1">{config.title}</h1>
          <p className="text-sm text-p">
            {rows.length} ta yozuv &middot; qidiruv, qo&apos;shish, tahrirlash, o&apos;chirish, tartiblash
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />
          <Button onClick={openCreate}>+ Yangi {config.singular.toLowerCase()}</Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-mini-card animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState text={search ? `"${search}" bo'yicha hech narsa topilmadi` : "Hozircha yozuv yo'q. Yangi qo'shing!"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="bg-card border border-border rounded-2xl p-5 transition-colors hover:border-[#4770FF]/50"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-head text-[15px] leading-snug line-clamp-2">
                    {String(row[config.searchKeys[0]] ?? "—")}
                  </h3>
                  {config.searchKeys[1] && (
                    <p className="text-xs text-p mt-1 line-clamp-2">
                      {String(row[config.searchKeys[1]] ?? "")}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <IconBtn onClick={() => move(row.id, -1)} title="Yuqoriga" disabled={rows.findIndex((r) => r.id === row.id) === 0}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </IconBtn>
                  <IconBtn onClick={() => move(row.id, 1)} title="Pastga" disabled={rows.findIndex((r) => r.id === row.id) === rows.length - 1}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </IconBtn>
                  <IconBtn onClick={() => openEdit(row)} title="Tahrirlash">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9.5 1.5l3 3L5 12H2V9L9.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </IconBtn>
                  <IconBtn onClick={() => setDeletingId(row.id)} title="O’chirish" danger>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11M5 3.5V2h4v1.5M3 3.5l.7 9h6.6l.7-9M5.5 6v4M8.5 6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </IconBtn>
                </div>
              </div>

              {displayFields.length > 0 && (
                <div className="space-y-1.5">
                  {displayFields.slice(1).map((f) => (
                    <div key={f.name} className="flex justify-between gap-2 text-xs">
                      <span className="text-p">{f.label}</span>
                      <span className="font-medium text-head text-right line-clamp-1">
                        {String(row[f.name] ?? "—")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? `${config.singular}ni tahrirlash` : `Yangi ${config.singular.toLowerCase()} qo'shish`}
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((f) => {
            const extraClass = f.full ? "md:col-span-2" : "";
            if (f.type === "textarea") {
              return (
                <div key={f.name} className={extraClass}>
                  <Textarea
                    label={f.label}
                    placeholder={f.placeholder}
                    value={String(form[f.name] ?? "")}
                    onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                    required={f.required}
                  />
                </div>
              );
            }
            if (f.type === "image") {
              return (
                <div key={f.name} className={extraClass}>
                  <ImageField
                    label={f.label}
                    hint={f.hint}
                    folder={config.folder}
                    value={String(form[f.name] ?? "")}
                    onChange={(url) => setForm((p) => ({ ...p, [f.name]: url }))}
                  />
                </div>
              );
            }
            if (f.type === "checkbox") {
              return (
                <div key={f.name} className={`flex items-end pb-1 ${extraClass}`}>
                  <Checkbox
                    label={f.label}
                    checked={Boolean(form[f.name])}
                    onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.checked }))}
                  />
                </div>
              );
            }
            return (
              <div key={f.name} className={extraClass}>
                <Input
                  label={f.label}
                  type={f.type === "number" ? "number" : "text"}
                  placeholder={f.placeholder}
                  hint={f.hint}
                  value={String(form[f.name] ?? "")}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                  required={f.required}
                />
              </div>
            );
          })}
        </div>
        {error && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Bekor qilish
          </Button>
          <Button onClick={save} loading={saving}>
            Saqlash
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        open={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && remove(deletingId)}
        loading={saving}
        title="O’chirishni tasdiqlang"
        message="Bu yozuv doimiy ravishda o'chiriladi. Davom etasizmi?"
      />
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default ${
        danger
          ? "text-p hover:text-red-500 hover:bg-red-500/10"
          : "text-p hover:text-head hover:bg-mini-card"
      }`}
    >
      {children}
    </button>
  );
}