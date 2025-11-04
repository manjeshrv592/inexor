declare module "topojson-server" {
  export function topology(
    objects: Record<string, import("geojson").FeatureCollection | import("geojson").Feature>,
    options?: unknown
  ): unknown;
}