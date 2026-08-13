"use client";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Spinner } from "@/components/admin/ui";

export function ImageField({
  value,
  onChange,
  label,
  hint,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
  hint?: string;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "png";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Yuklashda xato");
    } finally {
      setUploading(false);
    }
  }

  const isUrl = value.startsWith("http") || value.startsWith("/");

  return (
    <div>
      <span className="block text-[13px] font-semibold text-head mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {value && isUrl && (
          <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-border bg-mini-card flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="prev"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? <Spinner /> : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M3 5l4-4 4 4M1 9v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {uploading ? "Yuklanmoqda..." : "Rasm yuklash"}
            </Button>
            {value && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange("")}
              >
                O’chirish
              </Button>
            )}
          </div>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Yoki URL qo'ying..."
          />
          {hint && <span className="text-xs text-p">{hint}</span>}
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}