import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Sanskar Dhungana | Frontend / Full Stack Developer",
  description:
    "Portfolio of Sanskar Dhungana, a frontend-focused full-stack developer from Nepal building scalable web products with React, Next.js, TypeScript, FastAPI, Node.js, and modern backend systems.",
  keywords:
    "Sanskar Dhungana, Frontend Developer Nepal, Full Stack Developer Nepal, React Developer, Next.js Developer, TypeScript Developer, FastAPI Developer, Portfolio",
  authors: [{ name: "Sanskar Dhungana" }],
  creator: "Sanskar Dhungana",
  openGraph: {
    title: "Sanskar Dhungana | Frontend / Full Stack Developer",
    description:
      "Frontend-focused full-stack developer building scalable dashboards, web apps, and backend-integrated systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanskar Dhungana | Frontend / Full Stack Developer",
    description:
      "React, Next.js, TypeScript, FastAPI, Node.js, dashboards, and scalable web systems.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-fira-code antialiased">{children}</body>
    </html>
  );
}
