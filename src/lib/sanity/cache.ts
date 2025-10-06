import { client } from "../../../sanity/lib/client";

// Simple in-memory cache for Sanity queries
const queryCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function cachedQuery<T>(query: string): Promise<T> {
  const cacheKey = query;
  const cached = queryCache.get(cacheKey);
  
  // Return cached data if it's still fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  
  try {
    const data = await client.fetch<T>(query);
    
    // Cache the result
    queryCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Sanity query error:', error);
    
    // Return stale cache if available during errors
    if (cached) {
      console.warn('Returning stale cache due to query error');
      return cached.data as T;
    }
    
    throw error;
  }
}

// Clear cache function for manual cache invalidation
export function clearCache(pattern?: string) {
  if (pattern) {
    for (const key of queryCache.keys()) {
      if (key.includes(pattern)) {
        queryCache.delete(key);
      }
    }
  } else {
    queryCache.clear();
  }
}
