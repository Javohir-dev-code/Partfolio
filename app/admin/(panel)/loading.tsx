import { Spinner } from "@/components/admin/ui";

export default function Loading() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 text-p">
      <Spinner />
      <p className="text-sm font-medium animate-pulse">Ma'lumotlar yuklanmoqda...</p>
    </div>
  );
}
