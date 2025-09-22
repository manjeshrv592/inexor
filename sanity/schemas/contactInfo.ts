import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "mainTitle",
      title: "Main Title",
      type: "string",
      description: "Main title displayed in the center panel (e.g., 'Contact Us')",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "string",
      description: "Sub title displayed below main title (e.g., 'Get a Quote/Contact Us')",
      initialValue: "Get a Quote/Contact Us",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description text displayed in the center panel",
      initialValue: "Our experts simplify global trade compliance and deliver tailored solutions. Driven by integrity, expertise, and client focus—let's make global shipping seamless together.",
      rows: 4,
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      description: "Office address displayed below contact information",
      initialValue: "Gopalan Signature Mall, Old Madras Rd, Rahat Bagh, Nagavarapalya, Bennigana Halli, Bengaluru, Karnataka 560093",
      rows: 3,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one contact info should be active at a time",
      initialValue: true,
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      description: "When this contact information was last updated",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Contact phone number (e.g., 623211512211)",
      validation: (Rule) => Rule.required(),
      initialValue: "623211512211",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Contact email address (e.g., hello@inexor.io)",
      validation: (Rule) => 
        Rule.required().email().error("Please enter a valid email address"),
      initialValue: "hello@inexor.io",
    }),
  ],
  preview: {
    select: {
      phone: "phoneNumber",
      email: "email",
      mainTitle: "mainTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { phone, email, mainTitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${mainTitle || "Contact Information"}`,
        subtitle: `📞 ${phone} | ✉️ ${email}`,
      };
    },
  },
});
