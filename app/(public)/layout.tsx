import { Navbar } from "@/components/public/Navbar";

const particles = [
  { top: "6%", left: "8%", size: 7, duration: "7s", delay: "0s" },
  { top: "12%", left: "48%", size: 4, duration: "8s", delay: "1.8s" },
  { top: "18%", left: "82%", size: 5, duration: "9s", delay: "1.4s" },
  { top: "26%", left: "22%", size: 4, duration: "8.5s", delay: "0.6s" },
  { top: "33%", left: "92%", size: 8, duration: "10s", delay: "2.2s" },
  { top: "40%", left: "12%", size: 5, duration: "7.5s", delay: "3s" },
  { top: "47%", left: "60%", size: 4, duration: "9.5s", delay: "1s" },
  { top: "54%", left: "35%", size: 6, duration: "8s", delay: "2.6s" },
  { top: "60%", left: "88%", size: 5, duration: "7s", delay: "0.4s" },
  { top: "66%", left: "5%", size: 7, duration: "9s", delay: "1.2s" },
  { top: "72%", left: "45%", size: 4, duration: "8.5s", delay: "3.4s" },
  { top: "78%", left: "70%", size: 6, duration: "7.5s", delay: "0.9s" },
  { top: "84%", left: "15%", size: 5, duration: "9.5s", delay: "2s" },
  { top: "89%", left: "55%", size: 4, duration: "8s", delay: "1.6s" },
  { top: "93%", left: "90%", size: 7, duration: "10s", delay: "0.3s" },
  { top: "9%", left: "93%", size: 4, duration: "7s", delay: "2.8s" },
  { top: "35%", left: "75%", size: 5, duration: "9s", delay: "0.2s" },
  { top: "58%", left: "50%", size: 4, duration: "8.5s", delay: "2.4s" },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Light mode: yumshoq rangli blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden" aria-hidden>
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(71,112,255,0.16),transparent_65%)]"
          style={{ animation: "blobDrift 18s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 -right-48 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_65%)]"
          style={{ animation: "blobDrift 22s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute -bottom-48 left-1/4 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.13),transparent_65%)]"
          style={{ animation: "blobDrift 26s ease-in-out infinite" }}
        />
      </div>

      {/* Mayda zarracha nuqtalar foni */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#A9B8DC] dark:bg-[#6f8fff] shadow-[0_0_8px_rgba(71,112,255,0.35)] dark:shadow-[0_0_10px_rgba(111,143,255,0.8)]"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `particleDrift ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <Navbar />
      <main className="max-w-[1300px] mx-auto px-3">
        {children}
      </main>
    </div>
  );
}