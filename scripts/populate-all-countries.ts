/**
 * Script to populate ALL countries in Sanity from flags folder
 * Reads all .svg files from public/flags/ and creates countries for each
 *
 * Usage: npx tsx scripts/populate-all-countries.ts
 */

import { createClient } from "@sanity/client";
import { countriesDatabase } from "../src/data/countries";
import * as fs from "fs";
import * as path from "path";

const client = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU",
  apiVersion: "2024-01-01",
});

// Comprehensive country code to name mapping
const countryCodeToName: { [key: string]: string } = {
  // Major countries
  us: "United States",
  gb: "United Kingdom",
  cn: "China",
  in: "India",
  br: "Brazil",
  ru: "Russia",
  jp: "Japan",
  de: "Germany",
  fr: "France",
  it: "Italy",
  es: "Spain",
  ca: "Canada",
  au: "Australia",
  mx: "Mexico",
  kr: "South Korea",
  za: "South Africa",
  eg: "Egypt",
  tr: "Turkey",
  sa: "Saudi Arabia",
  ae: "United Arab Emirates",
  il: "Israel",
  ng: "Nigeria",
  ke: "Kenya",
  ma: "Morocco",
  ar: "Argentina",
  nl: "Netherlands",
  se: "Sweden",
  no: "Norway",
  ch: "Switzerland",
  th: "Thailand",
  id: "Indonesia",

  // European countries
  at: "Austria",
  be: "Belgium",
  bg: "Bulgaria",
  hr: "Croatia",
  cy: "Cyprus",
  cz: "Czech Republic",
  dk: "Denmark",
  ee: "Estonia",
  fi: "Finland",
  gr: "Greece",
  hu: "Hungary",
  ie: "Ireland",
  lv: "Latvia",
  lt: "Lithuania",
  lu: "Luxembourg",
  mt: "Malta",
  pl: "Poland",
  pt: "Portugal",
  ro: "Romania",
  sk: "Slovakia",
  si: "Slovenia",
  ua: "Ukraine",
  by: "Belarus",
  md: "Moldova",
  al: "Albania",
  ba: "Bosnia and Herzegovina",
  me: "Montenegro",
  mk: "North Macedonia",
  rs: "Serbia",
  is: "Iceland",
  ad: "Andorra",
  mc: "Monaco",
  sm: "San Marino",
  va: "Vatican City",
  li: "Liechtenstein",
  ge: "Georgia",
  am: "Armenia",
  az: "Azerbaijan",

  // Asian countries
  af: "Afghanistan",
  bd: "Bangladesh",
  bt: "Bhutan",
  kh: "Cambodia",
  ir: "Iran",
  iq: "Iraq",
  kz: "Kazakhstan",
  kw: "Kuwait",
  kg: "Kyrgyzstan",
  la: "Laos",
  lb: "Lebanon",
  my: "Malaysia",
  mv: "Maldives",
  mn: "Mongolia",
  mm: "Myanmar",
  np: "Nepal",
  om: "Oman",
  pk: "Pakistan",
  ph: "Philippines",
  qa: "Qatar",
  sg: "Singapore",
  lk: "Sri Lanka",
  sy: "Syria",
  tj: "Tajikistan",
  tm: "Turkmenistan",
  uz: "Uzbekistan",
  vn: "Vietnam",
  ye: "Yemen",
  jo: "Jordan",
  bh: "Bahrain",

  // African countries
  dz: "Algeria",
  ao: "Angola",
  bj: "Benin",
  bw: "Botswana",
  bf: "Burkina Faso",
  bi: "Burundi",
  cm: "Cameroon",
  cv: "Cape Verde",
  cf: "Central African Republic",
  td: "Chad",
  km: "Comoros",
  cg: "Congo",
  cd: "Democratic Republic of the Congo",
  dj: "Djibouti",
  gq: "Equatorial Guinea",
  er: "Eritrea",
  sz: "Eswatini",
  et: "Ethiopia",
  ga: "Gabon",
  gm: "Gambia",
  gh: "Ghana",
  gn: "Guinea",
  gw: "Guinea-Bissau",
  ci: "Ivory Coast",
  ls: "Lesotho",
  lr: "Liberia",
  ly: "Libya",
  mg: "Madagascar",
  mw: "Malawi",
  ml: "Mali",
  mr: "Mauritania",
  mu: "Mauritius",
  mz: "Mozambique",
  na: "Namibia",
  ne: "Niger",
  rw: "Rwanda",
  sn: "Senegal",
  sc: "Seychelles",
  sl: "Sierra Leone",
  so: "Somalia",
  ss: "South Sudan",
  sd: "Sudan",
  tz: "Tanzania",
  tg: "Togo",
  tn: "Tunisia",
  ug: "Uganda",
  zm: "Zambia",
  zw: "Zimbabwe",

  // American countries
  ag: "Antigua and Barbuda",
  bs: "Bahamas",
  bb: "Barbados",
  bz: "Belize",
  bo: "Bolivia",
  cl: "Chile",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  dm: "Dominica",
  do: "Dominican Republic",
  ec: "Ecuador",
  sv: "El Salvador",
  gd: "Grenada",
  gt: "Guatemala",
  gy: "Guyana",
  ht: "Haiti",
  hn: "Honduras",
  jm: "Jamaica",
  ni: "Nicaragua",
  pa: "Panama",
  py: "Paraguay",
  pe: "Peru",
  kn: "Saint Kitts and Nevis",
  lc: "Saint Lucia",
  vc: "Saint Vincent and the Grenadines",
  sr: "Suriname",
  tt: "Trinidad and Tobago",
  uy: "Uruguay",
  ve: "Venezuela",

  // Oceania
  fj: "Fiji",
  ki: "Kiribati",
  mh: "Marshall Islands",
  fm: "Micronesia",
  nr: "Nauru",
  nz: "New Zealand",
  pw: "Palau",
  pg: "Papua New Guinea",
  ws: "Samoa",
  sb: "Solomon Islands",
  to: "Tonga",
  tv: "Tuvalu",
  vu: "Vanuatu",

  // Additional territories and regions
  fo: "Faroe Islands",
  gl: "Greenland",
  hk: "Hong Kong",
  mo: "Macau",
  tw: "Taiwan",
  bn: "Brunei",
  tl: "East Timor",
  eh: "Western Sahara",
  yt: "Mayotte",
  re: "Reunion",
  sh: "Saint Helena",
  pr: "Puerto Rico",
  vi: "US Virgin Islands",
  vg: "British Virgin Islands",
  gp: "Guadeloupe",
  mq: "Martinique",
  gf: "French Guiana",
  aw: "Aruba",
  cw: "Curacao",
  sx: "Sint Maarten",
  bm: "Bermuda",
  as: "American Samoa",
  gu: "Guam",
  mp: "Northern Mariana Islands",
  ck: "Cook Islands",
  nu: "Niue",
  tk: "Tokelau",
  wf: "Wallis and Futuna",
  pf: "French Polynesia",
  nc: "New Caledonia",
  io: "British Indian Ocean Territory",
  cx: "Christmas Island",
  cc: "Cocos Islands",
  nf: "Norfolk Island",
  aq: "Antarctica",
  gs: "South Georgia and South Sandwich Islands",
  tf: "French Southern Territories",
  hm: "Heard Island and McDonald Islands",
  bv: "Bouvet Island",
  sj: "Svalbard and Jan Mayen",
  ax: "Aland Islands",
  ai: "Anguilla",
  fk: "Falkland Islands",
  gi: "Gibraltar",
  im: "Isle of Man",
  je: "Jersey",
  gg: "Guernsey",
  ky: "Cayman Islands",
  ms: "Montserrat",
  tc: "Turks and Caicos Islands",
  pn: "Pitcairn",
  um: "US Minor Outlying Islands",
  pm: "Saint Pierre and Miquelon",
  bl: "Saint Barthelemy",
  mf: "Saint Martin",
};

