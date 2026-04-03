"use client";

import { FavouriteItem } from "./hub-data";

const FAVOURITES_KEY = "ovx_hub_favourites";
const RECENTS_KEY = "ovx_hub_recents";
const VISIBILITY_KEY = "ovx_hub_visibility";

export function getFavourites(): FavouriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVOURITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveFavourites(items: FavouriteItem[]) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(items));
}

export function isFavourited(url: string): boolean {
  return getFavourites().some((f) => f.url === url);
}

export function toggleFavourite(item: FavouriteItem): FavouriteItem[] {
  const current = getFavourites();
  const idx = current.findIndex((f) => f.url === item.url);
  if (idx >= 0) {
    current.splice(idx, 1);
  } else {
    current.unshift(item);
  }
  saveFavourites(current);
  return current;
}

export function getRecents(): FavouriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecent(item: FavouriteItem): FavouriteItem[] {
  const current = getRecents();
  const updated = [item, ...current.filter((r) => r.url !== item.url)].slice(
    0,
    10
  );
  localStorage.setItem(RECENTS_KEY, JSON.stringify(updated));
  return updated;
}

export function getProductVisibility(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(VISIBILITY_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProductVisibility(visibility: Record<string, boolean>) {
  localStorage.setItem(VISIBILITY_KEY, JSON.stringify(visibility));
}
