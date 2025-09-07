export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ContentSection {
  sectionTitle?: string;
  titleStyle: "orange" | "white";
  content: any[]; // Portable text content
}

export interface AboutPageData {
  _id: string;
  pageTitle: string;
  pageSubtitle?: string;
  isActive: boolean;
}
