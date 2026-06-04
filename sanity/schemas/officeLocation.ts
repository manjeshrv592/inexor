import { defineField, defineType } from "sanity";

export default defineType({
  name: "officeLocation",
  title: "Office Location",
  type: "document",
  fields: [
    defineField({
      name: "country",
      title: "Country Name",
      type: "string",
      description: "Country where the office is located",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      description: "Office addresses in this country",
      of: [
        {
          type: "object",
          title: "Address",
          fields: [
            {
              name: "city",
              title: "City",
              type: "string",
              description: "City name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "email",
              title: "Email",
              type: "string",
              description: "Office email (optional)",
              validation: (Rule) => Rule.email(),
            },
            {
              name: "phone",
              title: "Phone",
              type: "string",
              description: "Office phone number (optional)",
            },
            {
              name: "mapsLink",
              title: "Maps Link",
              type: "url",
              description: "Google Maps link (optional)",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            },
          ],
          preview: {
            select: {
              city: "city",
              email: "email",
            },
            prepare(selection) {
              const { city, email } = selection;
              return {
                title: city,
                subtitle: email,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      country: "country",
      addresses: "addresses",
    },
    prepare(selection) {
      const { country, addresses } = selection;
      const addressCount = addresses?.length || 0;
      return {
        title: country,
        subtitle: `${addressCount} address${addressCount !== 1 ? "es" : ""}`,
      };
    },
  },
});