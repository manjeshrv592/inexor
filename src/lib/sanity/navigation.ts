import { client } from "../../../sanity/lib/client";
import {
  navigationItemsQuery,
  navigationSettingsQuery,
  activeNavigationItemsQuery,
  navigationConfigQuery,
} from "../../sanity/queries/navigation";

// Types
export interface NavigationItem {
  _id: string;
  label: string;
  href: string;
  hasDropdown: boolean;
  order: number;
  isActive?: boolean;
  description?: string;
}

export interface NavigationSettings {
  _id: string;
  title: string;
  maxItems: number;
  showOnMobile: boolean;
  animationEnabled: boolean;
  lastUpdated?: string;
  notes?: string;
}

export interface NavigationConfigItem {
  label: string;
  hasDropdown: boolean;
  href: string;
}

export interface NavigationConfig {
  _id: string;
  resources: NavigationConfigItem;
  services: NavigationConfigItem;
  about: NavigationConfigItem;
  faq: NavigationConfigItem;
}

// Functions
export async function getNavigationItems(): Promise<NavigationItem[]> {
  return client.fetch(
    navigationItemsQuery,
    {},
    { next: { tags: ["navigation", "navigationItems"] } }
  );
}

export async function getNavigationSettings(): Promise<NavigationSettings | null> {
  return client.fetch(
    navigationSettingsQuery,
    {},
    { next: { tags: ["navigation", "navigationSettings"] } }
  );
}

export async function getActiveNavigationItems(): Promise<NavigationItem[]> {
  return client.fetch(
    activeNavigationItemsQuery,
    {},
    { next: { tags: ["navigation", "navigationItems"] } }
  );
}

export async function getNavigationConfig(): Promise<NavigationConfig | null> {
  try {
    console.log("🔍 Fetching navigation config with query:", navigationConfigQuery);
    const result = await client.fetch(
      navigationConfigQuery,
      {},
      { next: { tags: ["navigation", "navigationConfig"] } }
    );
    console.log("📄 Navigation config result:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching navigation config:", error);
    return null;
  }
}

// Convert NavigationConfig to NavigationItem array
function convertConfigToItems(config: NavigationConfig): NavigationItem[] {
  if (!config) return [];
  
  return [
    { _id: "resources", ...config.resources, order: 1 },
    { _id: "services", ...config.services, order: 2 },
    { _id: "about", ...config.about, order: 3 },
    { _id: "faq", ...config.faq, order: 4 },
  ];
}

// Combined function to get navigation data (using fixed config)
export async function getNavigationData(): Promise<{
  items: NavigationItem[];
  settings: NavigationSettings | null;
}> {
  const config = await getNavigationConfig();
  const items = config ? convertConfigToItems(config) : [];
  return { items, settings: null };
}

// Legacy function for backward compatibility
export async function getNavigationDataLegacy(): Promise<{
  items: NavigationItem[];
  settings: NavigationSettings | null;
}> {
  const [items, settings] = await Promise.all([
    getActiveNavigationItems(),
    getNavigationSettings(),
  ]);

  return { items, settings };
}
