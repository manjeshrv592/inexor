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
import faqPageSettings from "./faqPageSettings";
// Legacy schemas - removed after consolidation into aboutPage
// import processStep from "./processStep";
// import processSection from "./processSection";
// import contentSection from "./contentSection";
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
import aboutPageSeo from "./aboutPageSeo";
import servicesPage from "./servicesPage";
import servicesPageSettings from "./servicesPageSettings";
import resourcesPage from "./resourcesPage";
import resourcesPageSeo from "./resourcesPageSeo";
import contactPage from "./contactPage";
import contactInfo from "./contactInfo";
import officeLocation from "./officeLocation";
import blogPost from "./blogPost";
import imageTextBlock from "./imageTextBlock";
import processStepsBlock from "./processStepsBlock";
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
  faqPageSettings,
  // Legacy schemas removed - consolidated into aboutPage
  // processStep,
  // processSection,
  // contentSection,
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
  aboutPageSeo,
  servicesPage,
  servicesPageSettings,
  resourcesPage,
  resourcesPageSeo,
  contactPage,
  contactInfo,
  officeLocation,
  blogPost,
  imageTextBlock,
  processStepsBlock,
  ...privacySchemas,
  ...termsSchemas,
  ...navigationSchemas,
];
