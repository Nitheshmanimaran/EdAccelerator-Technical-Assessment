import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Comprehension Studio",
  description: "Next-generation reading comprehension that feels like learning, not testing."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} min-h-screen bg-[var(--paper)] text-ink-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
