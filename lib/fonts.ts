import { Geist, Geist_Mono,Cascadia_Code,Raleway,Montserrat,Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400"
});

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
});

export const raleway = Raleway({
  variable: '--font-raleway',
  display: 'swap',
});