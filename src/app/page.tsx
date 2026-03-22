"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
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
import { InfiniteCarousel } from "@/components/InfiniteCarousel";

/* ── Carousel image sets ── */
const heroCarouselImages = [
  "/images/carousel/IMG_1570_converted.webp",
  "/images/carousel/IMG_1654_converted.webp",
  "/images/carousel/IMG_1845.JPEG",
  "/images/carousel/IMG_1929.JPG",
  "/images/carousel/IMG_3615_converted.webp",
  "/images/carousel/IMG_3634.JPG",
  "/images/carousel/IMG_3635.JPG",
  "/images/carousel/IMG_3829.JPG",
  "/images/carousel/IMG_3877.JPG",
  "/images/carousel/IMG_5715_converted.webp",
  "/images/carousel/parthenon-athens.webp",
  "/images/carousel/temple-poseidon-sunset-sounion.webp",
  "/images/carousel/theatre-epidaurus.webp",
  "/images/carousel/delphi-archaeological-site.webp",
];

const heritageCarouselImages1 = [
  "/images/carousel/IMG_1656_converted.webp",
  "/images/carousel/IMG_7889_converted.webp",
  "/images/carousel/IMG_3637.JPEG",
  "/images/carousel/IMG_8794_converted.webp",
  "/images/carousel/temple-apollo-corinth.webp",
  "/images/carousel/acropolis-athens.webp",
];

const heritageCarouselImages2 = [
  "/images/carousel/IMG_7890_converted.webp",
  "/images/carousel/IMG_3622.JPG",
  "/images/carousel/IMG_1706_converted.webp",
  "/images/carousel/IMG_8811_converted.webp",
  "/images/carousel/temple-poseidon-sounion.webp",
  "/images/carousel/meteora-monasteries.webp",
];

const heritageCarouselImages3 = [
  "/images/carousel/IMG_7893_converted.webp",
  "/images/carousel/IMG_7894_converted.webp",
  "/images/carousel/IMG_7903_converted.webp",
  "/images/carousel/temple-aphaia-aegina.webp",
  "/images/carousel/theatre-epidaurus-ancient.webp",
];

/* ── ScrollReveal wrapper ── */
function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── AnimatedCounter (DOM-driven to avoid parent re-renders) ── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = `0${suffix}`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${Math.round(eased * target)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return <span ref={ref} />;
}

/* ── Region data for scrollytelling ── */
type DiscoverRegionName = "Cyclades" | "Crete" | "Dodecanese" | "Ionian" | "Mainland";

const discoverRegionContent: Array<{
  name: DiscoverRegionName;
  headline: string;
  description: string;
}> = [
  {
    name: "Cyclades",
    headline: "Sun-bleached harbors and windswept paths",
    description: "The most iconic islands of the Aegean. Whitewashed villages cascade down volcanic cliffs, while ancient trade routes connect harbors where cruise passengers discover the beating heart of Greek island culture.",
  },
  {
    name: "Crete",
    headline: "Where myth meets the Mediterranean",
    description: "Greece's largest island offers a continent of experiences. From the Minoan palaces of Knossos to the Venetian harbors of Chania, Crete delivers depth that rewards extended exploration.",
  },
  {
    name: "Dodecanese",
    headline: "Crusader castles and turquoise coves",
    description: "A chain of islands stretching toward Asia Minor, each with its own distinct character. Medieval Rhodes, sacred Patmos, volcanic Nisyros — the Dodecanese reward the curious traveler.",
  },
  {
    name: "Ionian",
    headline: "Emerald waters and Venetian elegance",
    description: "Greece's western islands offer a dramatically different character. Lush green hillsides, Italianate architecture, and some of the clearest waters in the Mediterranean create an unforgettable first impression.",
  },
  {
    name: "Mainland",
    headline: "Ancient gateways and northern horizons",
    description: "From the great port of Piraeus to the cosmopolitan waterfront of Thessaloniki, the mainland and Sporades offer access to Greece's archaeological treasures and mountain-meets-sea landscapes.",
  },
];

const portRegionToDiscoverRegion: Record<string, DiscoverRegionName> = {
  Cyclades: "Cyclades",
  Crete: "Crete",
  Dodecanese: "Dodecanese",
  Ionian: "Ionian",
  Epirus: "Ionian",
  Attica: "Mainland",
  Macedonia: "Mainland",
  Thessaly: "Mainland",
  Sporades: "Mainland",
  "North Aegean": "Mainland",
  "Central Greece": "Mainland",
  Peloponnese: "Mainland",
  Saronic: "Mainland",
};

