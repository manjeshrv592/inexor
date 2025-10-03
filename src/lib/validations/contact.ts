import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(/^\S+$/, "Email address cannot contain spaces"),
  countryCode: z.string().optional(),
  phone: z
    .string()
    .regex(/^[0-9]*$/, "Phone number can only contain numbers")
    .optional(),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  service: z.string().optional(),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
}).refine((data) => {
  // If phone is provided, validate its length based on country code
  if (data.phone && data.phone.length > 0) {
    const expectedLength = getPhoneLengthForCountry(data.countryCode || "US");
    if (data.phone.length !== expectedLength) {
      return false;
    }
  }
  return true;
}, {
  message: "Phone number length doesn't match the selected country format",
  path: ["phone"],
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Country codes data with phone number lengths
export const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States", phoneLength: 10 },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada", phoneLength: 10 },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom", phoneLength: 10 },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India", phoneLength: 10 },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China", phoneLength: 11 },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan", phoneLength: 10 },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany", phoneLength: 11 },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France", phoneLength: 9 },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy", phoneLength: 10 },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain", phoneLength: 9 },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia", phoneLength: 9 },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil", phoneLength: 11 },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia", phoneLength: 10 },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea", phoneLength: 10 },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore", phoneLength: 8 },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE", phoneLength: 9 },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia", phoneLength: 9 },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa", phoneLength: 9 },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico", phoneLength: 10 },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands", phoneLength: 9 },
];

// Helper function to get phone length for a country
export const getPhoneLengthForCountry = (countryCode: string): number => {
  const country = countryCodes.find(c => c.country === countryCode);
  return country?.phoneLength || 15; // Default to 15 if country not found
};

// Service options
export const serviceOptions = [
  { value: "IOR", label: "IOR (Importer of Record)" },
  { value: "EOR", label: "EOR (Exporter of Record)" },
  { value: "VAT", label: "VAT (Global VAT Refund Assistance)" },
  { value: "DDP", label: "DDP (Delivered Duty Paid)" },
  { value: "Others", label: "Others" },
];
