"use client";
import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem("folio_visited")) {
        timer = setTimeout(() => setHidden(true), 0);
      } else {
        sessionStorage.setItem("folio_visited", "1");
        timer = setTimeout(() => setHidden(true), 1500);
      }
    } catch {
      timer = setTimeout(() => setHidden(true), 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-background transition-opacity duration-700 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-[#4770FF]/20 border-t-[#4770FF] animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-[#4770FF]/20 border-b-[#4770FF] animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-[#4770FF]">JT</span>
          </div>
        </div>
        <div className="w-40 h-1 bg-mini-card rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4770FF] rounded-full"
            style={{ animation: "preloaderBar 1.3s ease-in-out forwards" }}
          />
        </div>
        <span className="text-sm font-medium text-p tracking-widest uppercase">
          Javohir Turayev
        </span>
      </div>
    </div>
  );
}