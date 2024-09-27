import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Remove TypeScript type annotations for a plain JavaScript environment
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
