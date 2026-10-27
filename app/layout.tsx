import type { Metadata, Viewport } from "next";
import "@fontsource/young-serif/400.css";
import "@fontsource-variable/figtree";
import "./globals.css";

export const metadata: Metadata = {
  title: "Positivity Hub — Online mental wellness course by Mitran Global",
  description:
    "Elevate your mind and spirit with an online mental wellness course: mindfulness, coping strategies for anxiety, resilience and healthier relationships. Lifetime access from ₹1,499.",
  openGraph: {
    title: "Positivity Hub",
    description: "An online mental wellness course by Mitran Global.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#EEF3F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
