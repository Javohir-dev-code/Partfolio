# Javohir Turayev — Portfolio

Frontend developer portfolio (Next.js + Supabase) with a full admin panel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill in Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
TELEGRAM_BOT_TOKEN=           # optional, for contact form notifications
TELEGRAM_CHAT_ID=
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run everything from `supabase/schema.sql`
3. Create an admin user via **Authentication → Users → Add user** (email + password)
4. Copy the project URL and anon key into `.env.local`

## Admin panel

Admin is available at `/admin` — sign in with the admin user created above.

## Build

```bash
npm run build
npm run start
```
