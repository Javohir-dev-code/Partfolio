import {
  IProject,
  ISkill,
  IExperience,
  IBlog,
  ICertificate,
  ISiteSettings,
} from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SETTINGS } from "@/lib/settings";
export { DEFAULT_SETTINGS };

export const mockExperiences: IExperience[] = [];

export const mockSkills: ISkill[] = [
  { id: "1", name: "HTML5", file: "html", ext: "svg", order_index: 1, created_at: "" },
  { id: "2", name: "CSS3", file: "css", ext: "svg", order_index: 2, created_at: "" },
  { id: "3", name: "Sass/SCSS", file: "sass", ext: "svg", order_index: 3, created_at: "" },
  { id: "4", name: "JavaScript", file: "javascript", ext: "svg", order_index: 4, created_at: "" },
  { id: "5", name: "Git", file: "git", ext: "svg", order_index: 5, created_at: "" },
  { id: "6", name: "GitHub", file: "github", ext: "svg", order_index: 6, created_at: "" },
];

export const mockProjects: IProject[] = [];

export const mockBlogs: IBlog[] = [
  {
    id: "1",
    title: "The Complete Guide to Web Performance Optimization",
    slug: "web-performance-optimization",
    date: "Dec 1, 2023",
    image: "bg-gradient-to-br from-[#2D6C95] to-[#2B1B54]",
    tag: "Performance",
    read_time: "16 min read",
    content: "Web performance is crucial...",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Modern CSS Layout Techniques: Grid, Flexbox, and Beyond",
    slug: "modern-css-layout-techniques",
    date: "Nov 25, 2023",
    image: "bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF]",
    tag: "CSS",
    read_time: "11 min read",
    content: "CSS has evolved...",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Next.js 14: New Features and Performance Improvements",
    slug: "nextjs-14-new-features",
    date: "Nov 20, 2023",
    image: "bg-gradient-to-br from-[#4ADE80] to-[#2DD4BF]",
    tag: "Next.js",
    read_time: "14 min read",
    content: "Next.js 14 brings...",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "TypeScript Best Practices Every Developer Should Know in 2024",
    slug: "typescript-best-practices-2024",
    date: "Nov 15, 2023",
    image: "bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9]",
    tag: "TypeScript",
    read_time: "10 min read",
    content: "TypeScript is amazing...",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Mastering React Hooks: A Complete Guide for Developers",
    slug: "mastering-react-hooks",
    date: "Nov 10, 2023",
    image: "bg-gradient-to-br from-[#F472B6] to-[#E11D48]",
    tag: "React",
    read_time: "12 min read",
    content: "React hooks are powerful...",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Linux Command Line Mastery for Frontend Developers",
    slug: "linux-command-line-frontend",
    date: "Nov 5, 2023",
    image: "bg-gradient-to-br from-[#1E293B] to-[#0F172A]",
    tag: "Linux",
    read_time: "8 min read",
    content: "Linux commands you should know...",
    created_at: new Date().toISOString(),
  }
];

export const mockCertificates: ICertificate[] = [];

async function withSupabase<T>(table: string, fallback: () => Promise<T>): Promise<T> {
  if (!isSupabaseConfigured()) {
    return fallback();
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) return data as T;
    return fallback();
  } catch (e) {
    console.error(`[supabase] ${table} fetch failed, using mock:`, e);
    return fallback();
  }
}

export async function getExperiences(): Promise<IExperience[]> {
  return withSupabase<IExperience[]>("experiences", async () => mockExperiences);
}

export async function getSkills(): Promise<ISkill[]> {
  return withSupabase<ISkill[]>("skills", async () => mockSkills);
}

export async function getProjects(): Promise<IProject[]> {
  return withSupabase<IProject[]>("projects", async () => mockProjects);
}

export async function getBlogs(): Promise<IBlog[]> {
  return withSupabase<IBlog[]>("blogs", async () => mockBlogs);
}

export async function getCertificates(): Promise<ICertificate[]> {
  return withSupabase<ICertificate[]>("certificates", async () => mockCertificates);
}

export async function getSettings(): Promise<ISiteSettings> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_SETTINGS;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return { ...DEFAULT_SETTINGS, ...(data ?? {}) };
  } catch (e) {
    console.error("[supabase] site_settings fetch failed:", e);
    return DEFAULT_SETTINGS;
  }
}