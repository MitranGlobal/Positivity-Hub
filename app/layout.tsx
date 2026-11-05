import type { Metadata, Viewport } from "next";
import "@fontsource/young-serif/400.css";
import "@fontsource-variable/figtree";
import "./globals.css";
import { LEAD_STORAGE_KEY } from "@/lib/lead";

export const metadata: Metadata = {
  title: "Positivity Hub — Online mental wellness course by Mitran Global",
  description:
    "MiTran Global Positivity Hub helps teens aged 11 to 17 build confidence, manage emotions, overcome challenges and develop a positive mindset. ₹1,999.",
  openGraph: {
    title: "Positivity Hub",
    description: "An online mental wellness course by Mitran Global.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Hide the sign-up popup before first paint for visitors who already filled it in. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem(${JSON.stringify(LEAD_STORAGE_KEY)}))document.documentElement.dataset.lead="1"}catch(e){}` }} />
        {/* Without JavaScript the form can't be sent, so don't trap those visitors behind it. */}
        <noscript>
          <style>{`#lead-gate{display:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
