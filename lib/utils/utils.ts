import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeToCamel = (str: string) => {
  return str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
};
