import { format, isToday, isYesterday } from "date-fns";

/**
 * 1. getLocalDate → "DD-MM-YYYY"
 */
export const getLocalDate = (input: string | number | Date): string => {
  return format(new Date(input), "yyyy-MM-dd");
};

/**
 * 2. formatDate → "26th May 2026"
 */
export const formatDate = (input: string | number | Date): string => {
  return format(new Date(input), "do MMMM yyyy");
};

/**
 * 3. getLabel → "Today" | "Yesterday" | formatted date
 */
export const getLabel = (input: string | number | Date): string => {
  const date = new Date(input);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return formatDate(date);
};

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}

export function formatTime(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}
