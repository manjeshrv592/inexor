import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "development", // Use CDN only in development for real-time updates in production
  perspective: "published", // Use published perspective
});
