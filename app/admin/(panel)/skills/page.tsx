import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "skills",
  title: "Texnologiyalar (Skills)",
  singular: "Texnologiya",
  folder: "skills",
  searchKeys: ["name"],
  fields: [
    { name: "name", label: "Nomi", type: "text", required: true, hint: "Masalan: Next.js" },
    { name: "file", label: "Ikonka fayl nomi", type: "text", hint: "public/assets/img/icons/ ichidagi fayl nomi (nextjs)" },
    { name: "ext", label: "Kengaytma", type: "text", hint: "svg / png" },
    { name: "order_index", label: "Tartib raqami", type: "number" },
  ],
};

export const dynamic = "force-dynamic";

export default function SkillsPage() {
  return <ResourceManager config={config} />;
}