import { defineField, defineType } from "sanity";

export default defineType({
  name: "formSubmissions",
  title: "Form Submissions",
  type: "document",
  fields: [
    defineField({
      name: "customerQueryEmail",
      title: "Customer Query Email",
      type: "string",
      description:
        'Email address shown to customers in the contact form confirmation email (the "Have questions? Feel free to reach out to us anytime." section). Used in the email template only — it does not change where submissions are sent.',
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("Please enter a valid email address"),
    }),
  ],
  preview: {
    select: { title: "customerQueryEmail" },
    prepare({ title }) {
      return {
        title: title || "Form Submissions",
        subtitle: "Customer query email",
      };
    },
  },
});
