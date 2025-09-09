"use client";

import React, { useState } from "react";
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
import {
  contactFormSchema,
  type ContactFormData,
  countryCodes,
  serviceOptions,
} from "@/lib/validations/contact";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "",
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
      className="min-h-full overflow-y-auto text-white"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <div className="grid min-h-full grid-cols-[2fr_3fr_2fr] bg-[#222]">
        {/* Left Panel - Map */}
        <div className="flex items-center justify-center bg-neutral-800">
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
        <div className="flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)]">
          <div className="flex-1">
            <h5 className="font-michroma text-brand-orange-500 my-4 text-center text-sm">
              Contact Us
            </h5>
            <div className="h-[200px] bg-neutral-900 px-8 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-12px_18px_-12px_rgba(0,0,0,0.85),inset_0_12px_18px_-12px_rgba(0,0,0,0.9)]">
              <h5 className="font-michroma text-brand-orange-500 my-4 text-center text-sm">
                Get a Quote/Contact Us
              </h5>
              <p className="text-center text-sm">
                Our experts simplify global trade compliance and deliver
                tailored solutions. Driven by integrity, expertise, and client
                focus—let's make global shipping seamless together.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="h-full overflow-y-scroll bg-neutral-800 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input {...field} placeholder="Enter your full name" />
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
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-[140px]">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="bg-transparent text-white">
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
                    <FormLabel className="text-white">Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your company name" />
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

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  variant="outline"
                  onClick={(e) => {
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

export default ContactPage;
