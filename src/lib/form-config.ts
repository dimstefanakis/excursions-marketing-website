export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select" | "file";
export type FormKey = "quote" | "staff" | "guides" | "supplier-partner";
export type SidebarIcon =
  | "map-pin"
  | "phone"
  | "mail"
  | "clock"
  | "users"
  | "briefcase"
  | "globe"
  | "ship"
  | "building";

export type FormFieldConfig = {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  width?: "half" | "full";
  rows?: number;
  options?: string[];
  accept?: string;
  helperText?: string;
  autoComplete?: string;
};

type SidebarSection = {
  icon: SidebarIcon;
  title: string;
  body: string;
};

type HighlightCard = {
  title: string;
  description: string;
  items: Array<{
    icon: Exclude<SidebarIcon, "briefcase" | "users" | "globe" | "ship" | "building">;
    label: string;
    href?: string;
  }>;
};

type FormPageConfig = {
  activeNavLabel: "Company" | "Contact";
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  formTitle: string;
  formDescription: string;
  submitLabel: string;
  successTitle: string;
  successDescription: string;
  toastTitle: string;
  toastDescription: string;
  sidebarSections: SidebarSection[];
  highlightCard: HighlightCard;
  fields: FormFieldConfig[];
  airtable: {
    tableName: string;
    required: string[];
    fieldMap: Record<string, string>;
    attachmentField?: string;
  };
};

