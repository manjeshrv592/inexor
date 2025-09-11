"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import {
  contactFormSchema,
  type ContactFormData,
  countryCodes,
  serviceOptions,
} from "@/lib/validations/contact";
import { Mail, PhoneIcon } from "lucide-react";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to submit button when message is shown
  useEffect(() => {
    if (submitMessage && submitButtonRef.current) {
      // Add a small delay to ensure the message is rendered
      setTimeout(() => {
        submitButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  }, [submitMessage]);

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

  const onSubmit = async (data: ContactFormData) => {
    console.log("🎯 Form onSubmit called with data:", data);

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      console.log("📡 Making direct API call to /api/contact...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📡 API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const result = await response.json();
      console.log("📡 API Response:", result);

      setSubmitMessage({
        type: "success",
        text: result.message || "Message sent successfully!",
      });
      form.reset(); // Reset form on success
    } catch (error) {
      console.error("❌ Form submission error:", error);
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="overflow-y-auto text-white"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <div className="grid-cols-[min-content, 1fr] grid min-h-full bg-[#222] xl:grid-cols-[2fr_3fr_2fr]">
        {/* Left Panel - Map */}
        <div className="hidden items-center justify-center bg-neutral-800 xl:flex">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504814.687516064!2d2.6398022221693846!3d52.186907870458654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c3db87e4bb%3A0x3a175ceffbd0a9f!2sNetherlands!5e0!3m2!1sen!2sin!4v1756459162658!5m2!1sen!2sin&theme=dark"
            className="h-full min-h-[300px] w-full"
            style={{
              border: 0,
              filter:
                "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)",
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Center Panel - Info */}
        <div className="items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:flex">
          <div className="xl:flex-1">
            <h5 className="font-michroma text-brand-orange-500 my-4 hidden text-center text-sm xl:block">
              Contact Us
            </h5>
            <div className="bg-neutral-900 px-8 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-12px_18px_-12px_rgba(0,0,0,0.85),inset_0_12px_18px_-12px_rgba(0,0,0,0.9)] xl:h-[200px] xl:py-1">
              <h5 className="font-michroma text-brand-orange-500 my-4 hidden text-center text-sm xl:block">
                Get a Quote/Contact Us
              </h5>
              <p className="text-center text-sm">
                Our experts simplify global trade compliance and deliver
                tailored solutions. Driven by integrity, expertise, and client
                focus—let&apos;s make global shipping seamless together.
              </p>
            </div>
            {/* Special shape for div */}
            <div className="relative flex justify-center pt-5 after:absolute after:top-0 after:left-1/2 after:inline-block after:h-full after:w-[3px] after:translate-x-1/2 after:bg-[#212121] after:content-['']">
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
                <div className="relative z-10 flex items-center justify-center gap-16 px-8 py-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">623211512211</span>
                    <span className="flex size-12 items-center justify-center rounded-full bg-orange-500">
                      <PhoneIcon size={16} />
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-full bg-orange-500">
                      <Mail size={16} />
                    </span>
                    <span className="text-sm font-medium">hello@inexor.io</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="xxl:h-[calc(100vh-128px)] bg-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:h-[calc(100vh-112px)]">
          <AutoScrollContainer>
            <div>
              <h3 className="font-michroma py-5 text-center">
                Contact{" "}
                <span className="text-brand-orange-500">Information</span>
              </h3>
              <p className="text-center text-sm">
                We&apos;d like to here from you
              </p>
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
                            type="email"
                            placeholder="Enter your email address"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number Fields */}
                  <div className="space-y-2">
                    <FormLabel className="text-white">Phone Number</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="w-[80px]">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="border-neutral-900 bg-transparent text-white">
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
                                          <span className="text-muted-foreground text-sm">
                                            {country.country}
                                          </span>
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
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="Enter phone number"
                              />
                            </FormControl>
                          </FormItem>
                        )}
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your company name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
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
                            <SelectTrigger className="border-neutral-900 bg-transparent text-white">
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us more about your requirements..."
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="text-center" ref={submitButtonRef}>
                    <Button
                      className="font-michroma text-[10px] tracking-[1px]"
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      variant="outline"
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

                  {/* Submit Message */}
                  {submitMessage && (
                    <div
                      className={`rounded-lg p-4 text-center text-xs ${
                        submitMessage.type === "success"
                          ? "border border-green-700 bg-green-900/30 text-green-400"
                          : "border border-red-700 bg-red-900/30 text-red-400"
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </AutoScrollContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
