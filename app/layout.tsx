import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "مدرسة ابن سينا الخاصة - Ecole Privee Avicenne",
  description: "منصة إدارة مدرسية متكاملة لمدرسة ابن سينا الخاصة بقفصة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-gray-50 ${inter.variable} ${notoSansArabic.variable}`}>
        {children}
      </body>
    </html>
  );
}
