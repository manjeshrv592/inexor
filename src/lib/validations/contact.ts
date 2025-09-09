import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().optional(),
  phone: z
    .string()
    .regex(
      /^[0-9\s\-\(\)]*$/,
      "Phone number can only contain numbers, spaces, hyphens, and parentheses",
    )
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
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Country codes data
export const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
];

// Service options
export const serviceOptions = [
  { value: "IOR", label: "IOR (Importer of Record)" },
  { value: "EOR", label: "EOR (Exporter of Record)" },
  { value: "VAT", label: "VAT (Global VAT Refund Assistance)" },
  { value: "DDP", label: "DDP (Delivered Duty Paid)" },
  { value: "Others", label: "Others" },
];
