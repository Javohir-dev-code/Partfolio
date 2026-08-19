import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "experiences",
  title: "Ish tajriba",
  singular: "Tajriba",
  folder: "experiences",
  searchKeys: ["title", "company"],
  fields: [
    { name: "title", label: "Lavozim", type: "text", required: true, hint: "Masalan: Frontend Developer & Mentor" },
    { name: "company", label: "Kompaniya", type: "text", required: true, hint: "Masalan: Open Web Academy" },
    { name: "date", label: "Davr", type: "text", hint: "Masalan: 2026 - Present" },
    { name: "logo", label: "Logo", type: "image", hint: "Yoki logo fayl yo'li: /assets/img/logo.png" },
    { name: "order_index", label: "Tartib raqami", type: "number" },
  ],
};

export const dynamic = "force-dynamic";

export default function ExperiencesPage() {
  return <ResourceManager config={config} />;
}