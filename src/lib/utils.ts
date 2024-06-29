import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function minutesToHours(minutes: number): string {
  let extraMinutes = minutes % 60
  let hours = Math.floor(minutes / 60);
  return `${hours}h ${extraMinutes}m`
}

export function formatLargeNumber(number: number): string {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + 'B';
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M';
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + 'K';
  } else {
    return `${number}`
  }
}

export function generateArray(value: number) {
  const array = [];
  const start = Math.max(1, value - 3); // Ensure the start value is at least 1
  for (let i = 0; i < 7; i++) {
    array.push(start + i);
  }
  return array;
}