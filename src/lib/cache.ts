/**
 * Simple in-memory cache for Sanity data with TTL support
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class DataCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  // Get cache stats for debugging
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Create singleton instance
export const dataCache = new DataCache();

/**
 * Wrapper function for caching async operations
 */
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check if data exists in cache
  const cached = dataCache.get<T>(key);
  if (cached !== null) {
    console.log(`📦 Cache HIT for key: ${key}`);
    return cached;
  }

  console.log(`🔄 Cache MISS for key: ${key}, fetching data...`);
  
  try {
    // Fetch fresh data
    const data = await fetchFn();
    
    // Store in cache
    dataCache.set(key, data, ttl);
    
    return data;
  } catch (error) {
    console.error(`❌ Error fetching data for key: ${key}`, error);
    throw error;
  }
}
