import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jkjkjkjkjk72-ux.github.io/video-portfolio"),
  title: {
    default: "Studio — Video Director",
    template: "%s — Studio",
  },
  description:
    "Multi-genre video portfolio. Commercials, documentaries, music videos, and short films based in Seoul.",
  keywords: [
    "video director",
    "cinematographer",
    "commercial director",
    "documentary",
    "music video",
    "Seoul",
    "영상 감독",
    "촬영감독",
  ],
  authors: [{ name: "Studio" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Studio",
    title: "Studio — Video Director",
    description:
      "Multi-genre video portfolio. Commercials, documentaries, music videos, and short films based in Seoul.",
    images: [
      {
        url: "https://placehold.co/1200x630/0a0a0a/f5f5f5?text=Studio",
        width: 1200,
        height: 630,
        alt: "Studio — Video Director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio — Video Director",
    description:
      "Multi-genre video portfolio. Commercials, documentaries, music videos, and short films based in Seoul.",
    images: ["https://placehold.co/1200x630/0a0a0a/f5f5f5?text=Studio"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
