import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Always use CDN for better performance
  perspective: "published", // Use published perspective
  stega: {
    enabled: false, // Disable stega for better performance
  },
});

export const clientNoCdn = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
  },
});
