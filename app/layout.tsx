import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brainwave — AI Chatbot & Image Generation Platform",
  description:
    "Brainwave unlocks the potential of AI-powered applications — chatbots, image generation, code assistance, and much more. Supercharge your creativity and productivity.",
  keywords: ["AI", "chatbot", "image generation", "brainwave", "artificial intelligence"],
  openGraph: {
    title: "Brainwave — AI Platform",
    description: "Explore the future of AI with Brainwave.",
    images: ["/hero/robot.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0e0c15] text-white antialiased">{children}</body>
    </html>
  );
}
