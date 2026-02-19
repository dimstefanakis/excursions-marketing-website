"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapboxMap, PORTS } from "@/components/mapbox/MapboxMap";
import { cn } from "@/lib/utils";

// Local Assets
const imgHeroScenic =
  "/images/ew0KICAgICAgICAgICJidWNrZXQiOiAiaHR0cHM6Ly9hZW0tcHJvZC1wdWJsaXNoLnZpa2luZy5jb20iLA0KICAgICAgICAgICJrZXkiOiAiY29udGVudC9kYW0vdmlraW5nY3J1aXNlcy9lbi9tYWdub2xpYS1pbWFnZXMvbWFyX2NvbnRlbnQvc3RhdGljLWltYWdlcy9DQ19TVEFSX.webp";
const imgExcursionsGreeceLogoWhite1 = "/images/figma/logo.png";
const imgRectangle4136 = "/images/figma/scenic-bay.png";
const imgRectangle4137 = "/images/figma/harbor-view.png";
const imgRectangle4138 = "/images/figma/aerial-coastline.png";

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

const partnerLogos = [
  "APT Luxury Travel",
  "Crystal Cruises",
  "Ensemble",
  "Explora Journeys",
  "Hapag-Lloyd Cruises",
  "Mystic Cruises",
  "Noble Caledonia",
  "Olivia",
  "Phoenix Reisen",
  "Saga Cruises",
  "Semester at Sea",
  "The World",
  "Vidanta World",
  "Viking Cruises",
  "Virgin Voyages",
];

const stats = [
  { value: "50+", label: "Greek Ports" },
  { value: "30+", label: "Years Experience" },
  { value: "15+", label: "Cruise Lines" },
];

const companyLinks = [
  { label: "About Us", href: "/company" },
  { label: "Our Team", href: "/company" },
  { label: "Certifications", href: "/company" },
  { label: "Sustainability", href: "/company" },
];

const serviceLinks = [
  { label: "Shore Excursions", href: "/services" },
  { label: "VIP Services", href: "/services" },
  { label: "Group Tours", href: "/services" },
  { label: "Private Transfers", href: "/services" },
];

const distinctionSlides = [
  {
    title: "Nationwide Presence",
    description:
      "A network spanning every major port and hidden harbor across the Hellenic coast.",
  },
  {
    title: "Precision & Personalization",
    description:
      "Every itinerary meticulously crafted to the exacting standards of luxury travel.",
  },
  {
    title: "Trusted by Industry Leaders",
    description:
      "Preferred partner to the world's most respected cruise lines and operators.",
  },
  {
    title: "Experienced Local Teams",
    description:
      "Hand-selected professionals with decades of expertise in Greek hospitality.",
  },
  {
    title: "Sustainability Commitment",
    description:
      "Travelife-certified operations ensuring responsible and conscious travel.",
  },
  {
    title: "24/7 Operational Support",
    description:
      "Dedicated teams available around the clock for flawless coordination.",
  },
];

