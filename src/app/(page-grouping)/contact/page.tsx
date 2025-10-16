"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactFormSchema,
  type ContactFormData,
  countryCodes,
  serviceOptions,
  getPhoneLengthForCountry,
} from "@/lib/validations/contact";
import { Mail, PhoneIcon } from "lucide-react";
import {
  getContactInfo,
  fallbackContactInfo,
  type ContactInfo,
  getOfficeLocations,
  type OfficeLocation,
} from "@/lib/sanity/contact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(fallbackContactInfo);
  const [officeLocations, setOfficeLocations] = useState<OfficeLocation[]>([]);

  // Fetch contact info from Sanity on component mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const info = await getContactInfo();
        if (info) {
          setContactInfo(info);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    const fetchOfficeLocations = async () => {
      try {
        const locations = await getOfficeLocations();
        if (locations) {
          setOfficeLocations(locations);
        }
      } catch (error) {
        console.error("Error fetching office locations:", error);
      }
    };

    fetchContactInfo();
    fetchOfficeLocations();
  }, []);

  // Initialize form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "US",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  // Watch form values efficiently to prevent excessive re-renders
  const watchedValues = form.watch(["phone", "countryCode"]);
  const [phoneValue, countryCodeValue] = watchedValues;

  // Memoize phone length calculation
  const phoneMaxLength = useMemo(() => {
    return getPhoneLengthForCountry(countryCodeValue || "US");
  }, [countryCodeValue]);

  // Group office locations by country
  const groupedOffices = useMemo(() => {
    const grouped: Record<string, OfficeLocation[]> = {};
    officeLocations.forEach((office) => {
      if (!grouped[office.country]) {
        grouped[office.country] = [];
      }
      grouped[office.country].push(office);
    });

    // Sort offices within each country by displayOrder
    Object.keys(grouped).forEach((country) => {
      grouped[country].sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
      );
    });

    return grouped;
  }, [officeLocations]);

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    console.log("🎯 Form onSubmit called with data:", data);

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not available. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha("contact_form");
      
      // Add the token to form data
      const formDataWithToken = {
        ...data,
        recaptchaToken,
      };

      console.log("📡 Making direct API call to /api/contact...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithToken),
      });

      console.log("📡 API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const result = await response.json();
      console.log("📡 API Response:", result);

      toast.success(
        contactInfo.successMessage ||
          result.message ||
          "Message sent successfully!",
        {
          duration: 5000,
        },
      );
      form.reset(); // Reset form on success
    } catch (error) {
      console.error("❌ Form submission error:", error);
      toast.error(
        contactInfo.failureMessage || "Something went wrong. Please try again.",
        {
          duration: 6000,
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="h-full bg-[#222] text-white xl:grid xl:grid-cols-[2fr_3fr_2fr]"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      {/* Left Panel - Map */}
      <div className="hidden h-[calc(100dvh-290px)] overflow-y-auto xl:block xl:h-full">
        <h3 className="font-michroma py-5 text-center">
          Our <span className="text-brand-orange-500">Locations</span>
        </h3>
        <p className="text-center text-sm">We&apos;d like to here from you</p>
        <div className="px-4 py-6">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedOffices).map(
              ([country, offices], countryIndex) => (
                <AccordionItem key={country} value={`item-${countryIndex + 1}`}>
                  <AccordionTrigger>{country}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {offices.map((office, officeIndex) => (
                        <div
                          key={office._id || `${country}-${officeIndex}`}
                          className="space-y-2"
                        >
                          {/* Display all addresses for this office */}
                          <div className="space-y-3">
                            {office.addresses?.map((address, addressIndex) => (
                              <div key={addressIndex} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-white">
                                    {address.city}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {address.address}
                                </p>

                                {/* Contact information for this address */}
                                <div className="space-y-1">
                                  {address.phone && (
                                    <div>
                                      <a
                                        href={`tel:${address.phone}`}
                                        className="text-xs text-gray-400 duration-300 hover:text-white"
                                      >
                                        Phone: {address.phone}
                                      </a>
                                    </div>
                                  )}
                                  {address.email && (
                                    <div>
                                      <a
                                        href={`mailto:${address.email}`}
                                        className="text-xs text-gray-400 duration-300 hover:text-white"
                                      >
                                        Email: {address.email}
                                      </a>
                                    </div>
                                  )}
                                  {address.mapsLink && (
                                    <div>
                                      <a
                                        href={address.mapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-orange-400 hover:text-brand-orange-300 text-xs duration-300"
                                      >
                                        View on Maps
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </div>

      {/* Center Panel - Info */}
      <div className="items-center pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:flex">
        <div className="xl:flex-1">
          <h5 className="font-michroma text-brand-orange-500 my-4 hidden text-center text-lg md:text-2xl xl:block">
            {contactInfo.mainTitle}
          </h5>
          <div className="bg-neutral-900 p-5 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-12px_18px_-12px_rgba(0,0,0,0.85),inset_0_12px_18px_-12px_rgba(0,0,0,0.9)] lg:p-8 xl:h-[200px]">
            <h5 className="font-michroma text-brand-orange-500 my-4 hidden text-center text-sm xl:block">
              {contactInfo.subTitle}
            </h5>
            <p className="text-center text-xs lg:text-sm">
              {contactInfo.description}
            </p>
          </div>
          {/* Special shape for div */}
          <div className="relative flex justify-center pt-5 after:absolute after:top-0 after:left-1/2 after:hidden after:h-full after:w-[3px] after:translate-x-1/2 after:bg-[#212121] after:content-['']">
            <div className="relative mx-auto inline-block text-sm">
              {/* SVG Background Shape */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  viewBox="0 0 400 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0L380 0L400 20L400 80L20 80L0 60L0 0Z"
                    fill="#171717"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-6 px-4 py-3 xl:gap-16 xl:px-8">
                <a
                  href={`tel:${contactInfo.phoneNumber}`}
                  className="group flex cursor-pointer items-center gap-4 transition-colors hover:text-orange-500"
                >
                  <span className="text-sm font-medium">
                    {contactInfo.phoneNumber}
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-orange-500 transition-colors group-hover:bg-orange-600 xl:size-12">
                    <PhoneIcon size={16} className="text-white" />
                  </span>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex cursor-pointer items-center gap-4 transition-colors hover:text-orange-500"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-orange-500 transition-colors group-hover:bg-orange-600 xl:size-12">
                    <Mail size={16} className="text-white" />
                  </span>
                  <span className="text-sm font-medium">
                    {contactInfo.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="xxl:mt-[10%] mx-auto mt-4 hidden max-w-[300px] px-2 text-center text-sm xl:block">
            {contactInfo.address}
          </div>
        </div>
      </div>

      {/* Right Panel - Contact Form */}
      <div className="h-[calc(100dvh-290px)] overflow-y-auto xl:h-full">
        <div className="pb-4">
          <h3 className="font-michroma py-5 text-center">
            Contact <span className="text-brand-orange-500">Information</span>
          </h3>
          <p className="text-center text-sm">We&apos;d like to here from you</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-4"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Name{" "}
                      <span className="-ml-2 text-3xl text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        onChange={(e) => {
                          // Only allow alphabets and spaces
                          const value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            "",
                          );
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Email{" "}
                      <span className="-ml-2 text-3xl text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your email address"
                        onKeyDown={(e) => {
                          // Prevent space bar from creating spaces
                          if (e.key === " " || e.code === "Space") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          // Remove spaces from email input (for paste operations)
                          const value = e.target.value.replace(/\s/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Phone Number Fields */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  {phoneValue && (
                    <span
                      className={`font-mono text-xs ${
                        (phoneValue?.length || 0) >= phoneMaxLength
                          ? "text-red-400"
                          : (phoneValue?.length || 0) > phoneMaxLength * 0.8
                            ? "text-yellow-400"
                            : "text-gray-400"
                      }`}
                    >
                      {phoneValue?.length || 0}/{phoneMaxLength}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-[80px]">
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              // Clear phone number when country changes to avoid validation issues
                              const currentPhone = form.getValues("phone");
                              const newMaxLength =
                                getPhoneLengthForCountry(value);
                              if (
                                currentPhone &&
                                currentPhone.length > newMaxLength
                              ) {
                                form.setValue(
                                  "phone",
                                  currentPhone.slice(0, newMaxLength),
                                );
                              }
                            }}
                            value={field.value}
                          >
                            <SelectTrigger
                              className="cursor-pointer border-none text-white"
                              style={{
                                backgroundColor:
                                  countryCodeValue && countryCodeValue !== "US"
                                    ? "#f65009"
                                    : "#4a4a4a",
                              }}
                            >
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Country Code</SelectLabel>
                                {countryCodes.map((country, index) => (
                                  <SelectItem
                                    key={`${country.code}-${country.country}-${index}`}
                                    value={country.country}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>{country.flag}</span>
                                      <span>{country.code}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder={`Enter phone number (${phoneMaxLength} digits)`}
                              maxLength={phoneMaxLength}
                              onChange={(e) => {
                                // Only allow numbers and respect country-specific length
                                const value = e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .slice(0, phoneMaxLength);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {(form.formState.errors.countryCode ||
                  form.formState.errors.phone) && (
                  <div className="space-y-1">
                    {form.formState.errors.countryCode && (
                      <p className="text-sm text-red-400">
                        {form.formState.errors.countryCode.message}
                      </p>
                    )}
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-400">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Company Field */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => {
                  const currentLength = field.value?.length || 0;
                  const maxLength = 100;
                  const isNearLimit = currentLength > 80;
                  const isAtLimit = currentLength >= maxLength;

                  return (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white">
                          Company Name
                        </FormLabel>
                      </div>
                      <FormControl className="mb-0">
                        <Input
                          {...field}
                          placeholder="Enter your company name"
                          maxLength={maxLength}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                      <span
                        className={`block text-right font-mono text-xs ${
                          isAtLimit
                            ? "text-red-400"
                            : isNearLimit
                              ? "text-yellow-400"
                              : "text-gray-400"
                        }`}
                      >
                        {maxLength - currentLength}
                      </span>
                    </FormItem>
                  );
                }}
              />

              {/* Service Selection */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Select Services
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="cursor-pointer border-none text-white"
                          style={{
                            backgroundColor: form.watch("service")
                              ? "#f65009"
                              : "#4a4a4a",
                          }}
                        >
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            {serviceOptions.map((service) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                              >
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => {
                  const currentLength = field.value?.length || 0;
                  const maxLength = 1000;
                  const isNearLimit = currentLength > 800;
                  const isAtLimit = currentLength >= maxLength;

                  return (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-white">Message</FormLabel>
                      </div>
                      <FormControl className="mb-0">
                        <Textarea
                          {...field}
                          placeholder="Tell us more about your requirements..."
                          maxLength={maxLength}
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                      <span
                        className={`block text-right font-mono text-xs ${
                          isAtLimit
                            ? "text-red-400"
                            : isNearLimit
                              ? "text-yellow-400"
                              : "text-gray-400"
                        }`}
                      >
                        {maxLength - currentLength}
                      </span>
                    </FormItem>
                  );
                }}
              />

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  className="font-michroma text-xs tracking-[1px]"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    console.log("🔘 Submit button clicked!");
                    console.log("🔘 Form state:", {
                      isValid: form.formState.isValid,
                      isSubmitting: form.formState.isSubmitting,
                      errors: Object.keys(form.formState.errors),
                    });
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default ContactPage;
