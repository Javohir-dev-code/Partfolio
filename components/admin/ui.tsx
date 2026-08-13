"use client";
import { ReactNode } from "react";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin ${className}`}
    />
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  loading,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger" | "ghost";
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#4770FF] text-white hover:bg-[#3a5ce0]",
    outline:
      "border border-border bg-card text-head hover:border-[#4770FF] hover:text-[#4770FF]",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-p hover:text-head hover:bg-mini-card",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function Input({
  label,
  hint,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-semibold text-head mb-1.5">
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-lg border border-border bg-card text-head text-sm px-3.5 py-2.5 outline-none transition-colors focus:border-[#4770FF] focus:ring-2 focus:ring-[#4770FF]/20 ${className}`}
        {...props}
      />
      {hint && <span className="block text-xs text-p mt-1">{hint}</span>}
    </label>
  );
}

export function Textarea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-semibold text-head mb-1.5">
          {label}
        </span>
      )}
      <textarea
        className={`w-full rounded-lg border border-border bg-card text-head text-sm px-3.5 py-2.5 outline-none transition-colors focus:border-[#4770FF] focus:ring-2 focus:ring-[#4770FF]/20 min-h-[110px] resize-y ${className}`}
        {...props}
      />
    </label>
  );
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 accent-[#4770FF]"
        {...props}
      />
      {label && (
        <span className="text-sm font-medium text-head">{label}</span>
      )}
    </label>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full ${wide ? "max-w-2xl" : "max-w-lg"} bg-card rounded-2xl border border-border shadow-2xl my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h3 className="text-lg font-bold text-head">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-p hover:text-head hover:bg-mini-card transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-p mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Bekor qilish
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          O’chirish
        </Button>
      </div>
    </Modal>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-14">
      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-mini-card flex items-center justify-center text-p">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 6v5l3 2M11 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-sm font-medium text-p">{text}</p>
    </div>
  );
}