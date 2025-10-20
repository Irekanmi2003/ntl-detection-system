import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "NTL Detection System",
  description: "For detecting abnormalities in energy consumption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <head>
            {/* ✅ Load TailwindCSS from jsDelivr */}
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body className="bg-gray-50 text-gray-800">
            {children}
          </body>
        </html>
  );
}
