const prefetched = new Set<string>();

export function hasPrefetched(href: string): boolean {
  return prefetched.has(href);
}

export function markPrefetched(href: string): void {
  prefetched.add(href);
}

export function clearPrefetchRegistry(): void {
  prefetched.clear();
}