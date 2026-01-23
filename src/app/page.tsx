import Link from "next/link";
import {
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
import { MapboxMap } from "@/components/mapbox/MapboxMap";
import { cn } from "@/lib/utils";

const imgFinalHeroSlideshow = "/images/figma/hero-slideshow.png";
const imgExcursionsGreeceLogoWhite1 = "/images/figma/logo.png";
const imgFrame39847 = "/images/figma/services-bg.png";
const imgRectangle4136 = "/images/figma/scenic-bay.png";
const imgRectangle4137 = "/images/figma/harbor-view.png";
const imgRectangle4138 = "/images/figma/aerial-coastline.png";
const imgArrowRightSvgrepoCom =
  "http://localhost:3845/assets/1a63df9b34aae05bd6591fd98be2b587689bb979.svg";
const imgBoatSvgrepoCom = "/images/figma/icon-boat.png";
const imgBoatSvgrepoCom1 =
  "http://localhost:3845/assets/42ab8f2e692d6c69fc33a3588c0930057d1db881.svg";
const imgVip2Fill = "/images/figma/icon-cultural-experts.png";
const imgVip2Fill1 = "/images/figma/icon-vip.png";
const imgLeafSvgrepoCom = "/images/figma/icon-sustainable.png";
const imgMapSvgrepoCom = "/images/figma/icon-land-programs.png";
const imgBoatSvgrepoCom2 =
  "http://localhost:3845/assets/f205a410959c38b8a512cfe1e45890b14b288386.svg";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Company", href: "#company" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Contact", href: "#contact" },
];

const navCta = {
  label: "Get Quote",
  href: "mailto:info@excursionsgreece.com?subject=Quote%20Request",
};

const logoRowOne = ["ATLAS", "HAPAG", "SAS", "CRYSTAL", "NOBLE"];
const logoRowTwo = ["VIRGIN", "VIKING", "WORLD", "EXPLORA", "ATLAS"];

const stats = [
  { value: "50+", label: "Greek Ports" },
  { value: "30+", label: "Years Experience" },
  { value: "15+", label: "Cruise Lines" },
];

const companyLinks = [
  { label: "About Us", href: "#company" },
  { label: "Our Team", href: "#company" },
  { label: "Certifications", href: "#company" },
  { label: "Sustainability", href: "#company" },
];

