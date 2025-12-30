import { type ClassValue, clsx } from "clsx";
import { Inter, Sora } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
