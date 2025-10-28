import { PortableTextBlock } from "@portabletext/types";

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ContentSection {
  sectionTitle?: string;
  titleStyle: "orange" | "white";
  content: PortableTextBlock[]; // Portable text content
}

export interface AboutPageData {
  _id: string;
  pageTitle?: string; // Keep for backward compatibility
  pageSubtitle?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
  };
  isActive: boolean;
}
