"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { ISiteSettings } from "@/types";

export function useSiteSettings() {
  const [settings, setSettings] = useState<ISiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .maybeSingle();
        if (!cancelled && !error && data) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        }
      } catch {
        /* fallback to defaults */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading };
}