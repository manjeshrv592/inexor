declare module 'd3-geo-projection' {
  import { GeoProjection } from 'd3-geo';
  
  export function geoNaturalEarth2(): GeoProjection;
  export function geoRobinson(): GeoProjection;
  export function geoWinkel3(): GeoProjection;
  export function geoMollweide(): GeoProjection;
  export function geoEckert4(): GeoProjection;
  export function geoAitoff(): GeoProjection;
  export function geoHammer(): GeoProjection;
  export function geoVanDerGrinten(): GeoProjection;
  export function geoPatterson(): GeoProjection;
  export function geoBoggs(): GeoProjection;
}
