import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

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
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.max(25)
          .error('Main title must be 25 characters or less'),
      initialValue: "Contact Us",
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "string",
      description: "Sub title displayed below main title (e.g., 'Get a Quote/Contact Us')",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.max(25)
          .error('Sub title must be 25 characters or less'),
      initialValue: "Get a Quote/Contact Us",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description text displayed in the center panel",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 250 }),
      },
      validation: (Rule) => 
        Rule.max(250)
          .error('Description must be 250 characters or less'),
      initialValue: "Our experts simplify global trade compliance and deliver tailored solutions. Driven by integrity, expertise, and client focus—let's make global shipping seamless together.",
      rows: 4,
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      description: "Office address displayed below contact information",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 115 }),
      },
      validation: (Rule) => 
        Rule.max(115)
          .error('Address must be 115 characters or less'),
      initialValue: "Gopalan Signature Mall, Old Madras Rd, Rahat Bagh, Nagavarapalya, Bennigana Halli, Bengaluru, Karnataka 560093",
      rows: 3,
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      description: "Message displayed when contact form is submitted successfully",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 150, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.max(150)
          .error('Success message must be 150 characters or less'),
      initialValue: "Message sent successfully! We'll get back to you soon.",
    }),
    defineField({
      name: "failureMessage",
      title: "Failure Message",
      type: "string",
      description: "Message displayed when contact form submission fails",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 150, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.max(150)
          .error('Failure message must be 150 characters or less'),
      initialValue: "Something went wrong. Please try again.",
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
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 20, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(20)
          .error('Phone number must be 20 characters or less'),
      initialValue: "623211512211",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Contact email address (e.g., hello@inexor.io)",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 50, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .email()
          .max(50)
          .error('Please enter a valid email address (max 50 characters)'),
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
