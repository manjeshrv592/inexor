import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Homepage folder
      S.listItem()
        .title("Homepage")
        .child(
          S.list()
            .title("Homepage Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(S.documentTypeList("homeSeo").title("Home Page SEO")),
              S.divider(),
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

      // FAQ Page folder
      S.listItem()
        .title("FAQ's")
        .child(
          S.list()
            .title("FAQ Page Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(S.documentTypeList("faqPage").title("FAQ Page SEO")),
              S.divider(),
              S.listItem()
                .title("FAQ Categories")
                .child(
                  S.documentTypeList("faqCategory")
                    .title("FAQ Categories")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "order", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("FAQ Items")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ Items")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "order", direction: "asc" },
                    ]),
                ),
            ]),
        ),

      // About Us Page folder
      S.listItem()
        .title("About Us")
        .child(
          S.list()
            .title("About Us Page Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(S.documentTypeList("aboutPage").title("About Us Page")),
              S.divider(),
              S.listItem()
                .title("Process Section Settings")
                .child(
                  S.documentTypeList("processSection").title(
                    "Process Section Settings",
                  ),
                ),
              S.listItem()
                .title("Process Steps")
                .child(
                  S.documentTypeList("processStep")
                    .title("Process Steps")
                    .defaultOrdering([
                      { field: "stepNumber", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("Content Sections")
                .child(
                  S.documentTypeList("contentSection").title(
                    "Content Sections",
                  ),
                ),
            ]),
        ),

      // Services Page folder
      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services Page Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(
                  S.documentTypeList("servicesPage").title("Services Page SEO"),
                ),
              S.divider(),
              // Additional Services content can be added here
            ]),
        ),

      // Resources Page folder
      S.listItem()
        .title("Resources")
        .child(
          S.list()
            .title("Resources Page Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(
                  S.documentTypeList("resourcesPage").title(
                    "Resources Page SEO",
                  ),
                ),
              S.divider(),
              S.listItem()
                .title("Blog Posts")
                .child(
                  S.documentTypeList("blogPost")
                    .title("Blog Posts")
                    .defaultOrdering([
                      { field: "isActive", direction: "desc" },
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
            ]),
        ),

      // Contact Us Page folder
      S.listItem()
        .title("Contact Us")
        .child(
          S.list()
            .title("Contact Us Page Content")
            .items([
              S.listItem()
                .title("🔍 SEO Settings")
                .child(
                  S.documentTypeList("contactPage").title(
                    "Contact Us Page SEO",
                  ),
                ),
              S.divider(),
              // Additional Contact Us content can be added here
            ]),
        ),

      // Divider
      S.divider(),

      // Other content (for future global content)
    ]);
