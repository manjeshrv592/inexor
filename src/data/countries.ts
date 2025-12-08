export interface CountryData {
  name: string;
  code: string;
  flag: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: [number, number];
}

// Local country database with local flag files - no API calls needed!
export const countriesDatabase: CountryData[] = [
  {
    name: "India",
    code: "IN",
    bounds: {
      north: 37.6,
      south: 6.4,
      east: 97.25,
      west: 68.7,
    },
    center: [20.5937, 78.9629],
    flag: "/flags/in.svg",
  },
  {
    name: "United States",
    code: "US",
    bounds: {
      north: 71.5,
      south: 18.9,
      east: -66.9,
      west: -179.9,
    },
    center: [39.8283, -98.5795],
    flag: "/flags/us.svg",
  },
  {
    name: "Canada",
    code: "CA",
    bounds: {
      north: 83.6,
      south: 41.7,
      east: -52.6,
      west: -141,
    },
    center: [56.1304, -106.3468],
    flag: "/flags/ca.svg",
  },
  {
    name: "Australia",
    code: "AU",
    bounds: {
      north: -9.2,
      south: -54.8,
      east: 159.1,
      west: 112.9,
    },
    center: [-25.2744, 133.7751],
    flag: "/flags/au.svg",
  },
  {
    name: "United Kingdom",
    code: "GB",
    bounds: {
      north: 60.9,
      south: 49.9,
      east: 1.8,
      west: -8.6,
    },
    center: [55.3781, -3.436],
    flag: "/flags/gb.svg",
  },
  {
    name: "Germany",
    code: "DE",
    bounds: {
      north: 55.1,
      south: 47.3,
      east: 15,
      west: 5.9,
    },
    center: [51.1657, 10.4515],
    flag: "/flags/de.svg",
  },
  {
    name: "France",
    code: "FR",
    bounds: {
      north: 51.1,
      south: 41.3,
      east: 9.6,
      west: -5.1,
    },
    center: [46.2276, 2.2137],
    flag: "/flags/fr.svg",
  },
  {
    name: "Japan",
    code: "JP",
    bounds: {
      north: 45.5,
      south: 24.2,
      east: 145.8,
      west: 129.4,
    },
    center: [36.2048, 138.2529],
    flag: "/flags/jp.svg",
  },
  {
    name: "China",
    code: "CN",
    bounds: {
      north: 53.6,
      south: 18.2,
      east: 134.8,
      west: 73.7,
    },
    center: [35.8617, 104.1954],
    flag: "/flags/cn.svg",
  },
  {
    name: "Brazil",
    code: "BR",
    bounds: {
      north: 5.3,
      south: -33.7,
      east: -28.6,
      west: -73.9,
    },
    center: [-14.235, -51.9253],
    flag: "/flags/br.svg",
  },
  {
    name: "Russia",
    code: "RU",
    bounds: {
      north: 81.9,
      south: 41.2,
      east: -169,
      west: 19.6,
    },
    center: [61.524, 105.3188],
    flag: "/flags/ru.svg",
  },
  {
    name: "Mexico",
    code: "MX",
    bounds: {
      north: 32.7,
      south: 14.5,
      east: -86.7,
      west: -117.1,
    },
    center: [23.6345, -102.5528],
    flag: "/flags/mx.svg",
  },
  {
    name: "South Africa",
    code: "ZA",
    bounds: {
      north: -22.1,
      south: -47.1,
      east: 38.2,
      west: 16.3,
    },
    center: [-30.5595, 22.9375],
    flag: "/flags/za.svg",
  },
  {
    name: "Egypt",
    code: "EG",
    bounds: {
      north: 31.7,
      south: 22,
      east: 36.9,
      west: 24.7,
    },
    center: [26.0975, 30.8025],
    flag: "/flags/eg.svg",
  },
  {
    name: "Argentina",
    code: "AR",
    bounds: {
      north: -21.8,
      south: -55.1,
      east: -53.6,
      west: -73.6,
    },
    center: [-38.4161, -63.6167],
    flag: "/flags/ar.svg",
  },
  {
    name: "Italy",
    code: "IT",
    bounds: {
      north: 47.1,
      south: 35.5,
      east: 18.5,
      west: 6.6,
    },
    center: [41.8719, 12.5674],
    flag: "/flags/it.svg",
  },
  {
    name: "Spain",
    code: "ES",
    bounds: {
      north: 43.8,
      south: 36,
      east: 4.3,
      west: -9.3,
    },
    center: [40.4637, -3.7492],
    flag: "/flags/es.svg",
  },
  {
    name: "Netherlands",
    code: "NL",
    bounds: {
      north: 53.6,
      south: 50.8,
      east: 7.2,
      west: 3.4,
    },
    center: [52.1326, 5.2913],
    flag: "/flags/nl.svg",
  },
  {
    name: "Sweden",
    code: "SE",
    bounds: {
      north: 69.1,
      south: 55.3,
      east: 24.2,
      west: 11.1,
    },
    center: [60.1282, 18.6435],
    flag: "/flags/se.svg",
  },
  {
    name: "Norway",
    code: "NO",
    bounds: {
      north: 71.2,
      south: 57.9,
      east: 31.1,
      west: 4.6,
    },
    center: [60.472, 8.4689],
    flag: "/flags/no.svg",
  },
  {
    name: "Switzerland",
    code: "CH",
    bounds: {
      north: 47.8,
      south: 45.8,
      east: 10.5,
      west: 5.9,
    },
    center: [46.8182, 8.2275],
    flag: "/flags/ch.svg",
  },
  {
    name: "South Korea",
    code: "KR",
    bounds: {
      north: 38.6,
      south: 33.2,
      east: 129.6,
      west: 125,
    },
    center: [35.9078, 127.7669],
    flag: "/flags/kr.svg",
  },
  {
    name: "Indonesia",
    code: "ID",
    bounds: {
      north: 6.2,
      south: -11.1,
      east: 141,
      west: 95,
    },
    center: [-0.7893, 113.9213],
    flag: "/flags/id.svg",
  },
  {
    name: "Thailand",
    code: "TH",
    bounds: {
      north: 20.5,
      south: 5.6,
      east: 105.6,
      west: 97.3,
    },
    center: [15.87, 100.9925],
    flag: "/flags/th.svg",
  },
  {
    name: "Turkey",
    code: "TR",
    bounds: {
      north: 42.1,
      south: 35.8,
      east: 44.8,
      west: 25.7,
    },
    center: [38.9637, 35.2433],
    flag: "/flags/tr.svg",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    bounds: {
      north: 32.2,
      south: 16,
      east: 55.7,
      west: 34.5,
    },
    center: [23.8859, 45.0792],
    flag: "/flags/sa.svg",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    bounds: {
      north: 26.1,
      south: 22.6,
      east: 56.4,
      west: 51.6,
    },
    center: [23.4241, 53.8478],
    flag: "/flags/ae.svg",
  },
  {
    name: "Israel",
    code: "IL",
    bounds: {
      north: 33.3,
      south: 29.5,
      east: 35.9,
      west: 34.3,
    },
    center: [31.0461, 34.8516],
    flag: "/flags/il.svg",
  },
  {
    name: "Nigeria",
    code: "NG",
    bounds: {
      north: 13.9,
      south: 4.3,
      east: 14.7,
      west: 2.7,
    },
    center: [9.082, 8.6753],
    flag: "/flags/ng.svg",
  },
  {
    name: "Kenya",
    code: "KE",
    bounds: {
      north: 5,
      south: -4.7,
      east: 41.9,
      west: 33.9,
    },
    center: [-0.0236, 37.9062],
    flag: "/flags/ke.svg",
  },
  {
    name: "Morocco",
    code: "MA",
    bounds: {
      north: 35.9,
      south: 27.7,
      east: -1,
      west: -13.2,
    },
    center: [31.7917, -7.0926],
    flag: "/flags/ma.svg",
  },
];

