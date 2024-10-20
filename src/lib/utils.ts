import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const fr = '🇫🇷';
export const en = '🇬🇧';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

