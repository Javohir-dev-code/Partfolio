import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "projects",
  title: "Loyihalar (Portfolio)",
  singular: "Loyiha",
  folder: "projects",
  searchKeys: ["title", "subtitle"],
  fields: [
    { name: "title", label: "Loyiha nomi", type: "text", required: true, hint: "Masalan: Typex.uz" },
    { name: "subtitle", label: "Tavsif", type: "text", full: true, hint: "Masalan: Typing test platformasi - Asoschi" },
    { name: "image", label: "Rasm (dark mode)", type: "image" },
    { name: "image_light", label: "Rasm (light mode)", type: "image" },
    { name: "detail_link", label: "Detail link", type: "text", hint: "Masalan: https://example.com" },
    { name: "site_link", label: "Sayt linki", type: "text", hint: "Masalan: https://example.com" },
    { name: "order_index", label: "Tartib raqami", type: "number", hint: "Kichik raqam oldinroq chiqadi" },
  ],
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return <ResourceManager config={config} />;
}