import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Chatbot } from "@/components/chatbot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stephen Chung - Full Stack Developer",
  description: "Full Stack Developer specializing in modern web applications, AI solutions, and cloud architecture. View my portfolio, experience, and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 transition-colors`}
      >
        <div className="min-h-screen">
          {/* Page Content */}
          <main className="h-screen">
            {children}
          </main>
          
          {/* Chatbot */}
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
