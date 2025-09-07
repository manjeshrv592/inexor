import { client } from "../../../sanity/lib/client";
import {
  aboutPageQuery,
  processSectionQuery,
  processStepsQuery,
  contentSectionsQuery,
} from "../../sanity/queries/aboutPage";
import { AboutPageData, ProcessStep, ContentSection } from "@/types/aboutPage";

export interface ProcessSectionData {
  title: string;
  description?: string;
  buttonText?: string;
}

export async function getAboutPageData(): Promise<{
  aboutPage: AboutPageData | null;
  processSection: ProcessSectionData | null;
  processSteps: ProcessStep[];
  contentSections: ContentSection[];
}> {
  try {
    const [aboutPage, processSection, processSteps, contentSections] =
      await Promise.all([
        client.fetch(aboutPageQuery),
        client.fetch(processSectionQuery),
        client.fetch(processStepsQuery),
        client.fetch(contentSectionsQuery),
      ]);

    return {
      aboutPage,
      processSection,
      processSteps: processSteps || [],
      contentSections: contentSections || [],
    };
  } catch (error) {
    console.error("Error fetching About page data:", error);
    return {
      aboutPage: null,
      processSection: null,
      processSteps: [],
      contentSections: [],
    };
  }
}
