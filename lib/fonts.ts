import { Geist, Geist_Mono,Cascadia_Code } from "next/font/google";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const cascadiaCode = Cascadia_Code({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});