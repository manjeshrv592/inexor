import whoWeServeItem from "./whoWeServeItem";
import whoWeServeSection from "./whoWeServeSection";
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
import service from "./service";
import faqCategory from "./faqCategory";
import faqItem from "./faqItem";
import processStep from "./processStep";
import processSection from "./processSection";
import contentSection from "./contentSection";
import keyValuePillarsSection from "./keyValuePillarsSection";
import keyValuePillarItem from "./keyValuePillarItem";
import footer from "./footer";
import socialLink from "./socialLink";
import serviceUseCase from "./services/serviceUseCase";
import serviceUseCasesSection from "./services/serviceUseCasesSection";

// SEO and Page schemas
import seo from "./seo";
import homeSeo from "./homeSeo";
import faqPage from "./faqPage";
import aboutPage from "./aboutPage";
import servicesPage from "./servicesPage";
import servicesPageSettings from "./servicesPageSettings";
import resourcesPage from "./resourcesPage";
import resourcesPageSeo from "./resourcesPageSeo";
import contactPage from "./contactPage";
import contactInfo from "./contactInfo";
import blogPost from "./blogPost";
import imageTextBlock from "./imageTextBlock";
import { privacySchemas } from "./privacy";
import { termsSchemas } from "./terms";
import { navigationSchemas } from "./navigation";

export const schemaTypes = [
  // Existing schemas
  whoWeServeItem,
  whoWeServeSection,
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
  service,
  faqCategory,
  faqItem,
  processStep,
  processSection,
  contentSection,
  keyValuePillarsSection,
  keyValuePillarItem,
  footer,
  socialLink,
  serviceUseCase,
  serviceUseCasesSection,

  // SEO and Page schemas
  seo,
  homeSeo,
  faqPage,
  aboutPage,
  servicesPage,
  servicesPageSettings,
  resourcesPage,
  resourcesPageSeo,
  contactPage,
  contactInfo,
  blogPost,
  imageTextBlock,
  ...privacySchemas,
  ...termsSchemas,
  ...navigationSchemas,
];
