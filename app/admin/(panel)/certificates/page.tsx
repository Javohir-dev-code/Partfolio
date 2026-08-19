import { ResourceManager, ResourceConfig } from "@/components/admin/ResourceManager";

const config: ResourceConfig = {
  table: "certificates",
  title: "Sertifikatlar",
  singular: "Sertifikat",
  folder: "certificates",
  searchKeys: ["title", "issuer"],
  fields: [
    { name: "title", label: "Sertifikat nomi", type: "text", required: true, full: true },
    { name: "issuer", label: "Kim tomonidan berilgan", type: "text", hint: "Masalan: Open Web Academy" },
    { name: "date", label: "Yil", type: "text", hint: "Masalan: 2025" },
    { name: "image", label: "Sertifikat rasmi", type: "image", full: true },
    { name: "credential_link", label: "Tekshirish linki", type: "text", hint: "Masalan: https://example.com" },
    { name: "order_index", label: "Tartib raqami", type: "number" },
  ],
};

export const dynamic = "force-dynamic";

export default function CertificatesPage() {
  return <ResourceManager config={config} />;
}