export const siteNavItems = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteNavCta = {
  label: "Get Quote",
  href: "/contact",
} as const;

export const companyFooterLinks = [
  { label: "About Us", href: "/company" },
  { label: "Our Team", href: "/company" },
  { label: "Staff", href: "/company/staff" },
  { label: "Guides", href: "/company/guides" },
  { label: "Supplier / Partner", href: "/company/supplier-partner" },
] as const;

export const serviceFooterLinks = [
  { label: "Shore Excursions", href: "/services" },
  { label: "VIP Services", href: "/services" },
  { label: "Group Tours", href: "/services" },
  { label: "Private Transfers", href: "/services" },
] as const;
