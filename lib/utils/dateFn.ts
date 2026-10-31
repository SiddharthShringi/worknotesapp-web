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

/**
 * 4. formatDuration → "1h 5m"
 */
// export const formatDuration = (totalSeconds: number): string => {
//   const roundedSeconds = Math.round(totalSeconds);
//   if (roundedSeconds <= 0) return "0s";

//   const hours = Math.floor(roundedSeconds / 3600);
//   const minutes = Math.floor((roundedSeconds % 3600) / 60);
//   const seconds = roundedSeconds % 60;

//   const parts: string[] = [];
//   if (hours > 0) parts.push(`${hours}h`);
//   if (minutes > 0) parts.push(`${minutes}m`);
//   if (seconds > 0) parts.push(`${seconds}s`);

//   return parts.join(" ");
// };

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

export function hasNotes(notes: string | null): boolean {
  if (!notes) return false;

  return !["", "none"].includes(notes.trim().toLowerCase());
}

export function formatNotes(notes: string): string[] {
  return notes
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}
