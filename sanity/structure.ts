import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Homepage folder
      S.listItem()
        .title("📄 Homepage")
        .child(
          S.list()
            .title("Homepage Content")
            .items([
              S.listItem()
                .title("Hero Section")
                .child(S.documentTypeList("hero").title("Hero Section")),
              S.listItem()
                .title("About Section")
                .child(
                  S.documentTypeList("aboutSection").title("About Section"),
                ),
              S.listItem()
                .title("About Service Items")
                .child(
                  S.documentTypeList("aboutItem").title("About Service Items"),
                ),
              S.listItem()
                .title("Who We Serve Items")
                .child(
                  S.documentTypeList("whoWeServeItem").title(
                    "Who We Serve Items",
                  ),
                ),
              S.listItem()
                .title("Why Choose Us Section")
                .child(
                  S.documentTypeList("why").title("Why Choose Us Section"),
                ),
              S.listItem()
                .title("Why Choose Us Items")
                .child(
                  S.documentTypeList("whyItem").title("Why Choose Us Items"),
                ),
              S.listItem()
                .title("Services Section")
                .child(
                  S.documentTypeList("servicesSection").title(
                    "Services Section",
                  ),
                ),
              S.listItem()
                .title("Service Items")
                .child(
                  S.documentTypeList("serviceItem")
                    .title("Service Items")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "order", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("Countries Service Management")
                .child(
                  S.documentTypeList("country")
                    .title("Countries")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "name", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("Clients Section")
                .child(
                  S.documentTypeList("clientsSection").title("Clients Section"),
                ),
              S.listItem()
                .title("Testimonials Section")
                .child(
                  S.documentTypeList("testimonialsSection").title(
                    "Testimonials Section",
                  ),
                ),
              S.listItem()
                .title("Testimonials")
                .child(
                  S.documentTypeList("testimonial")
                    .title("Testimonials")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "order", direction: "asc" },
                    ]),
                ),
            ]),
        ),

      // Divider
      S.divider(),

      // Other content (for future pages - can be added here later)
    ]);
