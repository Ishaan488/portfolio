import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ishaan Bajpai — Full-Stack Developer",
  description:
    "Personal portfolio of Ishaan Bajpai — Full-Stack Developer passionate about creating efficient, scalable, and user-friendly digital experiences.",
  openGraph: {
    title: "Ishaan Bajpai — Full-Stack Developer",
    description:
      "Full-Stack Developer passionate about creating efficient, scalable, and user-friendly digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
