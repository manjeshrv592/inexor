export default {
  name: "clientsSection",
  title: "Clients Section",
  type: "document",
  fields: [
    {
      name: "logos",
      title: "Client Logos",
      type: "array",
      description:
        "Add client logos that will be displayed in the moving carousel",
      of: [{ type: "clientLogo" }],
      validation: (Rule: any) =>
        Rule.required()
          .min(4)
          .warning(
            "It's recommended to have at least 4 logos for the carousel to look good",
          ),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Clients Section",
      };
    },
  },
};
