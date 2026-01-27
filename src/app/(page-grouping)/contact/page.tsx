import { getContactInfo, getOfficeLocations, fallbackContactInfo } from "@/lib/sanity/contact";
import ContactFormClient from "./ContactFormClient";

const ContactPage = async () => {
  // Fetch data server-side - this runs at build time / revalidation
  const [contactInfo, officeLocations] = await Promise.all([
    getContactInfo(),
    getOfficeLocations(),
  ]);

  return (
    <ContactFormClient
      contactInfo={contactInfo || fallbackContactInfo}
      officeLocations={officeLocations || []}
    />
  );
};

export default ContactPage;
