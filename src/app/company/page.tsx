"use client";

import Link from "next/link";
import { 
  Shield, 
  Award, 
  Users, 
  Globe, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardDescription, 
  CardTitle 
} from "@/components/ui/card";
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
  href: "mailto:info@excursionsgreece.com?subject=Quote%20Request",
};

const wrap = "w-full px-[24px] sm:px-[40px] lg:px-[60px] 2xl:px-[80px]";

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Uncompromising commitment to passenger safety with fully licensed operators and comprehensive insurance coverage.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Setting the standard for luxury shore excursions with meticulous attention to detail and service quality.'
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Deep cultural knowledge and authentic connections across every Greek destination we serve.'
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Responsible tourism practices that preserve Greece\'s natural beauty and support local communities.'
  }
];

const certifications = [
  'Greek National Tourism Organization Licensed',
  'Sustainable Tourism Certified (Travelife Partner)'
];

export default function CompanyPage() {
  return (
    <div className="bg-white text-[#33305e] selection:bg-[#96e0d9] selection:text-[#33305e] font-[var(--font-manrope)]">
      {/* Header / Nav */}
      <header className={cn(wrap, "flex items-center justify-between py-6 lg:py-8")}>
        <Link href="/" className="block">
          <img
            src="/images/figma/logo.png"
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
                item.label === "Company"
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

      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className={wrap}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700">
              <span className="font-[var(--font-sulphur)] text-[14px] uppercase tracking-[0.2em] text-[#51d2c6] mb-6 block font-bold italic">
                est. 2013
              </span>
              <h1 className="font-[var(--font-syne)] text-[48px] sm:text-[64px] lg:text-[80px] font-bold text-[#33305e] mb-8 leading-[1.05] tracking-tight">
                Crafting Exceptional <br />
                <span className="text-[#51d2c6]">Greek Experiences</span>
              </h1>
              <p className="text-[20px] lg:text-[24px] text-[#33305e]/70 leading-relaxed max-w-2xl font-light">
                For over a decade, we&apos;ve been the trusted partner for leading cruise lines, 
                delivering unparalleled shore excursions across every Greek port.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] w-full hidden lg:block motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 delay-300">
              <div className="absolute inset-0 bg-[#51d2c6] transform translate-x-4 translate-y-4 rounded-sm"></div>
              <div className="relative h-full w-full overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="/images/figma/hero-slideshow.png"
                  alt="Luxury Destination Management"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#33305e]/10"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-[#33305e]/5 max-w-[200px]">
                <div className="h-1 w-12 bg-[#51d2c6] mb-3"></div>
                <p className="text-[#33305e]/60 font-[var(--font-sulphur)] uppercase tracking-widest text-xs font-bold leading-relaxed">
                  Luxury Destination Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Asymmetric Layout */}
      <section className="py-24 lg:py-32 bg-[#f8f9fa]">
        <div className={wrap}>
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-start">
            {/* Mission */}
            <div className="space-y-10 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-8 motion-safe:duration-700">
              <Badge className="bg-[#33305e] text-white rounded-none px-4 py-1.5 uppercase tracking-widest text-[12px] border-none font-bold">Our Mission</Badge>
              <h2 className="font-[var(--font-syne)] text-[36px] sm:text-[48px] font-bold text-[#33305e] leading-tight">
                To connect travelers <br />
                with Greece&apos;s soul.
              </h2>
              <p className="text-[18px] lg:text-[20px] text-[#33305e]/70 leading-relaxed font-light">
                We craft exceptional journeys that bridge the gap between history and the present, 
                connecting guests with the people, flavors, and timeless landscapes of Greece through 
                authenticity and meticulous care.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-10 lg:mt-32 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-8 motion-safe:duration-700 delay-200">
              <Badge className="bg-[#51d2c6] text-white rounded-none px-4 py-1.5 uppercase tracking-widest text-[12px] border-none font-bold">Our Vision</Badge>
              <h2 className="font-[var(--font-syne)] text-[36px] sm:text-[48px] font-bold text-[#33305e] leading-tight">
                Redefining Luxury <br />
                Through Excellence.
              </h2>
              <p className="text-[18px] lg:text-[20px] text-[#33305e]/70 leading-relaxed font-light">
                To lead the industry through sustainable innovation and deep cultural engagement, 
                creating bespoke experiences that transform a simple visit into a lifelong story 
                of discovery and elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className={wrap}>
          <div className="mb-20">
            <h2 className="font-[var(--font-syne)] text-[40px] sm:text-[56px] font-bold text-[#33305e] mb-6">Our Values</h2>
            <div className="h-1 w-24 bg-[#51d2c6]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-none bg-[#f8f9fa] rounded-none p-10">
                  <div className="w-16 h-16 bg-[#33305e] flex items-center justify-center mb-8 group-hover:bg-[#51d2c6] transition-colors duration-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-[24px] font-[var(--font-syne)] font-bold mb-4 text-[#33305e]">{value.title}</CardTitle>
                  <CardDescription className="text-[16px] text-[#33305e]/70 leading-relaxed font-light">
                    {value.description}
                  </CardDescription>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#33305e] py-24 text-white overflow-hidden">
        <div className={wrap}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:divide-x md:divide-white/10">
            <div className="p-4">
              <div className="font-[var(--font-syne)] text-[48px] lg:text-[64px] font-bold text-[#96e0d9] mb-2">30+</div>
              <div className="font-[var(--font-sulphur)] text-white/50 uppercase tracking-[0.2em] text-[12px] font-bold">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="font-[var(--font-syne)] text-[48px] lg:text-[64px] font-bold text-[#96e0d9] mb-2">50+</div>
              <div className="font-[var(--font-sulphur)] text-white/50 uppercase tracking-[0.2em] text-[12px] font-bold">Greek Ports</div>
            </div>
            <div className="p-4">
              <div className="font-[var(--font-syne)] text-[48px] lg:text-[64px] font-bold text-[#96e0d9] mb-2">3.2M+</div>
              <div className="font-[var(--font-sulphur)] text-white/50 uppercase tracking-[0.2em] text-[12px] font-bold">Guests Served</div>
            </div>
            <div className="p-4">
              <div className="font-[var(--font-syne)] text-[48px] lg:text-[64px] font-bold text-[#96e0d9] mb-2">15+</div>
              <div className="font-[var(--font-sulphur)] text-white/50 uppercase tracking-[0.2em] text-[12px] font-bold">Cruise Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 lg:py-32 bg-[#f8f9fa]">
        <div className={wrap}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <h2 className="font-[var(--font-syne)] text-[36px] sm:text-[48px] font-bold text-[#33305e] mb-6 leading-tight">
                Accreditations & <br />
                <span className="text-[#51d2c6]">Certifications</span>
              </h2>
              <p className="text-[18px] text-[#33305e]/70 leading-relaxed font-light">
                Our commitment to excellence and sustainability is recognized by leading international tourism organizations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center p-10 bg-white shadow-sm border border-[#33305e]/5 transition-all hover:shadow-md">
                  <CheckCircle className="w-8 h-8 text-[#51d2c6] mr-6 flex-shrink-0" />
                  <span className="font-[var(--font-syne)] font-bold text-[18px] text-[#33305e] leading-tight">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-40 bg-white">
        <div className={wrap}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 border-t border-b border-[#33305e]/10 py-24 px-8 lg:px-0">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-[var(--font-syne)] text-[40px] sm:text-[56px] font-bold text-[#33305e] mb-8 leading-tight">
                Ready to Create <br className="hidden sm:block" />
                Unforgettable Experiences?
              </h2>
              <p className="text-[20px] text-[#33305e]/60 font-light mb-10">
                Join the world&apos;s leading cruise lines who trust us to deliver exceptional 
                Greek shore experiences for their guests.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-[64px] px-10 bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 shadow-xl font-bold rounded-none"
                >
                  <Link href="/#contact">Get Started</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  size="lg" 
                  className="h-[64px] px-10 border-[#33305e]/20 text-[#33305e] hover:bg-[#33305e] hover:text-white transition-all duration-500 font-bold rounded-none"
                >
                  <Link href="/destinations">Explore Destinations</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center w-[200px] h-[200px] bg-[#51d2c6]/10 rounded-full">
              <Star className="w-24 h-24 text-[#51d2c6] motion-safe:animate-pulse" />
            </div>
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
                src="/images/figma/logo.png"
                alt="Excursions Greece"
                className="h-[80px] w-auto brightness-0 invert"
              />
              <p className="max-w-md text-[18px] text-white/70 leading-relaxed">
                Leading the way in luxury shore excursions and destination
                management across Greece since 2013.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:info@excursionsgreece.com"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  info@excursionsgreece.com
                </a>
                <a
                  href="tel:+302104567890"
                  className="flex items-center gap-5 text-[18px] font-medium transition-colors hover:text-[#96e0d9]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  +30 210 456 7890
                </a>
                <div className="flex items-start gap-5 text-[18px] font-medium">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="leading-snug">
                    123 Marina Boulevard
                    <br />
                    Piraeus, Greece 18537
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
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Certifications</Link></li>
                <li><Link href="/company" className="text-[18px] text-white/80 transition-colors hover:text-[#96e0d9]">Sustainability</Link></li>
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
              <a href="#" className="hover:text-[#96e0d9] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#96e0d9] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#96e0d9] transition-colors"><Linkedin className="h-5 w-5" /></a>
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
