import { ImageResponse } from "next/og";

export const alt = "La Vivenzia — Experience every journey through its soul";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundColor: "#080806",
          backgroundImage:
            "radial-gradient(ellipse at 50% 40%, rgba(198,148,59,0.18) 0%, transparent 65%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 12,
            color: "#C6943B",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Coming Soon
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            color: "#F8E7A9",
            letterSpacing: 4,
            marginBottom: 28,
          }}
        >
          La Vivenzia
        </div>

        <div
          style={{
            display: "flex",
            width: 180,
            height: 2,
            backgroundColor: "#C6943B",
            marginBottom: 32,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#D7AE63",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Experience every journey through its soul
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 6,
            color: "#A89C8B",
            textTransform: "uppercase",
            marginTop: 56,
          }}
        >
          By Invitation Only · Curated Luxury
        </div>
      </div>
    ),
    size
  );
}