export const FORM_PAGE_CONFIG: Record<FormKey, FormPageConfig> = {
  quote: {
    activeNavLabel: "Contact",
    eyebrow: "Get in Touch",
    title: "Let's Create Something",
    accent: "Extraordinary",
    description:
      "Ready to offer your guests unforgettable Greek experiences? Contact us for custom proposals and partnership opportunities.",
    formTitle: "Partnership Inquiry",
    formDescription:
      "Tell us about your requirements and we'll create a custom proposal for you.",
    submitLabel: "Request Proposal",
    successTitle: "Thank You!",
    successDescription:
      "Your inquiry has been submitted successfully. Our team will review your requirements and respond within 24 hours with a detailed proposal.",
    toastTitle: "Inquiry submitted successfully!",
    toastDescription: "We'll respond within 24 hours with a detailed proposal.",
    sidebarSections: [
      {
        icon: "map-pin",
        title: "Head Office",
        body: "Akti Miaouli 81 Pireas 185 38",
      },
      {
        icon: "phone",
        title: "Phone",
        body: "21 0451 9867",
      },
      {
        icon: "mail",
        title: "Email",
        body: "operations@excursionsgreece.com",
      },
      {
        icon: "clock",
        title: "Business Hours",
        body: "Mon - Fri: 8:00 AM - 6:00 PM EET\nSat: 9:00 AM - 2:00 PM EET",
      },
    ],
    highlightCard: {
      title: "Emergency Support",
      description:
        "24/7 assistance for urgent operational needs and immediate support.",
      items: [
        { icon: "phone", label: "21 0451 9867", href: "tel:+302104519867" },
        {
          icon: "mail",
          label: "operations@excursionsgreece.com",
          href: "mailto:operations@excursionsgreece.com",
        },
      ],
    },
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        width: "half",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        width: "half",
        placeholder: "Your company name",
        autoComplete: "organization",
      },
      {
        name: "emailAddress",
        label: "Email Address",
        type: "email",
        required: true,
        width: "half",
        placeholder: "your@email.com",
        autoComplete: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        width: "half",
        placeholder: "+1 (555) 123-4567",
        autoComplete: "tel",
      },
      {
        name: "portsOfInterest",
        label: "Ports of Interest",
        type: "text",
        required: true,
        width: "full",
        placeholder: "e.g., Piraeus, Santorini, Rhodes",
      },
      {
        name: "preferredDates",
        label: "Preferred Dates",
        type: "text",
        width: "half",
        placeholder: "e.g., Summer 2026",
      },
      {
        name: "expectedGuestCount",
        label: "Expected Guest Count",
        type: "text",
        width: "half",
        placeholder: "e.g., 200-500 guests",
      },
      {
        name: "additionalDetails",
        label: "Additional Details",
        type: "textarea",
        width: "full",
        rows: 6,
        placeholder:
          "Tell us about your specific requirements, budget considerations, or any special requests...",
      },
    ],
    airtable: {
      tableName: "Get Quote",
      required: ["fullName", "emailAddress", "portsOfInterest"],
      fieldMap: {
        fullName: "Full Name",
        companyName: "Company Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        portsOfInterest: "Ports of Interest",
        preferredDates: "Preferred Dates",
        expectedGuestCount: "Expected Guest Count",
        additionalDetails: "Additional Details",
      },
    },
  },
  staff: {
    activeNavLabel: "Company",
    eyebrow: "Join the Team",
    title: "Support Greece's Finest",
    accent: "Guest Operations",
    description:
      "Apply to join Excursions Greece as part of our turnaround or shore excursions teams across the country's leading cruise destinations.",
    formTitle: "Staff Application",
    formDescription:
      "Share your background and availability. We'll review your profile for current and upcoming operational needs.",
    submitLabel: "Submit Application",
    successTitle: "Application Received",
    successDescription:
      "Your staff application is now with our team. We'll be in touch if your experience matches an active opportunity.",
    toastTitle: "Staff application submitted!",
    toastDescription:
      "We'll review your profile and reach out when a matching opportunity opens.",
    sidebarSections: [
      {
        icon: "briefcase",
        title: "Open Roles",
        body: "We're currently collecting profiles for turnaround staff and shore excursion operations support.",
      },
      {
        icon: "users",
        title: "Guest-First Mindset",
        body: "Professional communication, calm under pressure, and reliable operational presence matter as much as experience.",
      },
      {
        icon: "globe",
        title: "Languages Matter",
        body: "Please list every language you can support guests in confidently so we can match you to the right itineraries.",
      },
    ],
    highlightCard: {
      title: "Questions About Staff Roles?",
      description:
        "If you'd like to understand our operational needs before applying, reach out directly to the team.",
      items: [
        { icon: "phone", label: "21 0451 9867", href: "tel:+302104519867" },
        {
          icon: "mail",
          label: "operations@excursionsgreece.com",
          href: "mailto:operations@excursionsgreece.com",
        },
      ],
    },
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        width: "half",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "emailAddress",
        label: "Email Address",
        type: "email",
        required: true,
        width: "half",
        placeholder: "your@email.com",
        autoComplete: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        required: true,
        width: "half",
        placeholder: "+30 69XXXXXXXX",
        autoComplete: "tel",
      },
      {
        name: "yearsOfExperience",
        label: "Years of Experience",
        type: "text",
        required: true,
        width: "half",
        placeholder: "e.g., 5",
      },
      {
        name: "positionOfInterest",
        label: "Position of Interest",
        type: "select",
        required: true,
        width: "full",
        placeholder: "Select a position",
        options: ["Turnaround staff", "Shore Excursions"],
      },
      {
        name: "languages",
        label: "Languages",
        type: "textarea",
        required: true,
        width: "full",
        rows: 4,
        placeholder: "List the languages you speak and your proficiency level.",
      },
      {
        name: "cvUpload",
        label: "CV Upload",
        type: "file",
        required: true,
        width: "full",
        accept: ".pdf,.doc,.docx",
        helperText: "PDF, DOC, or DOCX up to 5 MB.",
      },
    ],
    airtable: {
      tableName: "Staff Applications",
      required: [
        "fullName",
        "emailAddress",
        "phoneNumber",
        "yearsOfExperience",
        "positionOfInterest",
        "languages",
        "cvUpload",
      ],
      fieldMap: {
        fullName: "Full Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        yearsOfExperience: "Years of Experience",
        positionOfInterest: "Position of Interest",
        languages: "Languages",
      },
      attachmentField: "CV Upload",
    },
  },
  guides: {
    activeNavLabel: "Company",
    eyebrow: "Guide Applications",
    title: "Bring Greece",
    accent: "To Life",
    description:
      "We're always looking for exceptional guides who can deliver memorable, informed, and seamless experiences across Greek regions and ports.",
    formTitle: "Guide Application",
    formDescription:
      "Tell us where you guide, which languages you cover, and share your CV so we can evaluate fit quickly.",
    submitLabel: "Apply as a Guide",
    successTitle: "Guide Application Received",
    successDescription:
      "Thank you for your interest. We'll review your guiding profile and contact you if we see a fit for our itineraries.",
    toastTitle: "Guide application submitted!",
    toastDescription:
      "We'll review your regions, languages, and experience before getting back to you.",
    sidebarSections: [
      {
        icon: "ship",
        title: "Port Coverage",
        body: "Use the regions and ports field to tell us where you can confidently guide and operate.",
      },
      {
        icon: "globe",
        title: "Language Strength",
        body: "Language coverage is one of the fastest ways we match guide profiles to cruise itineraries and guest groups.",
      },
      {
        icon: "users",
        title: "Interpretation & Presence",
        body: "We're looking for guides who combine destination knowledge with strong group handling and storytelling skills.",
      },
    ],
    highlightCard: {
      title: "Questions About Guiding Opportunities?",
      description:
        "If you'd like to discuss guiding needs or destination coverage before applying, our team can help.",
      items: [
        { icon: "phone", label: "21 0451 9867", href: "tel:+302104519867" },
        {
          icon: "mail",
          label: "operations@excursionsgreece.com",
          href: "mailto:operations@excursionsgreece.com",
        },
      ],
    },
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        width: "half",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "emailAddress",
        label: "Email Address",
        type: "email",
        required: true,
        width: "half",
        placeholder: "your@email.com",
        autoComplete: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        required: true,
        width: "half",
        placeholder: "+30 69XXXXXXXX",
        autoComplete: "tel",
      },
      {
        name: "yearsOfExperience",
        label: "Years of Experience",
        type: "text",
        required: true,
        width: "half",
        placeholder: "e.g., 8",
      },
      {
        name: "regionsPorts",
        label: "Regions / Ports",
        type: "textarea",
        required: true,
        width: "full",
        rows: 4,
        placeholder: "List the Greek regions or ports where you currently guide.",
      },
      {
        name: "languages",
        label: "Languages",
        type: "textarea",
        required: true,
        width: "full",
        rows: 4,
        placeholder: "List the languages you guide in and your proficiency.",
      },
      {
        name: "cvUpload",
        label: "CV Upload",
        type: "file",
        required: true,
        width: "full",
        accept: ".pdf,.doc,.docx",
        helperText: "PDF, DOC, or DOCX up to 5 MB.",
      },
    ],
    airtable: {
      tableName: "Guide Applications",
      required: [
        "fullName",
        "emailAddress",
        "phoneNumber",
        "yearsOfExperience",
        "regionsPorts",
        "languages",
        "cvUpload",
      ],
      fieldMap: {
        fullName: "Full Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        yearsOfExperience: "Years of Experience",
        regionsPorts: "Regions / Ports",
        languages: "Languages",
      },
      attachmentField: "CV Upload",
    },
  },
  "supplier-partner": {
    activeNavLabel: "Company",
    eyebrow: "Partnerships",
    title: "Grow With",
    accent: "Excursions Greece",
    description:
      "We welcome high-quality transport, hospitality, and destination partners who can support premium shore programs across Greece.",
    formTitle: "Supplier / Partner Form",
    formDescription:
      "Share your operating footprint, capacity, and business profile so our team can evaluate partnership fit.",
    submitLabel: "Send Partnership Details",
    successTitle: "Partnership Details Received",
    successDescription:
      "Thank you for reaching out. We'll review your submission and get in touch if there's a strong operational fit.",
    toastTitle: "Partner form submitted!",
    toastDescription:
      "We'll review your business profile and follow up if there's a fit.",
    sidebarSections: [
      {
        icon: "building",
        title: "Business Types",
        body: "Transport, tour operators, restaurants, wineries, and other specialist local partners are all welcome to apply.",
      },
      {
        icon: "map-pin",
        title: "Operating Regions",
        body: "Tell us exactly where you operate so we can connect your offer to the right port and itinerary needs.",
      },
      {
        icon: "users",
        title: "Capacity Matters",
        body: "Fleet size, venue capacity, and operational detail help us assess whether a partnership can scale with guest demand.",
      },
    ],
    highlightCard: {
      title: "Questions About Partnerships?",
      description:
        "If you want to discuss collaboration before submitting the form, contact our operations team directly.",
      items: [
        { icon: "phone", label: "21 0451 9867", href: "tel:+302104519867" },
        {
          icon: "mail",
          label: "operations@excursionsgreece.com",
          href: "mailto:operations@excursionsgreece.com",
        },
      ],
    },
    fields: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        width: "half",
        placeholder: "Your company name",
        autoComplete: "organization",
      },
      {
        name: "contactPerson",
        label: "Contact Person",
        type: "text",
        required: true,
        width: "half",
        placeholder: "Full name",
        autoComplete: "name",
      },
      {
        name: "emailAddress",
        label: "Email Address",
        type: "email",
        required: true,
        width: "half",
        placeholder: "your@email.com",
        autoComplete: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        required: true,
        width: "half",
        placeholder: "+30 21XXXXXXXX",
        autoComplete: "tel",
      },
      {
        name: "businessType",
        label: "Business Type",
        type: "select",
        required: true,
        width: "full",
        placeholder: "Select your business type",
        options: ["Transport", "Tour Operator", "Restaurant", "Winery", "Other"],
      },
      {
        name: "operatingRegions",
        label: "Operating Regions",
        type: "textarea",
        required: true,
        width: "full",
        rows: 4,
        placeholder: "List the destinations, regions, or ports where you operate.",
      },
      {
        name: "capacityFleet",
        label: "Capacity / Fleet",
        type: "textarea",
        required: true,
        width: "full",
        rows: 4,
        placeholder: "Describe your fleet size, capacity, group volumes, or venue details.",
      },
      {
        name: "additionalDetails",
        label: "Additional Details",
        type: "textarea",
        width: "full",
        rows: 6,
        placeholder: "Share anything else that helps us understand your offer, standards, or availability.",
      },
    ],
    airtable: {
      tableName: "Supplier / Partner",
      required: [
        "companyName",
        "contactPerson",
        "emailAddress",
        "phoneNumber",
        "businessType",
        "operatingRegions",
        "capacityFleet",
      ],
      fieldMap: {
        companyName: "Company Name",
        contactPerson: "Contact Person",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        businessType: "Business Type",
        operatingRegions: "Operating Regions",
        capacityFleet: "Capacity / Fleet",
        additionalDetails: "Additional Details",
      },
    },
  },
};
