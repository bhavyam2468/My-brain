import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Entry {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export async function getEntry(slug: string): Promise<Entry | null> {
  try {
    const response = await fetch(`/api/entries/${slug}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
}

export async function getAllEntries(): Promise<Entry[]> {
  try {
    const response = await fetch('/api/entries');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

export async function getRandomEntry(): Promise<Entry | null> {
  try {
    const response = await fetch('/api/entries/random');
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching random entry:", error);
    return null;
  }
}

export async function getRandomEntries(count: number): Promise<Entry[]> {
  const response = await fetch(`/api/random/${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch random entries');
  }
  return response.json();
}

export async function searchEntries(query: string): Promise<Entry[]> {
  try {
    if (!query || query.trim() === '') {
      return [];
    }

    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching entries:", error);
    return [];
  }
}