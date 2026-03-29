"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Menu } from "lucide-react";

import { MapboxMap, PORTS } from "@/components/mapbox/MapboxMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact", href: "/contact" },
];

const navCta = {
  label: "Get Quote",
  href: "/contact",
};

const wrap = "w-full px-[24px] sm:px-[40px] lg:px-[60px] 2xl:px-[80px]";

export default function DestinationsPage() {
  const portsByRegion = PORTS.reduce<Record<string, (typeof PORTS)[number][]>>(
    (acc, port) => {
      if (!acc[port.region]) {
        acc[port.region] = [];
      }

      acc[port.region].push(port);
      return acc;
    },
    {},
  );

  const regionGroups = Object.entries(portsByRegion)
    .sort(([regionA], [regionB]) => regionA.localeCompare(regionB))
    .map(([region, ports]) => ({
      region,
      ports: [...ports].sort((portA, portB) =>
        portA.name.localeCompare(portB.name),
      ),
    }));

  return (
    <div className="bg-white text-[#33305e] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
      {/* Header / Nav */}
      <header className={cn(wrap, "flex items-center justify-between py-6 lg:py-8")}>
        <Link href="/" className="block">
          <img
            src="/images/figma/logo-landscape.jpg"
            alt="Excursions Greece"
            className="h-[52px] w-auto max-w-[210px] object-contain sm:h-[64px] sm:max-w-[260px] lg:h-[92px] lg:max-w-[360px]"
          />
        </Link>

        <nav className="hidden items-center gap-[40px] xl:gap-[60px] text-[16px] font-medium lg:flex lg:text-[18px]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative py-2 transition-colors hover:text-[#51d2c6]",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#51d2c6] after:transition-all after:duration-300 hover:after:w-full",
                item.label === "Destinations"
                  ? "font-bold text-[#51d2c6]"
                  : "text-[#33305e]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className="h-[48px] border-[#33305e]/20 px-8 text-[16px] font-semibold text-[#33305e] transition-all hover:border-[#51d2c6] hover:bg-[#51d2c6] hover:text-white"
          >
            <a href={navCta.href}>{navCta.label}</a>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-[#33305e]/20 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <Menu className="h-6 w-6 text-[#33305e]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            {navItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                asChild
                className="p-3 text-base"
              >
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild className="p-3">
              <a
                href={navCta.href}
                className="w-full font-bold text-[#51d2c6]"
              >
                {navCta.label}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Hero Section with Map */}
      <section className="pt-12 pb-24 bg-white overflow-hidden">
        <div className={wrap}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700">
              <span className="font-[var(--font-sulphur)] text-[14px] uppercase tracking-[0.2em] text-[#51d2c6] mb-6 block font-bold">
                Aegean Network
              </span>
              <h1 className="font-[var(--font-syne)] text-[48px] sm:text-[64px] lg:text-[72px] font-bold text-[#33305e] mb-8 leading-[1.1] tracking-tight">
                Discover All <br />
                <span className="text-[#51d2c6]">Greek Ports</span>
              </h1>
              <p className="text-[18px] lg:text-[20px] text-[#33305e]/70 leading-relaxed mb-10 max-w-xl">
                From the historic harbors of Athens to the stunning volcanic landscapes of Santorini, 
                explore our comprehensive network of Greek destinations with expert local guidance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-[#33305e]/5 text-[#33305e] border-none px-4 py-1.5 font-semibold">50+ Ports Covered</Badge>
                <Badge variant="secondary" className="bg-[#33305e]/5 text-[#33305e] border-none px-4 py-1.5 font-semibold">Multi-language Guides</Badge>
                <Badge variant="secondary" className="bg-[#33305e]/5 text-[#33305e] border-none px-4 py-1.5 font-semibold">Custom Itineraries</Badge>
              </div>
            </div>
            <div className="relative h-[450px] lg:h-[600px] w-full shadow-2xl shadow-[#33305e]/10 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-1000 delay-200">
              <MapboxMap className="h-full w-full" />
              <div className="absolute inset-0 pointer-events-none border border-[#33305e]/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* All Ports Section */}
      <section className="py-24 lg:py-32 bg-[#f8f9fa]">
        <div className={wrap}>
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-[var(--font-syne)] text-[40px] sm:text-[56px] font-bold text-[#33305e] mb-6 leading-tight">
                Complete Port <br className="hidden sm:block" />
                <span className="text-[#51d2c6]">Coverage</span>
              </h2>
              <p className="text-[18px] text-[#33305e]/70 leading-relaxed">
                We operate in every major Greek cruise port with the same high standards of service and local expertise, ensuring a seamless experience across the Hellenic coast.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {regionGroups.map(({ region, ports }) => (
              <div key={region} className="overflow-hidden border border-[#33305e]/10 bg-white">
                <div className="flex items-center justify-between border-b border-[#33305e]/10 bg-[#f8f9fa] px-6 py-5 sm:px-8">
                  <h3 className="font-[var(--font-syne)] text-[24px] font-bold text-[#33305e]">
                    {region}
                  </h3>
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#33305e]/60">
                    {ports.length} {ports.length === 1 ? "port" : "ports"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {ports.map((port) => (
                    <div
                      key={port.name}
                      className="bg-white p-8 ring-[0.5px] ring-inset ring-[#33305e]/10 group transition-all duration-500 hover:bg-[#33305e] hover:text-white"
                    >
                      <MapPin className="w-5 h-5 text-[#51d2c6] mb-6 transition-colors duration-500 group-hover:text-[#96e0d9]" />
                      <h4 className="font-[var(--font-syne)] font-bold text-[20px] mb-2">
                        {port.name}
                      </h4>
                      <p className="text-[14px] text-[#33305e]/60 font-medium uppercase tracking-widest group-hover:text-white/60 transition-colors">
                        {port.category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-[#33305e]/60 mb-10 text-[18px]">
              Each destination is supported by our expert local teams and comprehensive logistics network.
            </p>
            <Button asChild size="lg" className="h-[64px] px-10 bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 shadow-xl font-bold">
              <Link href="/#contact">Request Custom Itinerary</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Innovation & Technology Section */}
      <section className="py-24 lg:py-32 bg-white text-center">
        <div className={wrap}>
          <div className="max-w-4xl mx-auto px-4">
            <Star className="h-12 w-12 text-[#51d2c6] mb-8 mx-auto" />
            <h2 className="font-[var(--font-syne)] text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-[#33305e] mb-10 leading-tight">
              Committed to Innovation
            </h2>
            <p className="text-[20px] lg:text-[24px] text-[#33305e]/70 leading-relaxed mb-12 font-medium">
              We are continuously in the process of research and application of new technologies 
              that would enhance even more the experience of our guests. Our dedication to innovation 
              ensures we remain at the forefront of delivering exceptional shore excursion services.
            </p>
            <Button asChild size="lg" className="h-[64px] px-10 bg-[#51d2c6] text-white hover:bg-[#33305e] transition-all duration-500 shadow-lg font-bold">
              <Link href="/#contact">Learn More About Our Vision</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#33305e] text-white">
        <div className={wrap}>
          <div className="py-24 grid gap-16 lg:grid-cols-[2fr_1fr_1fr] lg:gap-32">
            {/* Contact Info */}
            <div className="space-y-10">
              <img
                src="/images/figma/logo-landscape.jpg"
                alt="Excursions Greece"
                className="h-[72px] w-auto max-w-[250px] object-contain sm:h-[80px] sm:max-w-[290px]"
              />
              <p className="max-w-md text-[18px] text-white/70 leading-relaxed">
                Leading the way in luxury shore excursions and destination
                management across Greece since 2013.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:operations@excursionsgreece.com"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  operations@excursionsgreece.com
                </a>
                <a
                  href="tel:+302104519867"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  21 0451 9867
                </a>
                <div className="flex items-start gap-5 text-[18px] font-medium">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="leading-snug">
                    Akti Miaouli 81 Pireas 185 38
                  </span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Company
              </h3>
              <ul className="space-y-5">
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">About Us</Link></li>
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Our Team</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-[var(--font-syne)] text-[22px] font-bold text-[#96e0d9] mb-8">
                Services
              </h3>
              <ul className="space-y-5">
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Shore Excursions</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">VIP Services</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Group Tours</Link></li>
                <li><Link href="/services" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Private Transfers</Link></li>
              </ul>
            </div>
          </div>

          <div className="pb-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row text-sm text-white/40">
            <span>© 2026 Excursions Greece. All rights reserved.</span>

            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/share/1L4Kakk8Ds/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on Facebook"
                className="hover:text-[#96e0d9] transition-colors"
              ><Facebook className="h-5 w-5" /></a>
              <a
                href="https://www.instagram.com/excursiongreece/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on Instagram"
                className="hover:text-[#96e0d9] transition-colors"
              ><Instagram className="h-5 w-5" /></a>
              <a
                href="https://www.linkedin.com/company/excursions-greece/"
                target="_blank"
                rel="noreferrer"
                aria-label="Excursions Greece on LinkedIn"
                className="hover:text-[#96e0d9] transition-colors"
              ><Linkedin className="h-5 w-5" /></a>
            </div>

            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
