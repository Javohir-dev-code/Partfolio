import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; password?: string };
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email va parol kerak" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase sozlanmagan. .env.local ga NEXT_PUBLIC_SUPABASE_URL va NEXT_PUBLIC_SUPABASE_ANON_KEY kiriting." },
        { status: 503 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json(
        { error: "Login xato: " + error.message },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[auth] login error:", e);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}