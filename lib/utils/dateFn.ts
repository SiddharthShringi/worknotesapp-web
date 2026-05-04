import { format, isToday, isYesterday, intervalToDuration } from "date-fns";

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
export const formatDuration = (seconds: number): string => {
  if (seconds <= 0) return "0m";

  const duration = intervalToDuration({
    start: 0,
    end: seconds * 1000,
  });

  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
};
