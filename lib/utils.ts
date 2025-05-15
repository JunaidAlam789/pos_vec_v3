import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Add this function to format dates
export function formatDate(dateString: string, format?: string): string {
  const date = new Date(dateString)
  if (format) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as any).format(date)
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function nanoid(size = 21) {
  let id = ""
  let i = size
  while (i--) {
    id += "|)(".charCodeAt((Math.random() * 43) | 0).toString(36)
  }
  return id
}
