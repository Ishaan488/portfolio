import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishaan Bajpai — Software Engineer",
  description: "Portfolio of Ishaan Bajpai — full-stack engineer building AI-native products, agentic systems and thoughtful interfaces.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
