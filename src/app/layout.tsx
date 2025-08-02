import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zyprexa Survivors Guide - Complete Resource Directory",
  description: "Comprehensive guide for Zyprexa survivors including treatment options, recovery strategies, and advocacy resources. Evidence-based information for neurological and metabolic recovery.",
  keywords: "Zyprexa, olanzapine, survivors guide, recovery, treatment, neurological damage, metabolic dysfunction, betahistine, GLP-1 agonists, ketogenic diet",
  authors: [{ name: "Zyprexa Survivors Resource" }],
  openGraph: {
    title: "Zyprexa Survivors Guide - Complete Resource Directory",
    description: "Comprehensive guide for Zyprexa survivors including treatment options, recovery strategies, and advocacy resources.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zyprexa Survivors Guide - Complete Resource Directory",
    description: "Comprehensive guide for Zyprexa survivors including treatment options, recovery strategies, and advocacy resources.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}