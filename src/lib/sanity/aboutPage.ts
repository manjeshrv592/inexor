import { client } from "../../../sanity/lib/client";
import { aboutPageQuery } from "../../sanity/queries/aboutPage";
import { PortableTextBlock } from "@portabletext/types";

export interface SidebarImage {
  asset: {
    url: string;
    mimeType: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
  alt?: string;
  isGrayscale?: boolean;
}

export interface AboutPageData {
  _id: string;
  pageTitle: string;
  pageSubtitle?: string;
  sidebarImage?: SidebarImage;
  content: PortableTextBlock[];
  isActive: boolean;
}

export async function getAboutPageData(): Promise<{
  aboutPage: AboutPageData | null;
}> {
  try {
    const aboutPage = await client.fetch(aboutPageQuery);

    return {
      aboutPage,
    };
  } catch (error) {
    console.error("Error fetching About page data:", error);
    return {
      aboutPage: null,
    };
  }
}
