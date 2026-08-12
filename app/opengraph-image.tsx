import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zuxriddin Hasanov - Frontend Developer & Mentor";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f1220 0%, #1A1F2C 55%, #20306b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 168,
            height: 168,
            borderRadius: 999,
            backgroundColor: "#4770FF",
            fontSize: 84,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          ZH
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 76,
            fontWeight: 800,
            color: "#f0f2f5",
            letterSpacing: 1,
          }}
        >
          Zuxriddin Hasanov
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 40,
            fontWeight: 600,
            color: "#7fa0ff",
          }}
        >
          Frontend Developer &amp; Mentor
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 26,
            fontWeight: 500,
            color: "#9aa3b2",
          }}
        >
          React · Next.js · TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}