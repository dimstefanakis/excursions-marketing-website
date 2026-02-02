"use client";

import Link from "next/link";
import { 
  Ship, 
  Users, 
  Crown, 
  BookOpen, 
  Leaf, 
  Map as MapIcon, 
  Anchor,
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  Menu,
  Star
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const services = [
  {
    icon: Ship,
    title: 'Shore Excursions',
    description: 'Curated experiences showcasing Greece\'s history, culture, and natural beauty for cruise passengers.',
    features: ['Private & group tours', 'Expert local guides', 'All major ports and hidden harbors'],
  },
  {
    icon: Crown,
    title: 'VIP & Concierge',
    description: 'Luxury services for discerning travelers seeking exclusive access and personalized attention.',
    features: ['Private transfers', 'Exclusive venues', 'Personal concierge'],
  },
  {
    icon: Users,
    title: 'Turnaround Services',
    description: 'Comprehensive embarkation and disembarkation support in all Greek cruise ports.',
    features: ['Meet & greet', 'Luggage handling', 'Port transfers', 'Check-in services'],
  },
  {
    icon: BookOpen,
    title: 'Cultural Experts',
    description: 'Professional guides and cultural specialists bringing Greece\'s rich heritage to life.',
    features: ['Licensed guides', 'Multi-language', 'In-Depth Knowledge'],
  },
  {
    icon: Leaf,
    title: 'Sustainable Tourism',
    description: 'Responsible travel programs supporting local communities and environmental conservation.',
    features: ['Eco-friendly tours', 'Local partnerships', 'Cultural preservation'],
  },
  {
    icon: MapIcon,
    title: 'Land Programs',
    description: 'Immersive mainland experiences and extended journeys beyond the ports.',
    features: ['Overland Journeys', 'Pre- and Post-Cruise Extensions', 'Hotels & Venues', 'Island Exploration'],
  },
  {
    icon: Anchor,
    title: 'Boat & Yacht Charters',
    description: 'Premium private charters, day sails, and island-to-island experiences aboard luxury vessels.',
    features: ['Private yacht charters', 'Day sailing excursions', 'Island-hopping journeys'],
  }
];

export default function ServicesPage() {
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
                item.label === "Services"
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
          <div className="max-w-5xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700">
            <span className="font-[var(--font-sulphur)] text-[14px] uppercase tracking-[0.2em] text-[#51d2c6] mb-6 block font-bold">
              Bespoke Programs
            </span>
            <h1 className="font-[var(--font-syne)] text-[48px] sm:text-[64px] lg:text-[80px] font-bold text-[#33305e] mb-10 leading-[1.05] tracking-tight">
              Bespoke Experiences <br />
              <span className="text-[#33305e]/30">Throughout Greece</span>
            </h1>
            <p className="text-[20px] lg:text-[24px] text-[#33305e]/70 leading-relaxed font-light">
              From private yacht charters to exclusive cultural tours, we craft
              moments that linger in memory. Our services are designed for the world&apos;s 
              most distinguished travelers and cruise lines.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className={wrap}>
          <div className="grid md:grid-cols-2 gap-px bg-[#33305e]/10 border border-[#33305e]/10 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="group p-12 lg:p-16 bg-white hover:bg-[#33305e] transition-all duration-500 flex flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-20 flex items-center mb-10">
                    <Icon className="w-14 h-14 text-[#51d2c6] transition-colors duration-500 group-hover:text-[#96e0d9]" />
                  </div>
                  
                  <h3 className="font-[var(--font-syne)] text-[28px] lg:text-[32px] font-bold text-[#33305e] group-hover:text-white tracking-tight mb-6 leading-tight transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[18px] text-[#33305e]/70 group-hover:text-white/70 leading-relaxed font-light mb-10 transition-colors">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mt-auto pt-6 border-t border-[#33305e]/10 group-hover:border-white/10 transition-colors">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="text-[14px] text-[#33305e]/50 group-hover:text-white/40 font-medium uppercase tracking-[0.15em] transition-colors flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#51d2c6] rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Distinction Section (Reused from Home but themed) */}
      <section className="py-24 lg:py-32 bg-[#f8f9fa]">
        <div className={wrap}>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#51d2c6]/10 rounded-full"></div>
              <h2 className="font-[var(--font-syne)] text-[40px] lg:text-[56px] font-bold text-[#33305e] relative z-10 leading-tight">
                Our Commitment <br />
                <span className="text-[#51d2c6]">to Excellence</span>
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-[20px] text-[#33305e]/70 leading-relaxed font-light">
                What sets Excursions Greece apart is our relentless attention to detail and our commitment to creating seamless experiences at every port of call.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Badge className="bg-[#33305e] text-white border-none rounded-none">Precision</Badge>
                  <p className="text-sm text-[#33305e]/60">Meticulously planned logistics for every excursion.</p>
                </div>
                <div className="space-y-3">
                  <Badge className="bg-[#51d2c6] text-white border-none rounded-none">Heritage</Badge>
                  <p className="text-sm text-[#33305e]/60">Deep connection to Greek history and local culture.</p>
                </div>
              </div>
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
                Partner with the <br className="hidden sm:block" />
                Industry Leaders
              </h2>
              <p className="text-[20px] text-[#33305e]/60 font-light mb-10">
                Contact our expert team today to discuss bespoke shore excursion 
                programs for your cruise line or luxury group.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-[64px] px-10 bg-[#33305e] text-white hover:bg-[#51d2c6] transition-all duration-500 shadow-xl font-bold rounded-none"
                >
                  <Link href="mailto:info@excursionsgreece.com">Contact Our Team</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  size="lg" 
                  className="h-[64px] px-10 border-[#33305e]/20 text-[#33305e] hover:bg-[#33305e] hover:text-white transition-all duration-500 font-bold rounded-none"
                >
                  <Link href="/destinations">Explore Ports</Link>
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

