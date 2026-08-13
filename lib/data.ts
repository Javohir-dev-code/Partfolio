import {
  IProject,
  ISkill,
  IExperience,
  IBlog,
  ICertificate,
} from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const mockExperiences: IExperience[] = [
  {
    id: "1",
    date: "2026 - Present",
    title: "Frontend Developer & Mentor",
    company: "Open Web Academy",
    logo: "/assets/img/projects/owa-logo.png",
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    date: "2025",
    title: "Founder & Frontend Developer",
    company: "Typex.uz",
    logo: "/assets/img/projects/typex-logo.png",
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    date: "2025 - 2026",
    title: "Founder & Frontend Developer",
    company: "Eko-gps.uz",
    logo: "/assets/img/projects/eco-gps-logo.png",
    order_index: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    date: "2026 - Present",
    title: "Frontend Developer",
    company: "UzbekUSA.com",
    logo: "/assets/img/projects/uzbekusa-logo.png",
    order_index: 4,
    created_at: new Date().toISOString(),
  }
];

export const mockSkills: ISkill[] = [
  { id: "1", name: "Python", file: "python", ext: "svg", order_index: 1, created_at: "" },
  { id: "2", name: "JavaScript", file: "javascript", ext: "svg", order_index: 2, created_at: "" },
  { id: "3", name: "TypeScript", file: "typescript", ext: "svg", order_index: 3, created_at: "" },
  { id: "6", name: "React.js", file: "react", ext: "svg", order_index: 4, created_at: "" },
  { id: "18", name: "React Router", file: "reactrouter", ext: "svg", order_index: 5, created_at: "" },
  { id: "19", name: "React Hook Form", file: "react-hook-form", ext: "svg", order_index: 6, created_at: "" },
  { id: "17", name: "Linux", file: "linux", ext: "svg", order_index: 7, created_at: "" },
  { id: "7", name: "Next.js", file: "nextjs", ext: "svg", order_index: 8, created_at: "" },
  { id: "4", name: "HTML5", file: "html", ext: "svg", order_index: 9, created_at: "" },
  { id: "5", name: "CSS3", file: "css", ext: "svg", order_index: 10, created_at: "" },
  { id: "8", name: "Tailwind CSS", file: "tailwind", ext: "svg", order_index: 11, created_at: "" },
  { id: "9", name: "Sass/SCSS", file: "sass", ext: "svg", order_index: 12, created_at: "" },
  { id: "10", name: "Bootstrap", file: "bootstrap", ext: "svg", order_index: 13, created_at: "" },
  { id: "11", name: "SQL", file: "sql", ext: "svg", order_index: 14, created_at: "" },
  { id: "12", name: "REST API", file: "api", ext: "svg", order_index: 15, created_at: "" },
  { id: "13", name: "Figma", file: "figma", ext: "svg", order_index: 16, created_at: "" },
  { id: "14", name: "Git", file: "git", ext: "svg", order_index: 17, created_at: "" },
  { id: "15", name: "GitHub", file: "github", ext: "svg", order_index: 18, created_at: "" },
  { id: "16", name: "GitLab", file: "gitlab", ext: "svg", order_index: 19, created_at: "" }
];

export const mockProjects: IProject[] = [
  {
    id: "1",
    title: "Typex.uz",
    subtitle: "Typing test platformasi - Asoschi",
    image: "/assets/img/projects/typex-dark.png",
    image_light: "/assets/img/projects/typex-light.png",
    detail_link: "https://typex.uz",
    site_link: "https://typex.uz",
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Eko-gps.uz",
    subtitle: "Eco GPS control (Mashinalar uchun) - Asoschi",
    image: "/assets/img/projects/eco-gps.png",
    image_light: "/assets/img/projects/eco-gps-light.png",
    detail_link: "https://eko-gps.uz",
    site_link: "https://eko-gps.uz",
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "UzbekUSA",
    subtitle: "UzbekUSA platformasi - Frontend Dasturchi",
    image: "/assets/img/projects/uzbekusa-dark.png",
    image_light: "/assets/img/projects/uzbekusa-light.png",
    detail_link: "https://uzbekusa.com",
    site_link: "https://uzbekusa.com",
    order_index: 3,
    created_at: new Date().toISOString(),
  }
];

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

export const mockCertificates: ICertificate[] = [
  {
    id: "1",
    title: "Open Web Academy (OWA) Certificate",
    issuer: "Open Web Academy",
    date: "2025",
    image: "https://lms.owa.uz/cert_images/067f85fa-eacd-4e90-b687-002639a261c6.png",
    credential_link: "https://lms.owa.uz",
    order_index: 1,
    created_at: new Date().toISOString(),
  }
];

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