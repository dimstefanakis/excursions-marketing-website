import type { Metadata } from "next";
import { Geist_Mono, Manrope, Sulphur_Point, Syne } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sulphurPoint = Sulphur_Point({
  variable: "--font-sulphur",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Excursions Greece | Luxury Shore Experiences",
  description:
    "Luxury shore excursions and bespoke experiences curated by Greece's most trusted DMC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${syne.variable} ${sulphurPoint.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