async function populateAllCountries() {
  console.log("🌍 Starting to populate ALL countries from flags folder...");

  try {
    // Read all flag files from public/flags directory
    const flagsDir = path.join(process.cwd(), "public", "flags");
    const flagFiles = fs
      .readdirSync(flagsDir)
      .filter((file) => file.endsWith(".svg"));

    console.log(`📁 Found ${flagFiles.length} flag files`);

    // Get existing countries to avoid duplicates
    const existingCountries = await client.fetch(
      '*[_type == "country"] { code, _id }',
    );
    const existingCodes = new Set(
      existingCountries.map((c: any) => c.code.toLowerCase()),
    );

    // Create a lookup map from the existing countries database
    const existingCountriesMap = new Map();
    countriesDatabase.forEach((country) => {
      existingCountriesMap.set(country.code.toLowerCase(), country);
    });

    // Create country objects for all flags
    const allCountries = flagFiles.map((flagFile) => {
      const countryCode = path.basename(flagFile, ".svg").toLowerCase();
      const countryName =
        countryCodeToName[countryCode] || countryCode.toUpperCase();

      // Check if we have existing geographic data for this country
      const existingCountry = existingCountriesMap.get(countryCode);

      return {
        name: countryName,
        code: countryCode.toUpperCase(),
        flag: `/flags/${flagFile}`,
        isActive: false, // Default to inactive
        coordinates: existingCountry
          ? {
              lat: existingCountry.center[0],
              lng: existingCountry.center[1],
            }
          : {
              lat: 0, // Default coordinates for countries without data
              lng: 0,
            },
        bounds: existingCountry
          ? {
              north: existingCountry.bounds.north,
              south: existingCountry.bounds.south,
              east: existingCountry.bounds.east,
              west: existingCountry.bounds.west,
            }
          : {
              north: 1, // Small default bounds instead of extreme values
              south: -1,
              east: 1,
              west: -1,
            },
      };
    });

    // Filter out countries that already exist
    const countriesToCreate = allCountries.filter(
      (country) => !existingCodes.has(country.code.toLowerCase()),
    );

    if (countriesToCreate.length === 0) {
      console.log("✅ All countries already exist in Sanity");
      return;
    }

    console.log(`📝 Creating ${countriesToCreate.length} new countries...`);

    // Create countries in batches
    const batchSize = 10;
    for (let i = 0; i < countriesToCreate.length; i += batchSize) {
      const batch = countriesToCreate.slice(i, i + batchSize);

      const mutations = batch.map((country) => ({
        create: {
          _type: "country",
          _id: `country-${country.code.toLowerCase()}`,
          name: country.name,
          code: country.code,
          flag: country.flag,
          isActive: false,
          coordinates: country.coordinates,
          bounds: country.bounds,
        },
      }));

      await client.mutate(mutations);
      console.log(
        `✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(countriesToCreate.length / batchSize)}`,
      );
    }

    // Create a default maps section if it doesn't exist
    const existingMapsSection = await client.fetch(
      '*[_type == "mapsSection"][0]',
    );

    if (!existingMapsSection) {
      await client.create({
        _type: "mapsSection",
        _id: "maps-section-default",
        title: "GO GLOBAL. INSTANTLY.",
        description: "Reach Over 120 Markets With Zero Compliance Issues",
        isActive: true,
        mapConfig: {
          centerLat: 20,
          centerLng: 0,
          zoomLevel: 2,
        },
        countries: [],
      });
      console.log("✅ Created default maps section");
    }

    console.log("🎉 All countries populated successfully!");
    console.log(`📊 Total countries in system: ${allCountries.length}`);
    console.log("📋 Next steps:");
    console.log("1. Go to Sanity Studio");
    console.log("2. Navigate to Homepage > Countries Service Management");
    console.log("3. Toggle countries to active and add tax/duties/lead time");
  } catch (error) {
    console.error("❌ Error populating countries:", error);
  }
}

// Run the script
populateAllCountries();
