import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "skills",
  title: "Texnologiyalar (Skills)",
  singular: "Texnologiya",
  folder: "skills",
  searchKeys: ["name"],
  fields: [
    { name: "name", label: "Nomi", type: "text", required: true, hint: "Masalan: Next.js" },
    { name: "file", label: "Ikonka rasmi (yoki fayl nomi)", type: "image", hint: "Rasm yuklang. Yoki public ichidagi bo'lsa nomini qoldiring (masalan: nextjs)" },
    { name: "ext", label: "Kengaytma (Faqat eski usul uchun)", type: "text", hint: "Yangi yuklangan rasm uchun bo'sh qoldiring" },
    { name: "order_index", label: "Tartib raqami", type: "number" },
  ],
};

export const dynamic = "force-dynamic";

export default function SkillsPage() {
  return <ResourceManager config={config} />;
}