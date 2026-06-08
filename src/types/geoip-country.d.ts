declare module "geoip-country" {
  export interface GeoIpCountryLookup {
    range: [number, number];
    /** ISO 3166-1 alpha-2 country code, e.g. "US". */
    country: string;
  }

  const geoip: {
    lookup(ip: string): GeoIpCountryLookup | null;
  };

  export default geoip;
}