const regions = discoverRegionContent.map((region) => {
  const regionPorts = PORTS
    .filter((port) => {
      const discoverRegion = portRegionToDiscoverRegion[port.region] ?? "Mainland";
      return discoverRegion === region.name;
    })
    .map((port) => port.name);

  return {
    ...region,
    ports: regionPorts,
    portCount: regionPorts.length,
  };
});

// Local Assets
const imgExcursionsGreeceLogoWhite1 = "/images/figma/logo.png";

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

const partnerRows = [
  partnerLogos.slice(0, Math.ceil(partnerLogos.length / 2)),
  partnerLogos.slice(Math.ceil(partnerLogos.length / 2)),
];

const stats = [
  { value: "50+", label: "Greek Ports" },
  { value: "30+", label: "Years Experience" },
  { value: "15+", label: "Cruise Lines" },
];

const companyLinks = [
  { label: "About Us", href: "/company" },
  { label: "Our Team", href: "/company" },
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
      "https://images.unsplash.com/photo-1759155887842-3702b877de0e?w=800&q=80",
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
      "https://images.unsplash.com/photo-1681046192294-217612ee58a1?w=800&q=80",
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

/* ── DiscoverScrollytelling — isolated component so state changes don't re-render the full page ── */
function DiscoverScrollytelling() {
  const [activeRegion, setActiveRegion] = useState<DiscoverRegionName | null>(null);
  const regionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resolvedRegion = activeRegion ?? regions[0].name;

  const discoverPorts = PORTS.filter(
    (port) =>
      (portRegionToDiscoverRegion[port.region] ?? "Mainland") === resolvedRegion
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    regionRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveRegion(regions[i].name);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="grid grid-cols-[42%_58%]">
      {/* Scrollable region cards on the left */}
      <div className="relative z-10 px-[60px] 2xl:px-[80px]">
        {regions.map((region, i) => (
          <div
            key={region.name}
            ref={(el) => { regionRefs.current[i] = el; }}
            className="min-h-[80vh] flex items-center py-16 lg:py-24"
          >
            <div
              className={cn(
                "border-l-4 pl-8 py-6 transition-all duration-500 max-w-md",
                resolvedRegion === region.name
                  ? "border-[#51d2c6] opacity-100"
                  : "border-[#33305e]/10 opacity-40"
              )}
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#51d2c6]">
                {region.name}
              </span>
              <h3 className="mt-3 font-[var(--font-syne)] text-[28px] font-bold leading-[1.2] sm:text-[32px]">
                {region.headline}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#33305e]/70">
                {region.description}
              </p>
              <p className="mt-5 text-[14px] text-[#33305e]/50">
                {region.ports.join(" · ")}
              </p>
              <span className="mt-4 inline-block bg-[#51d2c6]/10 px-3 py-1 text-xs font-semibold text-[#51d2c6]">
                {region.portCount} ports in this region
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky map on the right */}
      <div className="relative self-stretch">
        <div className="sticky top-0 h-screen overflow-hidden">
          <MapboxMap
            activeRegion={activeRegion}
            ports={discoverPorts}
            showShip
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePortFilter, setActivePortFilter] = useState<
    "All" | "Major" | "Hidden Gem"
  >("All");

  const filteredPorts = PORTS.filter((port) => {
    if (activePortFilter === "All") return true;
    return port.category === activePortFilter;
  });

  return (
    <div className="bg-white text-[#33305e] overflow-x-clip selection:bg-[#96e0d9] selection:text-[#33305e]">
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
                  <MapboxMap animated className="h-[320px] w-full sm:h-[420px] lg:h-[clamp(320px,40vh,500px)] min-[1780px]:h-[500px]" />

                  {/* Animated port counter */}
                  <div className="absolute bottom-[24px] right-[24px] z-10 bg-[#33305e]/80 backdrop-blur-sm px-4 py-2 text-white text-sm font-semibold" style={{ animation: "counter-fade-in 0.5s ease-out 1s both" }}>
                    <span className="font-[var(--font-syne)] text-[20px] text-[#96e0d9]"><AnimatedCounter target={50} suffix="+" duration={3000} /></span>
                    <span className="ml-2 text-white/80">ports across Greece</span>
                  </div>

                  <Link
                    href="/services"
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

              {/* Right Column: Hero Carousel */}
              <div className="relative mt-8 overflow-hidden bg-[#96e0d9] lg:mt-0 lg:h-full shadow-2xl shadow-[#33305e]/10">
                <InfiniteCarousel
                  images={heroCarouselImages}
                  interval={4000}
                  overlay
                  className="absolute inset-0 h-full w-full"
                />

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
        <ScrollReveal>
          <div className="relative pl-6 lg:pl-0 border-l-4 border-[#51d2c6] lg:border-l-0">
            <p className="max-w-[1400px] font-[var(--font-syne)] text-[28px] font-medium leading-[1.4] sm:text-[36px] lg:text-[42px] lg:leading-[1.3] text-[#33305e]">
              Where every journey unfolds as a story of elegance and discovery.
              Our bespoke programs serve the world&apos;s most distinguished
              cruise lines across Greece&apos;s storied destinations.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Stats Section */}
      <section className="bg-[#33305e] py-[60px] text-white">
        <div className={`${wrap}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/20">
            {stats.map((stat) => {
              const num = parseInt(stat.value, 10);
              const suffix = stat.value.replace(/\d+/, "");
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center p-4 text-center"
                >
                  <div className="font-[var(--font-syne)] text-[48px] font-bold text-[#96e0d9] sm:text-[56px] lg:text-[64px] leading-none">
                    <AnimatedCounter target={num} suffix={suffix} />
                  </div>
                  <div className="mt-4 text-[18px] uppercase tracking-widest text-white/80 sm:text-[20px]">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="company" className="py-20 lg:py-28">
        <div className={`${wrap} mb-12 flex flex-col items-center text-center`}>
          <ScrollReveal>
            <span className="mb-4 inline-block bg-[#51d2c6]/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#51d2c6]">
              Trusted Partners
            </span>
            <h2 className="font-[var(--font-syne)] text-[32px] font-bold leading-[1.2] sm:text-[40px] lg:text-[56px]">
              Chosen by the World&apos;s
              <br />
              Finest Cruise Lines
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-8 border-y border-[#33305e]/10 py-12">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6">
            {partnerRows.map((row, rowIndex) => (
              <div
                key={`partner-row-${rowIndex}`}
                className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
              >
                {row.map((logo) => (
                  <span
                    key={`${rowIndex}-${logo}`}
                    className="font-[var(--font-syne)] text-[20px] font-bold text-[#33305e]/35 lg:text-[22px]"
                  >
                    {logo}
                  </span>
                ))}
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
                href="/services"
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
        <ScrollReveal>
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
        </ScrollReveal>
      </section>

      {/* Discover Greece — Scrollytelling */}
      <section>
        <div className={`${wrap} pt-24 pb-12`}>
          <ScrollReveal>
            <h2 className="font-[var(--font-syne)] text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[64px]">
              Discover Greece
            </h2>
            <p className="mt-4 max-w-xl text-[18px] text-[#33305e]/70">
              From legendary ports to hidden harbors, we craft experiences
              across the entire Hellenic coast.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop scrollytelling */}
        <div className="hidden lg:block">
          <DiscoverScrollytelling />
        </div>

        {/* Mobile fallback: filter + map */}
        <div className="lg:hidden">
          <div className={`${wrap} pb-6`}>
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
          <div className={`${wrap} pb-24`}>
            <div className="relative h-[500px] w-full overflow-hidden border border-[#33305e]/10 shadow-2xl">
              <MapboxMap ports={filteredPorts} showShip className="h-full w-full" />
            </div>
          </div>
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
        <ScrollReveal>
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
            <div className="relative overflow-hidden h-[300px] lg:h-[450px]">
              <InfiniteCarousel
                images={heritageCarouselImages1}
                interval={5000}
                className="h-full w-full"
              />
            </div>
            <div className="relative overflow-hidden h-[300px] lg:h-[450px] mt-8 sm:mt-12">
              <InfiniteCarousel
                images={heritageCarouselImages2}
                interval={6000}
                className="h-full w-full"
              />
            </div>
            <div className="relative overflow-hidden h-[300px] lg:h-[450px]">
              <InfiniteCarousel
                images={heritageCarouselImages3}
                interval={4500}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
        </ScrollReveal>
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
            <p className="mt-6 text-[16px] text-white/60 max-w-2xl mx-auto">
              For questions and remarks related to our sustainability and CSR policies, please contact us at{" "}
              <a href="mailto:operations@excursionsgreece.com" className="text-[#96e0d9] hover:underline">
                operations@excursionsgreece.com
              </a>
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-8">
              <img
                src={imgExcursionsGreeceLogoWhite1}
                alt="Excursions Greece"
                className="h-[80px] w-auto "
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
