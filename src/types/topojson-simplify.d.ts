declare module "topojson-simplify" {
  export function presimplify(topology: unknown, weight?: unknown): unknown;
  export function simplify(topology: unknown, minWeight?: number): unknown;
  export function quantile(topology: unknown, p: number): number;
}