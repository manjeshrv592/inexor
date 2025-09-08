import whoWeServeItem from "./whoWeServeItem";
import hero from "./hero";
import why from "./why";
import whyItem from "./whyItem";
import aboutSection from "./aboutSection";
import aboutItem from "./aboutItem";
import country from "./country";
import mapsSection from "./mapsSection";
import clientLogo from "./clientLogo";
import clientsSection from "./clientsSection";
import testimonial from "./testimonial";
import testimonialsSection from "./testimonialsSection";
import servicesSection from "./servicesSection";
import serviceItem from "./serviceItem";
import service from "./service";
import faqCategory from "./faqCategory";
import faqItem from "./faqItem";
import processStep from "./processStep";
import processSection from "./processSection";
import contentSection from "./contentSection";
import serviceUseCase from "./services/serviceUseCase";
import serviceUseCasesSection from "./services/serviceUseCasesSection";

// SEO and Page schemas
import seo from "./seo";
import homeSeo from "./homeSeo";
import faqPage from "./faqPage";
import aboutPage from "./aboutPage";
import servicesPage from "./servicesPage";
import resourcesPage from "./resourcesPage";
import contactPage from "./contactPage";
import blogPost from "./blogPost";

export const schemaTypes = [
  // Existing schemas
  whoWeServeItem,
  hero,
  why,
  whyItem,
  aboutSection,
  aboutItem,
  country,
  mapsSection,
  clientLogo,
  clientsSection,
  testimonial,
  testimonialsSection,
  servicesSection,
  serviceItem,
  service,
  faqCategory,
  faqItem,
  processStep,
  processSection,
  contentSection,
  serviceUseCase,
  serviceUseCasesSection,

  // SEO and Page schemas
  seo,
  homeSeo,
  faqPage,
  aboutPage,
  servicesPage,
  resourcesPage,
  contactPage,
  blogPost,
];
