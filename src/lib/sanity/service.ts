import { PortableTextBlock } from "@portabletext/types";
import { client } from "../../../sanity/lib/client";
import {
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_BY_CODE_QUERY,
  SERVICE_NAVIGATION_QUERY,
  SERVICES_PAGE_SETTINGS_QUERY,
} from "../../../sanity/lib/serviceQueries";

// Types
export interface ServiceImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
}

export interface ServiceUseCaseStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ServiceUseCasesSection {
  title: string;
  image?: {
    asset?: { url?: string };
    alt?: string;
  };
  steps?: ServiceUseCaseStep[];
}

export interface Service {
  _id: string;
  title: string;
  code: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  excerpt?: string;
  featuredImage?: ServiceImage;
  content?: PortableTextBlock[]; // Rich text content
  useCases?: ServiceUseCasesSection;
  order: number;
  isActive: boolean;
}

export interface ServiceNavigation {
  previous: {
    _id: string;
    title: string;
    code: string;
    slug: {
      current: string;
    };
  } | null;
  next: {
    _id: string;
    title: string;
    code: string;
    slug: {
      current: string;
    };
  } | null;
}

export interface ServicesPageSettings {
  _id: string;
  leftPanelImage?: ServiceImage;
  applyGrayscale: boolean;
  isActive: boolean;
}

// Functions
export async function getServices(): Promise<Service[]> {
  return client.fetch(SERVICES_QUERY, {}, { next: { tags: ["services"] } });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return client.fetch(
    SERVICE_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ["services", `service-${slug}`] } },
  );
}

export async function getServiceByCode(code: string): Promise<Service | null> {
  return client.fetch(
    SERVICE_BY_CODE_QUERY,
    { code },
    { next: { tags: ["services", `service-${code.toLowerCase()}`] } },
  );
}

export async function getServiceNavigation(
  currentOrder: number,
): Promise<ServiceNavigation> {
  return client.fetch(
    SERVICE_NAVIGATION_QUERY,
    { currentOrder },
    { next: { tags: ["services"] } },
  );
}

export async function getServicesPageSettings(): Promise<ServicesPageSettings | null> {
  return client.fetch(
    SERVICES_PAGE_SETTINGS_QUERY,
    {},
    { next: { tags: ["servicesPageSettings"] } },
  );
}
