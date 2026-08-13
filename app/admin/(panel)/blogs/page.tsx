import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "blogs",
  title: "Blog postlar",
  singular: "Post",
  folder: "blogs",
  searchKeys: ["title", "tag"],
  fields: [
    { name: "title", label: "Sarlavha", type: "text", required: true, full: true },
    { name: "slug", label: "Slug (URL)", type: "text", hint: "Masalan: web-performance-guide — bo'sh qolsa /blog/ sahifasida # ko'rinadi" },
    { name: "tag", label: "Teg (kategoriya)", type: "text", hint: "Masalan: Next.js, React, CSS" },
    { name: "image", label: "Rasm yoki gradient", type: "image", full: true, hint: "Rasm yuklang YOKI gradient yozing: bg-gradient-to-br from-[#2D6C95] to-[#2B1B54] (bg- bilan boshlansa gradient ishlaydi)" },
    { name: "read_time", label: "O'qish vaqti", type: "text", hint: "Masalan: 16 min read" },
    { name: "date", label: "Sana", type: "text", hint: "Masalan: Dec 1, 2023" },
    { name: "content", label: "Kontent", type: "textarea", full: true },
    { name: "order_index", label: "Tartib raqami", type: "number" },
  ],
};

export const dynamic = "force-dynamic";

export default function BlogsPage() {
  return <ResourceManager config={config} />;
}