const serviceLinks = [
  { label: "Shore Excursions", href: "#services" },
  { label: "VIP Services", href: "#services" },
  { label: "Group Tours", href: "#services" },
  { label: "Private Transfers", href: "#services" },
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

const serviceCardsRowOne = [
  {
    titleLines: ["Shore", "Excursions"],
    icon: imgBoatSvgrepoCom,
    description:
      "Immersive shore experiences curated with local experts and tailored guest flows.",
  },
  {
    titleLines: ["VIP &", "Concierge"],
    icon: imgVip2Fill1,
    description:
      "Discreet, white-glove logistics with private guides and priority access.",
  },
  {
    titleLines: ["Port", "Services"],
    icon: imgBoatSvgrepoCom2,
    description:
      "Comprehensive embarkation and disembarkation support across Greek ports.",
    bullets: ["Meet & Greet", "Luggage Handling", "Port Transfers", "Check-in"],
  },
  {
    titleLines: ["Cultural", "Experts"],
    icon: imgVip2Fill,
    description:
      "Licensed storytellers and archaeologists bringing Greece's heritage to life.",
  },
];

const serviceCardsRowTwo = [
  {
    titleLines: ["Sustainable", "Tourism"],
    icon: imgLeafSvgrepoCom,
    description:
      "Low-impact itineraries and community partnerships aligned with Travelife.",
  },
  {
    titleLines: ["Land", "Programs"],
    icon: imgMapSvgrepoCom,
    description:
      "Pre- and post-cruise journeys with seamless ground handling nationwide.",
  },
  {
    titleLines: ["Boat & Yacht", "Charters"],
    icon: imgBoatSvgrepoCom1,
    description:
      "Private yachts, tenders, and bespoke maritime experiences with premium crews.",
  },
];

const wrap =
  "mx-auto w-full max-w-[1780px] px-[24px] sm:px-[40px] lg:px-[40px] min-[1780px]:px-0";

export default function Home() {
  return (
    <div className="bg-white text-[#33305e] overflow-x-hidden">
      <section id="home" className="relative">
        <div
          className={`${wrap} relative min-h-[720px] lg:min-h-screen min-[1780px]:min-h-[968px]`}
        >
          <header className="flex items-start justify-between pt-[3px]">
            <img
              src={imgExcursionsGreeceLogoWhite1}
              alt="Excursions Greece"
              className="h-[72px] w-[72px] object-contain sm:h-[96px] sm:w-[96px] lg:h-[179px] lg:w-[179px]"
            />
            <nav className="hidden items-center gap-[49px] text-[18px] font-medium lg:flex lg:text-[24px] lg:leading-[80px]">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.label === "Home" ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-[#51d2c6]",
                    item.label === "Home"
                      ? "font-extrabold text-[#51d2c6]"
                      : "text-[#33305e]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                variant="outline"
                className="h-[44px] rounded-full border-[#33305e]/20 px-5 text-[18px] font-semibold text-[#33305e] transition-colors hover:border-[#51d2c6] hover:text-[#51d2c6]"
              >
                <a href={navCta.href}>{navCta.label}</a>
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#33305e]/20 px-4 py-2 text-sm font-semibold text-[#33305e] lg:hidden"
                >
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <a href={navCta.href} className="w-full font-semibold">
                    {navCta.label}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <div>
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-6 lg:h-[calc(100vh-220px)] min-[1780px]:grid-cols-[880px_879px] min-[1780px]:gap-[20px] min-[1780px]:h-[805px]">
              <div className="relative flex flex-col lg:h-full">
                <h1 className="text-right font-[var(--font-syne)] text-[32px] font-bold leading-[42px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 lg:text-[40px] lg:leading-[46px]">
                  Luxury Shore
                  <br />
                  Experiences
                </h1>
                <div className="mt-[28px] flex items-start justify-between gap-6 text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
                  <p className="max-w-[520px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-100 motion-safe:duration-700">
                    Curated by Greece&apos;s
                    <br />
                    Most Trusted &amp; Leading DMC
                  </p>
                  <p className="text-right font-[var(--font-sulphur)] text-[20px] leading-[24px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-200 motion-safe:duration-700 lg:text-[24px] lg:leading-[111px]">
                    since 2013
                  </p>
                </div>
                <div className="mt-[22px] overflow-hidden bg-[#96e0d9] lg:mt-auto">
                  <MapboxMap className="h-[320px] w-full sm:h-[420px] lg:h-[clamp(320px,45vh,575px)] min-[1780px]:h-[575px]" />
                  <button className="group absolute bottom-[22px] left-[22px] flex h-[56px] items-center gap-4 bg-white px-6 text-[20px] font-semibold text-[#33305e] shadow-[0_10px_30px_rgba(51,48,94,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/90 lg:text-[24px]">
                    Explore Routes
                    <img
                      src={imgArrowRightSvgrepoCom}
                      alt="Arrow"
                      className="h-[48px] w-[44px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden bg-[#96e0d9] lg:mt-0 lg:h-full">
                <img
                  src={imgFinalHeroSlideshow}
                  alt="Aegean waters"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[4000ms] hover:scale-105"
                />
                <Button
                  asChild
                  className="group absolute bottom-[22px] left-[22px] h-[56px] gap-4 rounded-none bg-white px-6 py-3 text-[20px] font-semibold text-[#33305e] shadow-[0_10px_30px_rgba(51,48,94,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/90 lg:text-[24px]"
                >
                  <Link href="#contact">
                    Contact Us
                    <img
                      src={imgArrowRightSvgrepoCom}
                      alt="Arrow"
                      className="h-[48px] w-[44px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-10 pt-6 lg:pt-[24px]`}>
        <p className="max-w-[1403px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          Where every journey unfolds as a story of elegance and discovery across
          Greece&apos;s storied ports, our bespoke programs serve the world&apos;s most
          distinguished cruise lines.
        </p>
      </section>

      <section className="bg-[#33305e] py-[36px]">
        <div className={`${wrap} grid border-y border-white/40 md:grid-cols-3`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 text-center ${
                index < stats.length - 1 ? "md:border-r md:border-white/40" : ""
              }`}
            >
              <div className="font-[var(--font-syne)] text-[32px] font-semibold text-[#96e0d9] sm:text-[36px] lg:text-[40px]">
                {stat.value}
              </div>
              <div className="mt-3 text-[16px] text-white sm:text-[18px] lg:text-[20px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="company" className={`${wrap} py-14`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 sm:text-[32px] lg:text-[40px] lg:leading-[46px]">
          Chosen by the World’s
          <br />
          Finest Voyages
        </h2>
        <div className="mt-6 border-t border-[#33305e]/30">
          <div className="grid grid-cols-2 text-center text-[20px] font-light leading-[50px] text-[#33305e] sm:grid-cols-3 lg:grid-cols-5 lg:text-[40px] lg:leading-[80px]">
            {logoRowOne.map((logo) => (
              <div key={logo}>
                <span className="inline-flex w-full items-center justify-center px-4 py-1 transition-colors duration-300 hover:bg-[#51d2c6] hover:text-white">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#33305e]/30" />
          <div className="grid grid-cols-2 text-center text-[20px] font-light leading-[50px] text-[#33305e] sm:grid-cols-3 lg:grid-cols-5 lg:text-[40px] lg:leading-[80px]">
            {logoRowTwo.map((logo) => (
              <div key={logo}>
                <span className="inline-flex w-full items-center justify-center px-4 py-1 transition-colors duration-300 hover:bg-[#51d2c6] hover:text-white">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#33305e]/30" />
        </div>
      </section>

      <section id="services" className={`${wrap} pb-8`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] sm:text-[32px] lg:text-[40px] lg:leading-[46px]">
          Bespoke Experiences
          <br />
          Throughout Greece
        </h2>
      </section>

      <section className={`${wrap} pb-16`}>
        <div className="relative overflow-hidden bg-[#96e0d9] px-6 py-10 sm:px-10 lg:min-h-[1094px] lg:px-[80px] lg:py-[48px]">
          <img
            src={imgFrame39847}
            alt="Greek coastline"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="relative mx-auto grid gap-6 lg:max-w-[1620px] lg:grid-cols-4 lg:gap-[36px]">
            {serviceCardsRowOne.map((card) => (
              <div
                key={card.titleLines.join(" ")}
                tabIndex={0}
                className="group relative cursor-pointer overflow-hidden bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#33305e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51d2c6] lg:h-[397px]"
              >
                <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                  {card.titleLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < card.titleLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h3>
                <div className="mt-4 space-y-3 text-[16px] leading-[22px] text-[#33305e]/80 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white/80 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:text-white/80">
                  <p>{card.description}</p>
                  {card.bullets ? (
                    <ul className="space-y-1 text-[15px] leading-[20px]">
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                  <img
                    src={card.icon}
                    alt={`${card.titleLines.join(" ")} icon`}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-6 grid gap-6 lg:max-w-[1206px] lg:grid-cols-3 lg:gap-[36px]">
            {serviceCardsRowTwo.map((card) => (
              <div
                key={card.titleLines.join(" ")}
                tabIndex={0}
                className="group relative cursor-pointer overflow-hidden bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#33305e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51d2c6] lg:h-[397px]"
              >
                <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                  {card.titleLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < card.titleLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h3>
                <div className="mt-4 space-y-3 text-[16px] leading-[22px] text-[#33305e]/80 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white/80 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:text-white/80">
                  <p>{card.description}</p>
                </div>
                <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                  <img
                    src={card.icon}
                    alt={`${card.titleLines.join(" ")} icon`}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8 flex items-center justify-center border-y border-white/50 py-2">
            <Button
              asChild
              className="group h-[56px] gap-4 rounded-none bg-white px-6 text-[20px] font-semibold text-[#33305e] transition-all hover:-translate-y-0.5 hover:bg-white/90 lg:text-[24px]"
            >
              <Link href="#services">
                View All Services
                <img
                  src={imgArrowRightSvgrepoCom}
                  alt="Arrow"
                  className="h-[48px] w-[44px] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-6`}>
        <p className="max-w-[1319px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          At Excursions Greece, excellence is not an aspiration, it is a standard
          refined over decades of service to the world&apos;s most distinguished
          cruise lines.
        </p>
        <p className="mt-6 max-w-[1102px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          What sets us apart is our relentless attention to detail and our
          commitment to creating seamless experiences at every port of call.
        </p>
      </section>

      <section className={`${wrap} py-14`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold lg:text-[40px]">
          Our Distinction
        </h2>
        <Carousel
          className="relative mt-10"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="items-stretch">
            {distinctionSlides.map((slide) => (
              <CarouselItem
                key={slide.title}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full items-center justify-center">
                  <div className="relative flex h-[397px] w-full max-w-[378px] flex-col items-center justify-center gap-6 bg-[#96e0d9] px-6 text-center text-white transition-transform duration-300 hover:-translate-y-1">
                    <div className="w-full border-y border-white/60 py-4">
                      <p className="font-[var(--font-syne)] text-[28px] font-bold leading-[36px] lg:text-[32px] lg:leading-[42px]">
                        {slide.title}
                      </p>
                    </div>
                    <p className="text-[16px] leading-[24px] lg:text-[18px] lg:leading-[26px]">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            className="hidden lg:flex !left-[-8px] !h-[60px] !w-[55px] !rounded-none text-[#33305e] hover:bg-[#33305e]/10 [&>svg]:size-7"
          />
          <CarouselNext
            variant="ghost"
            className="hidden lg:flex !right-[-8px] !h-[60px] !w-[55px] !rounded-none text-[#33305e] hover:bg-[#33305e]/10 [&>svg]:size-7"
          />
        </Carousel>
      </section>

      <section id="destinations" className={`${wrap} pb-16`}>
        <div className="grid items-center gap-10 lg:grid-cols-[665px_1fr] lg:gap-[36px]">
          <div>
            <img
              src={imgBoatSvgrepoCom2}
              alt="Boat icon"
              className="h-[60px] w-[53px] lg:h-[79px] lg:w-[70px]"
            />
            <p className="mt-6 text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
              Each journey we design reflects the heritage, precision, and trust
              that have earned us our reputation as Greece&apos;s most trusted and
              leading DMC.
            </p>
          </div>
          <div className="grid gap-[18px] sm:grid-cols-3 lg:gap-[31px]">
            <img
              src={imgRectangle4136}
              alt="Scenic bay"
              className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] lg:h-[397px]"
            />
            <img
              src={imgRectangle4138}
              alt="Aerial coastline"
              className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] lg:h-[397px]"
            />
            <img
              src={imgRectangle4137}
              alt="Harbor view"
              className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] lg:h-[397px]"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#33305e] text-white">
        <div className={`${wrap} py-12`}>
          <div className="border-y border-white/50 py-6 text-center">
            <h2 className="font-[var(--font-syne)] text-[28px] font-bold sm:text-[32px] lg:text-[40px]">
              Travelife Certified Partner
            </h2>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-[80px]">
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Company
              </h3>
              <ul className="mt-4 space-y-3 text-[18px] lg:text-[24px]">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Services
              </h3>
              <ul className="mt-4 space-y-3 text-[18px] lg:text-[24px]">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[#96e0d9]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Contact
              </h3>
              <div className="mt-4 space-y-6 text-[18px] lg:text-[24px]">
                <a
                  className="group flex items-start gap-4 transition-colors hover:text-[#96e0d9]"
                  href="https://maps.google.com/?q=123%20Marina%20Boulevard%20Piraeus%20Greece%2018537"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-shadow group-hover:shadow-[0_6px_18px_rgba(150,224,217,0.45)]">
                    <MapPin className="h-6 w-6 text-[#33305e]" />
                  </div>
                  <span>
                    123 Marina Boulevard
                    <br />
                    Piraeus, Greece 18537
                  </span>
                </a>
                <a
                  className="group flex items-center gap-4 transition-colors hover:text-[#96e0d9]"
                  href="tel:+302104567890"
                >
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-shadow group-hover:shadow-[0_6px_18px_rgba(150,224,217,0.45)]">
                    <Phone className="h-6 w-6 text-[#33305e]" />
                  </div>
                  <span>+30 210 456 7890</span>
                </a>
                <a
                  className="group flex items-center gap-4 transition-colors hover:text-[#96e0d9]"
                  href="mailto:info@excursionsgreece.com"
                >
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-shadow group-hover:shadow-[0_6px_18px_rgba(150,224,217,0.45)]">
                    <Mail className="h-6 w-6 text-[#33305e]" />
                  </div>
                  <span>info@excursionsgreece.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/50 pt-6 text-[16px] text-white/80 lg:text-[20px]">
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-transform hover:-translate-y-0.5"
              >
                <Instagram className="h-7 w-7 text-[#33305e]" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-transform hover:-translate-y-0.5"
              >
                <Facebook className="h-7 w-7 text-[#33305e]" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-[60px] w-[60px] items-center justify-center bg-white transition-transform hover:-translate-y-0.5"
              >
                <Linkedin className="h-7 w-7 text-[#33305e]" />
              </a>
            </div>
            <span>© 2025 Excursions Greece. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