const serviceCards = [
  {
    title: "Shore Excursions",
    description:
      "Curated journeys through Greece's legendary landscapes and archaeological treasures.",
    image:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
  },
  {
    title: "VIP & Concierge",
    description:
      "Exclusive access and personalized attention for the most discerning guests.",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
  },
  {
    title: "Turnaround Services",
    description:
      "Seamless embarkation and disembarkation at every Greek port of call.",
    image:
      "/images/DJI_20260128_113510_086.jpg",
  },
  {
    title: "Cultural Experts",
    description:
      "Scholars and specialists who bring Greece's rich heritage to life.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Sustainable Tourism",
    description:
      "Responsible travel supporting local communities and preservation.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
  },
  {
    title: "Land Programs",
    description:
      "Overland journeys, pre-cruise extensions, and immersive island exploration.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  },
  {
    title: "Yacht & Boat Charters",
    description:
      "Private vessels for day sails and island-to-island experiences.",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
  },
];

const wrap =
  "w-full px-[24px] sm:px-[40px] lg:px-[60px] 2xl:px-[80px]";

export default function Home() {
  const [activePortFilter, setActivePortFilter] = useState<
    "All" | "Major" | "Hidden Gem"
  >("All");

  const filteredPorts = PORTS.filter((port) => {
    if (activePortFilter === "All") return true;
    return port.category === activePortFilter;
  });

  return (
    <div className="bg-white text-[#33305e] overflow-x-hidden selection:bg-[#96e0d9] selection:text-[#33305e]">
      {/* Hero Section */}
      <section id="home" className="relative">
        <div
          className={`${wrap} relative min-h-[720px] lg:min-h-screen min-[1780px]:min-h-[968px] pt-6 lg:pt-8`}
        >
          {/* Header / Nav */}
          <header className="flex items-center justify-between">
            <Link href="/" className="block">
              <img
                src={imgExcursionsGreeceLogoWhite1}
                alt="Excursions Greece"
                className="h-[60px] w-auto sm:h-[80px] lg:h-[120px] object-contain"
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
                    item.label === "Home"
                      ? "font-bold text-[#51d2c6]"
                      : "text-[#33305e]",
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
                  <div className="flex flex-col gap-1.5">
                    <span className="h-0.5 w-5 bg-[#33305e]"></span>
                    <span className="h-0.5 w-5 bg-[#33305e]"></span>
                    <span className="h-0.5 w-5 bg-[#33305e]"></span>
                  </div>
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

          {/* Hero Content */}
          <div className="mt-10 lg:mt-16 pb-12">
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[calc(100vh-220px)] min-[1780px]:grid-cols-[1fr_1fr] min-[1780px]:gap-[40px] min-[1780px]:h-[805px]">
              {/* Left Column: Text & Map */}
              <div className="relative flex flex-col lg:h-full">
                <h1 className="text-left lg:text-right font-[var(--font-syne)] text-[42px] font-bold leading-[1.1] tracking-tight motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700 sm:text-[56px] lg:text-[72px] xl:text-[80px]">
                  Luxury Shore
                  <br />
                  <span className="text-[#51d2c6]">Experiences</span>
                </h1>

                <div className="mt-[32px] flex flex-col sm:flex-row items-start justify-between gap-8 text-[18px] leading-[1.6] sm:text-[22px] lg:text-[26px]">
                  <p className="max-w-[600px] text-[#33305e]/90 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:delay-100 motion-safe:duration-700 line-clamp-2">
                    Curated by Greece&apos;s most trusted &amp; leading
                    Destination Management Company.
                  </p>
                  <div className="flex flex-col items-end motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:delay-200 motion-safe:duration-700">
                    <span className="font-[var(--font-sulphur)] text-[24px] italic text-[#33305e]/60">
                      est.
                    </span>
                    <span className="font-[var(--font-syne)] text-[32px] font-bold">
                      2013
                    </span>
                  </div>
                </div>

                <div className="mt-[40px] relative overflow-hidden bg-[#96e0d9]/10 lg:mt-auto shadow-2xl shadow-[#33305e]/5">
                  <MapboxMap className="h-[320px] w-full sm:h-[420px] lg:h-[clamp(320px,40vh,500px)] min-[1780px]:h-[500px]" />

                  <Link
                    href="#services"
                    className="group absolute bottom-[24px] left-[24px] z-10"
                  >
                    <button className="flex h-[56px] items-center gap-4 bg-white pl-6 pr-4 text-[18px] font-bold text-[#33305e] shadow-[0_10px_30px_rgba(51,48,94,0.15)] transition-all hover:-translate-y-1 hover:shadow-xl">
                      Explore Routes
                      <span className="flex h-[40px] w-[40px] items-center justify-center bg-[#51d2c6] text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Image */}
              <div className="relative mt-8 overflow-hidden bg-[#96e0d9] lg:mt-0 lg:h-full shadow-2xl shadow-[#33305e]/10 group">
                <img
                  src={imgHeroScenic}
                  alt="Aegean waters"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[8000ms] ease-linear group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#33305e]/40 to-transparent" />

                <Link
                  href="#contact"
                  className="absolute bottom-[24px] left-[24px] z-10"
                >
                  <Button className="h-[64px] gap-6 bg-white px-8 text-[20px] font-bold text-[#33305e] shadow-lg transition-all hover:-translate-y-1 hover:bg-white hover:text-[#51d2c6]">
                    Contact Us
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className={`${wrap} pb-16 pt-12 lg:pt-[60px]`}>
        <div className="relative pl-6 lg:pl-0 border-l-4 border-[#51d2c6] lg:border-l-0">
          <p className="max-w-[1400px] font-[var(--font-syne)] text-[28px] font-medium leading-[1.4] sm:text-[36px] lg:text-[42px] lg:leading-[1.3] text-[#33305e]">
            Where every journey unfolds as a story of elegance and discovery.
            Our bespoke programs serve the world&apos;s most distinguished
            cruise lines across Greece&apos;s storied destinations.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#33305e] py-[60px] text-white">
        <div className={`${wrap}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="font-[var(--font-syne)] text-[48px] font-bold text-[#96e0d9] sm:text-[56px] lg:text-[64px] leading-none">
                  {stat.value}
                </div>
                <div className="mt-4 text-[18px] uppercase tracking-widest text-white/80 sm:text-[20px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="company" className={`${wrap} py-20 lg:py-28`}>
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-block bg-[#51d2c6]/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#51d2c6]">
            Trusted Partners
          </span>
          <h2 className="font-[var(--font-syne)] text-[32px] font-bold leading-[1.2] sm:text-[40px] lg:text-[56px]">
            Chosen by the World’s
            <br />
            Finest Cruise Lines
          </h2>
        </div>

        <div className="mt-8 border-y border-[#33305e]/10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 text-center">
            {partnerLogos.map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex items-center justify-center"
              >
                <span className="font-[var(--font-syne)] text-[24px] font-bold text-[#33305e]/40 transition-colors duration-300 hover:text-[#33305e] cursor-default">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Experiences Section */}
      <section id="services" className="bg-[#f8f9fa] py-20 lg:py-32">
        <div className={wrap}>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-[var(--font-syne)] text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[64px]">
              Bespoke Experiences
              <br />
              <span className="text-[#51d2c6]">Throughout Greece</span>
            </h2>
            <p className="max-w-md text-lg text-[#33305e]/70 pb-2">
              From private yacht charters to exclusive cultural tours, we craft
              moments that linger in memory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5">
            {serviceCards.map((service, idx) => (
              <Link
                key={service.title}
                href="#services"
                className="group relative bg-white overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#33305e]/20 group-hover:bg-[#33305e]/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-[var(--font-syne)] text-2xl md:text-3xl text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-white/80 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center font-sans text-sm text-[#96e0d9] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Discover More
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              asChild
              className="h-[64px] bg-[#33305e] px-10 text-[18px] font-bold text-white shadow-xl transition-all hover:bg-[#33305e]/90 hover:scale-105"
            >
              <Link href="#contact">
                Plan Your Experience
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className={`${wrap} py-24 text-center`}>
        <div className="mx-auto max-w-4xl">
          <Anchor className="mx-auto h-12 w-12 text-[#51d2c6] mb-8" />
          <p className="font-[var(--font-syne)] text-[28px] leading-[1.6] sm:text-[36px] lg:text-[44px] text-[#33305e]">
            &ldquo;Excellence is not an aspiration, it is a standard refined
            over decades.&rdquo;
          </p>
          <p className="mt-8 text-[18px] leading-relaxed text-[#33305e]/70 lg:text-[22px]">
            What sets us apart is our relentless attention to detail and our
            commitment to creating seamless experiences at every port of call.
          </p>
        </div>
      </section>

      {/* Discover Greece (New Section) */}
      <section className={`${wrap} py-24`}>
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="font-[var(--font-syne)] text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[64px]">
              Discover Greece
            </h2>
            <p className="mt-4 max-w-xl text-[18px] text-[#33305e]/70">
              From legendary ports to hidden harbors, we craft experiences
              across the entire Hellenic coast.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#f8f9fa] p-1.5 border border-[#33305e]/10">
            {(["All", "Major", "Hidden Gem"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActivePortFilter(filter)}
                className={cn(
                  "px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                  activePortFilter === filter
                    ? "bg-[#33305e] text-white shadow-md"
                    : "text-[#33305e]/70 hover:text-[#33305e] hover:bg-white"
                )}
              >
                {filter === "All" ? "All Ports" : filter === "Major" ? "Major Ports" : "Hidden Gems"}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[600px] w-full overflow-hidden border border-[#33305e]/10 shadow-2xl">
          <MapboxMap ports={filteredPorts} className="h-full w-full" />
        </div>
      </section>

      {/* Our Distinction Section */}
      <section className="bg-[#f8f9fa] py-24">
        <div className={wrap}>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-[var(--font-syne)] text-[32px] font-bold lg:text-[48px]">
              Our Distinction
            </h2>
          </div>

          <Carousel className="w-full pt-4 pb-12" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {distinctionSlides.map((slide) => (
                <CarouselItem
                  key={slide.title}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full bg-white p-8 shadow-sm transition-all hover:shadow-xl border border-transparent hover:border-[#51d2c6]/20">
                    <div className="mb-6 h-1 w-12 bg-[#51d2c6]" />
                    <h3 className="mb-4 font-[var(--font-syne)] text-[24px] font-bold leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-[#33305e]/70 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-end gap-4">
              <CarouselPrevious className="static translate-y-0 hover:bg-[#51d2c6] hover:text-white" />
              <CarouselNext className="static translate-y-0 hover:bg-[#51d2c6] hover:text-white" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Destinations Preview */}
      <section id="destinations" className={`${wrap} py-24`}>
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-20">
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex h-[80px] w-[80px] items-center justify-center bg-[#f0fdfc]">
              <MapPin className="h-10 w-10 text-[#51d2c6]" />
            </div>
            <h2 className="mb-6 font-[var(--font-syne)] text-[40px] font-bold leading-[1.1]">
              Heritage &<br />
              Precision
            </h2>
            <p className="text-[18px] leading-relaxed text-[#33305e]/80">
              Each journey we design reflects the trust that has earned us our
              reputation as Greece&apos;s most leading DMC.
            </p>
            <Button
              asChild
              variant="link"
              className="mt-8 w-fit px-0 text-[18px] font-bold text-[#33305e] hover:text-[#51d2c6]"
            >
              <Link href="/destinations">
                Explore All Destinations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="group relative overflow-hidden h-[300px] lg:h-[450px]">
              <img
                src={imgRectangle4136}
                alt="Scenic bay"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="group relative overflow-hidden h-[300px] lg:h-[450px] mt-8 sm:mt-12">
              <img
                src={imgRectangle4138}
                alt="Aerial coastline"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="group relative overflow-hidden h-[300px] lg:h-[450px]">
              <img
                src={imgRectangle4137}
                alt="Harbor view"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section
        id="contact"
        className="bg-[#33305e] text-white overflow-hidden"
      >
        <div className={`${wrap} py-20`}>
          <div className="mb-16 border-b border-white/10 pb-12 text-center">
            <span className="mb-6 block font-[var(--font-sulphur)] text-[20px] uppercase tracking-widest text-[#96e0d9]">
              Sustainability
            </span>
            <h2 className="font-[var(--font-syne)] text-[36px] font-bold sm:text-[48px]">
              Travelife Certified Partner
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-8">
              <img
                src={imgExcursionsGreeceLogoWhite1}
                alt="Excursions Greece"
                className="h-[80px] w-auto brightness-0 invert"
              />
              <p className="max-w-md text-[18px] text-white/70">
                Leading the way in luxury shore excursions and destination
                management across Greece since 2013.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:operations@excursionsgreece.com"
                  className="flex items-center gap-4 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5">
                    <Mail className="h-5 w-5" />
                  </div>
                  operations@excursionsgreece.com
                </a>
                <a
                  href="tel:+302104519867"
                  className="flex items-center gap-4 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5">
                    <Phone className="h-5 w-5" />
                  </div>
                  21 0451 9867
                </a>
                <div className="flex items-start gap-4 text-[18px] font-medium">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>
                    Ακτή Μιαούλη 81, Πειραιάς 185 38
                  </span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold text-[#96e0d9]">
                Company
              </h3>
              <ul className="mt-6 space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold text-[#96e0d9]">
                Services
              </h3>
              <ul className="mt-6 space-y-4">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row text-sm text-white/60">
            <span>© 2025 Excursions Greece. All rights reserved.</span>

            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
