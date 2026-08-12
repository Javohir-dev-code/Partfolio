import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = String(body.name ?? "").slice(0, 200);
    const email = String(body.email ?? "").slice(0, 200);
    const subject = String(body.subject ?? "").slice(0, 300);
    const message = String(body.message ?? "").slice(0, 2000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const text = [
      `Yangi Xabar (Portfolio):`,
      `<b>Ism:</b> ${name}`,
      `<b>Email:</b> ${email}`,
      `<b>Mavzu:</b> ${subject || "-"}`,
      `<b>Xabar:</b> ${message}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "html",
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Telegram error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}