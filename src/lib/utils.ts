import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDateString() {
  const date = new Date().toDateString().split(" ")
  return `${date[0]}, ${date[1]} ${date[2]}, ${date[3]}`
}