// Function to get flag URL from country name or code
export const getFlagFromCountryName = (countryName: string): string => {
  // Comprehensive country name mappings to ISO codes - covers ALL countries with flags
  const countryNameToCode: { [key: string]: string } = {
    // Major countries
    "United States": "us",
    "United States of America": "us",
    USA: "us",
    "United Kingdom": "gb",
    UK: "gb",
    "Great Britain": "gb",
    England: "gb",
    Scotland: "gb",
    Wales: "gb",
    "Northern Ireland": "gb",
    China: "cn",
    "People's Republic of China": "cn",
    India: "in",
    Brazil: "br",
    Russia: "ru",
    "Russian Federation": "ru",
    Japan: "jp",
    Germany: "de",
    France: "fr",
    Italy: "it",
    Spain: "es",
    Canada: "ca",
    Australia: "au",
    Mexico: "mx",
    "South Korea": "kr",
    Korea: "kr",
    "Republic of Korea": "kr",
    "North Korea": "kp",
    "Democratic People's Republic of Korea": "kp",
    "South Africa": "za",
    Egypt: "eg",
    Turkey: "tr",
    "Saudi Arabia": "sa",
    "United Arab Emirates": "ae",
    UAE: "ae",
    Israel: "il",
    Nigeria: "ng",
    Kenya: "ke",
    Morocco: "ma",
    Argentina: "ar",
    Netherlands: "nl",
    Sweden: "se",
    Norway: "no",
    Switzerland: "ch",
    Thailand: "th",
    Indonesia: "id",

    // European countries
    Austria: "at",
    Belgium: "be",
    Bulgaria: "bg",
    Croatia: "hr",
    Cyprus: "cy",
    "Czech Republic": "cz",
    Czechia: "cz",
    Denmark: "dk",
    Estonia: "ee",
    Finland: "fi",
    Greece: "gr",
    Hungary: "hu",
    Ireland: "ie",
    Latvia: "lv",
    Lithuania: "lt",
    Luxembourg: "lu",
    Malta: "mt",
    Poland: "pl",
    Portugal: "pt",
    Romania: "ro",
    Slovakia: "sk",
    Slovenia: "si",
    Ukraine: "ua",
    Belarus: "by",
    Moldova: "md",
    "Republic of Moldova": "md",
    Albania: "al",
    "Bosnia and Herzegovina": "ba",
    Montenegro: "me",
    "North Macedonia": "mk",
    Macedonia: "mk",
    Serbia: "rs",
    Iceland: "is",
    Andorra: "ad",
    Monaco: "mc",
    "San Marino": "sm",
    "Vatican City": "va",
    Liechtenstein: "li",
    Georgia: "ge",
    Armenia: "am",
    Azerbaijan: "az",

    // Asian countries
    Afghanistan: "af",
    Bangladesh: "bd",
    Bhutan: "bt",
    Cambodia: "kh",
    Iran: "ir",
    "Islamic Republic of Iran": "ir",
    Iraq: "iq",
    Kazakhstan: "kz",
    Kuwait: "kw",
    Kyrgyzstan: "kg",
    Laos: "la",
    "Lao People's Democratic Republic": "la",
    Lebanon: "lb",
    Malaysia: "my",
    Maldives: "mv",
    Mongolia: "mn",
    Myanmar: "mm",
    Burma: "mm",
    Nepal: "np",
    Oman: "om",
    Pakistan: "pk",
    Philippines: "ph",
    Qatar: "qa",
    Singapore: "sg",
    "Sri Lanka": "lk",
    Syria: "sy",
    "Syrian Arab Republic": "sy",
    Tajikistan: "tj",
    Turkmenistan: "tm",
    Uzbekistan: "uz",
    Vietnam: "vn",
    "Viet Nam": "vn",
    Yemen: "ye",
    Jordan: "jo",
    Bahrain: "bh",

    // African countries
    Algeria: "dz",
    Angola: "ao",
    Benin: "bj",
    Botswana: "bw",
    "Burkina Faso": "bf",
    Burundi: "bi",
    Cameroon: "cm",
    "Cape Verde": "cv",
    "Cabo Verde": "cv",
    "Central African Republic": "cf",
    Chad: "td",
    Comoros: "km",
    Congo: "cg",
    "Republic of the Congo": "cg",
    "Democratic Republic of the Congo": "cd",
    "Congo (Kinshasa)": "cd",
    "Congo (Brazzaville)": "cg",
    Djibouti: "dj",
    "Equatorial Guinea": "gq",
    Eritrea: "er",
    Eswatini: "sz",
    Swaziland: "sz",
    Ethiopia: "et",
    Gabon: "ga",
    Gambia: "gm",
    "The Gambia": "gm",
    Ghana: "gh",
    Guinea: "gn",
    "Guinea-Bissau": "gw",
    "Ivory Coast": "ci",
    "Côte d'Ivoire": "ci",
    Lesotho: "ls",
    Liberia: "lr",
    Libya: "ly",
    Madagascar: "mg",
    Malawi: "mw",
    Mali: "ml",
    Mauritania: "mr",
    Mauritius: "mu",
    Mozambique: "mz",
    Namibia: "na",
    Niger: "ne",
    Rwanda: "rw",
    Senegal: "sn",
    Seychelles: "sc",
    "Sierra Leone": "sl",
    Somalia: "so",
    "South Sudan": "ss",
    Sudan: "sd",
    Tanzania: "tz",
    "United Republic of Tanzania": "tz",
    Togo: "tg",
    Tunisia: "tn",
    Uganda: "ug",
    Zambia: "zm",
    Zimbabwe: "zw",

    // American countries
    "Antigua and Barbuda": "ag",
    Bahamas: "bs",
    "The Bahamas": "bs",
    Barbados: "bb",
    Belize: "bz",
    Bolivia: "bo",
    "Plurinational State of Bolivia": "bo",
    Chile: "cl",
    Colombia: "co",
    "Costa Rica": "cr",
    Cuba: "cu",
    Dominica: "dm",
    "Dominican Republic": "do",
    Ecuador: "ec",
    "El Salvador": "sv",
    Grenada: "gd",
    Guatemala: "gt",
    Guyana: "gy",
    Haiti: "ht",
    Honduras: "hn",
    Jamaica: "jm",
    Nicaragua: "ni",
    Panama: "pa",
    Paraguay: "py",
    Peru: "pe",
    "Saint Kitts and Nevis": "kn",
    "Saint Lucia": "lc",
    "Saint Vincent and the Grenadines": "vc",
    Suriname: "sr",
    "Trinidad and Tobago": "tt",
    Uruguay: "uy",
    Venezuela: "ve",
    "Bolivarian Republic of Venezuela": "ve",

    // Oceania
    Fiji: "fj",
    Kiribati: "ki",
    "Marshall Islands": "mh",
    Micronesia: "fm",
    "Federated States of Micronesia": "fm",
    Nauru: "nr",
    "New Zealand": "nz",
    Palau: "pw",
    "Papua New Guinea": "pg",
    Samoa: "ws",
    "Solomon Islands": "sb",
    Tonga: "to",
    Tuvalu: "tv",
    Vanuatu: "vu",

    // Additional European countries
    "Faroe Islands": "fo",
    Greenland: "gl",
    "Svalbard and Jan Mayen": "sj",

    // Additional Asian countries
    "Hong Kong": "hk",
    Macau: "mo",
    Macao: "mo",
    Taiwan: "tw",
    "Chinese Taipei": "tw",
    "Republic of China": "tw",
    Brunei: "bn",
    "Brunei Darussalam": "bn",
    Timor: "tl",
    "East Timor": "tl",
    "Timor-Leste": "tl",

    // Additional African countries
    "Western Sahara": "eh",
    Mayotte: "yt",
    Réunion: "re",
    "Saint Helena": "sh",

    // Additional American countries
    "Puerto Rico": "pr",
    "Virgin Islands": "vi",
    "US Virgin Islands": "vi",
    "British Virgin Islands": "vg",
    Guadeloupe: "gp",
    Martinique: "mq",
    "French Guiana": "gf",
    Aruba: "aw",
    Curaçao: "cw",
    "Sint Maarten": "sx",
    Bermuda: "bm",

    // Pacific territories
    "American Samoa": "as",
    Guam: "gu",
    "Northern Mariana Islands": "mp",
    "Cook Islands": "ck",
    Niue: "nu",
    Tokelau: "tk",
    "Wallis and Futuna": "wf",
    "French Polynesia": "pf",
    "New Caledonia": "nc",

    // Indian Ocean
    "British Indian Ocean Territory": "io",
    "Christmas Island": "cx",
    "Cocos Islands": "cc",
    "Norfolk Island": "nf",

    // Antarctica
    Antarctica: "aq",
    "South Georgia and the South Sandwich Islands": "gs",
    "French Southern Territories": "tf",
    "Heard Island and McDonald Islands": "hm",
    "Bouvet Island": "bv",
  };

  // Convert country name to lowercase for matching
  const lowerCountryName = countryName.toLowerCase().trim();

  // Try exact match first
  for (const [name, code] of Object.entries(countryNameToCode)) {
    if (name.toLowerCase() === lowerCountryName) {
      return `/flags/${code}.svg`;
    }
  }

  // Try partial match for countries with "The" prefix or similar variations
  for (const [name, code] of Object.entries(countryNameToCode)) {
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes(lowerCountryName) ||
      lowerCountryName.includes(lowerName) ||
      lowerCountryName.replace(/^the\s+/, "") === lowerName ||
      lowerName.replace(/^the\s+/, "") === lowerCountryName
    ) {
      return `/flags/${code}.svg`;
    }
  }

  // Additional common variations and edge cases
  const additionalMappings: { [key: string]: string } = {
    "Ivory Coast": "ci",
    "Côte d'Ivoire": "ci",
    "The Gambia": "gm",
    "The Bahamas": "bs",
    "Republic of the Congo": "cg",
    "Democratic Republic of the Congo": "cd",
    "Congo (Kinshasa)": "cd",
    "Congo (Brazzaville)": "cg",
    "Northern Cyprus": "cy", // Use Cyprus flag for Northern Cyprus
    "French Southern and Antarctic Lands": "tf",
    Somaliland: "so", // Use Somalia flag for Somaliland
    "Western Sahara": "eh",
    "East Timor": "tl",
    "Timor-Leste": "tl",
    "Republic of China": "tw",
    "Chinese Taipei": "tw",
    "Hong Kong": "hk",
    Macau: "mo",
    Macao: "mo",
    "South Sudan": "ss",
    "Czech Republic": "cz",
    Czechia: "cz",
    "Slovak Republic": "sk",
    "Republic of Korea": "kr",
    "Democratic People's Republic of Korea": "kp",
    "Russian Federation": "ru",
    "Islamic Republic of Iran": "ir",
    "Syrian Arab Republic": "sy",
    "Lao People's Democratic Republic": "la",
    "United Republic of Tanzania": "tz",
    "Federated States of Micronesia": "fm",
    "Republic of Moldova": "md",
    "Plurinational State of Bolivia": "bo",
    "Bolivarian Republic of Venezuela": "ve",
  };

  // Check additional mappings
  for (const [name, code] of Object.entries(additionalMappings)) {
    if (name.toLowerCase() === lowerCountryName) {
      return `/flags/${code}.svg`;
    }
  }

  // Try to extract potential ISO code from the country name itself
  // Some GeoJSON might have country codes in the name
  const potentialCode = countryName.toLowerCase().replace(/[^a-z]/g, "");
  if (potentialCode.length === 2) {
    return `/flags/${potentialCode}.svg`;
  }

  // Fallback: try to guess the code from the first letters of the country name
  const words = countryName.split(" ").filter((word) => word.length > 0);
  if (words.length >= 2) {
    const guessedCode = (words[0].charAt(0) + words[1].charAt(0)).toLowerCase();
    return `/flags/${guessedCode}.svg`;
  } else if (words.length === 1 && words[0].length >= 2) {
    const guessedCode = words[0].substring(0, 2).toLowerCase();
    return `/flags/${guessedCode}.svg`;
  }

  // If no match found, return empty string
  return "";
};

// Function to detect country from coordinates using bounding boxes
export const getCountryFromCoordinates = (
  lat: number,
  lng: number,
): CountryData | null => {
  // Handle longitude wrapping (e.g., -180 to 180 conversion)
  const normalizedLng = lng > 180 ? lng - 360 : lng < -180 ? lng + 360 : lng;

  for (const country of countriesDatabase) {
    const { north, south, east, west } = country.bounds;

    // Special handling for countries that cross the 180° meridian (like Russia, USA Alaska)
    if (west > east) {
      // Country crosses the date line
      if (
        lat >= south &&
        lat <= north &&
        (normalizedLng >= west || normalizedLng <= east)
      ) {
        return country;
      }
    } else {
      // Normal country bounds
      if (
        lat >= south &&
        lat <= north &&
        normalizedLng >= west &&
        normalizedLng <= east
      ) {
        return country;
      }
    }
  }

  return null; // Ocean or unknown country
};
